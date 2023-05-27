/**
 * Created by andrey on 08.05.2022.
 */

var SolderView = cc.Node.extend({
    ctor: function (solder) {
        this._super();

        this.solder = solder;

        this.animation = sp.SkeletonAnimation.create(resources[solder.type + solder.code + '_json'], resources.battle_atlas);
        this.animation.setAnimation(0, "idle", true);
        this.addChild(this.animation);

        this.healthLabel = new cc.LabelTTF("❤️ " + this.solder.hp, resources.marvin_round.name, 15);
        
        var offsetX, offsetY;

        if (solder.type === 'solder') {
            this.healthLabel.setAnchorPoint(0, 0.5);
            offsetX = -this.animation.width * 1.3;
            offsetY = this.animation.height * 0.2;
            this.animation.setScaleX(-1);
        } else {
            this.healthLabel.setAnchorPoint(1, 0.5);
            offsetX = this.animation.width * 1.3;
            offsetY = this.animation.height * 0.2;
        }

        this.healthLabel.setPosition(cc.p(offsetX, offsetY));
        this.addChild(this.healthLabel);

        solder.onTakeDamageAnimation = this.onTakeDamage.bind(this);
        solder.onAttackAnimation = this.onAttack.bind(this);
        solder.onDieAnimation = this.onDie.bind(this);
        solder.onHPChange = this.updateHPLabel.bind(this);
    },

    updateHPLabel: function () {
        this.healthLabel.setString("❤️ " + this.solder.hp);
    },

    onDie: function () {
        this.healthLabel.removeFromParent();
        this.animation.runAction(new cc.Sequence(
            new cc.FadeOut(0.3),
            new cc.ToggleVisibility()
        ));
    },

    onAttack: function () {
        this.animation.setAnimation(0, "attack", false);
        this.animation.setCompleteListener(function () {
            this.animation.setAnimation(0, "idle", true);
        }.bind(this));

        cc.audioEngine.playEffect(resources['battle_' + this.solder.type + '_effect'], false);
    },

    onTakeDamage: function () {
        this.animation.runAction(new cc.Sequence(
            new cc.FadeTo(0.3, 140),
            new cc.FadeTo(0.3, 255)
        ));

        var damage = sp.SkeletonAnimation.create(resources.damage_json, resources.battle_atlas);
        damage.setAnimation(0, "animation", false);
        damage.setCompleteListener(function () {
            damage.removeFromParent();
        })
        this.addChild(damage);
    }
});