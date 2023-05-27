/**
 * Created by andrey on 06.05.2022.
 */

var BattleScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        this.battle = new Battle();

        this.playerCoins = 100;

        this.boosterButton = new BoosterView(this.playerCoins, this.battle);
        this.boosterButton.setPosition(0, this.height);
        this.addChild(this.boosterButton);

        this.addBackground();

        this.solderViews = [];
        this.enemyViews = [];

        for (var i = 0; i < (this.battle.soldiers.length); i++) {
            var soldierView = new SolderView(this.battle.soldiers[i]);
            var enemyView = new SolderView(this.battle.enemies[i]);

            var offsetY = (i % 2 === 0) ? (i / 2) * 0.7 : -((i + 1) / 2) * 0.7;
            var soldierY = this.height / 2 + offsetY * 200;
            var enemyY = this.height / 2 + offsetY * 200;
            var soldierX = this.width / 2 - this.width / 6;
            var enemyX = this.width / 2 + this.width / 6;

            soldierView.setPosition(soldierX, soldierY);
            enemyView.setPosition(enemyX, enemyY);

            this.solderViews.push(soldierView);
            this.enemyViews.push(enemyView);

            this.addChild(soldierView);
            this.addChild(enemyView);
        }

        cc.audioEngine.playMusic(resources.battle_music, true);
        cc.audioEngine.setMusicVolume(0.5);

        this.schedule(this.battleUpdate, 1);
    },

    addBackground: function () {
        var background = new cc.Sprite(resources.background);
        background.setScale(Math.max(this.width / background.width, this.height / background.height));
        background.setPosition(this.width / 2, this.height / 2);
        background.setLocalZOrder(-1);
        this.addChild(background);
    },

    battleUpdate: function (dt) {
        if (this.battle.running) {
            for (var i = 0; i < this.battle.soldiers.length; i++) {
                var soldier = this.battle.soldiers[i];
                var enemy = this.battle.enemies[i];
                if (enemy.isAlive()) {
                    soldier.attack(enemy);
                }
            }
        }
    }
});

