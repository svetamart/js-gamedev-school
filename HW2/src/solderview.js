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

        if (solder.type === 'solder') {
            this.animation.setScaleX(-1);
        }

        solder.onTakeDamageAnimation = this.onTakeDamage.bind(this);
        solder.onAttackAnimation = this.onAttack.bind(this);
        solder.onDieAnimation = this.onDie.bind(this);
        solder.healthBar = this.addHealthBar();
        solder.showDamage = this.showDamage.bind(this);
    },


    showDamage: function (damage) {
        var damageLabel = new cc.LabelTTF('0', resources.marvin_round.name, 30);
        damageLabel.setColor(cc.color(255, 255, 255));
        damageLabel.setPosition(this.animation.x + this.animation.width / 2, this.animation.y + this.animation.height / 2);
        this.addChild(damageLabel);

        damageLabel.setString('-' + damage);
        var moveUp = cc.moveBy(0.5, cc.p(0, 50));
        var fadeOut = cc.fadeOut(0.5);
        var remove = cc.removeSelf(true);
        var sequence = cc.sequence(moveUp, fadeOut, remove);
        damageLabel.runAction(sequence);
    },

    onDie: function () {
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
    },

    addHealthBar: function () {

        var barSize = cc.spriteFrameCache.getSpriteFrame('progressbar.png').getOriginalSize();
        var healthBarBackground = new ccui.Scale9Sprite('progress_background.png');
        healthBarBackground.setCapInsets(cc.rect(barSize.width / 2, barSize.height / 2, 2, 2));
        healthBarBackground.setContentSize(150, 30);
        healthBarBackground.setPosition(this.animation.x, this.animation.y + this.animation.height);

        this.addChild(healthBarBackground);


        var healthBarForeground = new ccui.Scale9Sprite('progressbar.png');
        healthBarForeground.setCapInsets(cc.rect(barSize.width / 2, barSize.height / 2, 2, 2));
        healthBarForeground.setContentSize(150, 30);
        // healthBarForeground.setAnchorPoint(1, 0.5);
        healthBarForeground.setPosition(this.animation.x, this.animation.y + this.animation.height);

        this.addChild(healthBarForeground);

        return healthBarForeground;
    }

});


