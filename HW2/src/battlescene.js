/**
 * Created by andrey on 06.05.2022.
 */

var BattleScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        this.battle = new Battle(this);

        this.addBackground();

        this.solderView = new SolderView(this.battle.solder);
        this.solderView.setPosition(this.width / 2 - this.width / 6, this.height / 2);
        this.addChild(this.solderView);

        this.enemyView = new SolderView(this.battle.enemy);
        this.enemyView.setPosition(this.width / 2 + this.width / 6, this.height / 2);
        this.addChild(this.enemyView);

        this.addStartScreen();

        cc.audioEngine.playMusic(resources.battle_music, true);
        cc.audioEngine.setMusicVolume(0.5);
    },

    addBackground: function () {
        var background = new cc.Sprite(resources.background);
        background.setScale(Math.max(this.width / background.width, this.height / background.height));
        background.setPosition(this.width / 2, this.height / 2);
        background.setLocalZOrder(-1);
        this.addChild(background);
    },

    addAttackButton: function () {
        var buttonSize = cc.spriteFrameCache.getSpriteFrame('button.png').getOriginalSize();
        this.attackButton = new ccui.Button('#button.png', '#button_on.png', '#button_off.png', ccui.Widget.PLIST_TEXTURE);
        this.attackButton.setScale9Enabled(true);
        this.attackButton.setContentSize(180, 70);
        this.attackButton.setCapInsets(cc.rect(buttonSize.width / 2 - 1, buttonSize.height / 2 - 1, 2, 2));
        this.attackButton.setPosition(this.width / 2, this.height / 2 - this.height / 3);
        this.addChild(this.attackButton);

        this.attackButton.setTitleText("ATTACK");
        this.attackButton.setTitleFontSize(35);
        this.attackButton.setTitleFontName(resources.marvin_round.name);

        let label = this.attackButton.getTitleRenderer();
        label.setPosition(cc.p(this.attackButton.width / 2, this.attackButton.height / 2 + 5));

        this.attackButton.isDisabled = false;

        this.attackButton.addClickEventListener(function () {
            if (this.attackButton.isButtonDisabled || !this.battle.running) {
                console.log("wait for start or button is disabled");
                return;
            }

            this.battle.solder.attack(this.battle.enemy);
            this.attackButton.setEnabled(false);

            this.attackButton.isButtonDisabled = true;
            setTimeout(function () {
                this.attackButton.setEnabled(true);
                this.attackButton.isButtonDisabled = false;
            }.bind(this), 1000);
        }.bind(this));


    },

    addVictoryAnimation: function () {
        this.attackButton.removeFromParent();

        var victoryAnimation = sp.SkeletonAnimation.create(resources.battle_victory_json, resources.battle_atlas);
        victoryAnimation.setPosition(this.width / 2, this.height / 2);
        victoryAnimation.setScale(0.5);
        victoryAnimation.setAnimation(0, 'victory', false);
        this.addChild(victoryAnimation);

        var label = new cc.LabelTTF("You Won!", resources.marvin_round.name, 48);
        label.setPosition(this.width / 2, this.height / 2 - 5);
        this.addChild(label);
    },

    addStartScreen: function () {

        var startAnimation = sp.SkeletonAnimation.create(resources.battle_versus_json, resources.battle_atlas);
        startAnimation.setPosition(this.width / 2, this.height / 2);
        startAnimation.setScale(0.5);
        startAnimation.setAnimation(0, 'start', false);
        this.addChild(startAnimation);

        setTimeout(function () {
            startAnimation.setVisible(false);
        }, 2500);
    }

});