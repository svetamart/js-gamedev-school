/**
 * Created by andrey on 08.05.2022.
 */

var Battle = function (battleScene) {
    this.solder = new Solder('solder');
    this.enemy = new Solder('enemy');

    this.battleScene = battleScene;

    setTimeout(this.start.bind(this), 3000);
};

Battle.prototype.start = function () {

    this.battleScene.addAttackButton();
    
    this.running = true;

    console.log("Started!");

    this.interval = setInterval(this.run.bind(this), 100);
};

Battle.prototype.run = function () {

    this.checkBattleStatus();

    if (!this.solder.isAlive() || !this.enemy.isAlive()) {
        this.stop();
        return;
    }

    if (!this.nextEnemyAttack) {
        this.nextEnemyAttack = Date.now() +
            Math.random() * (Battle.ENEMY_INTERVAL[1] - Battle.ENEMY_INTERVAL[0]) + Battle.ENEMY_INTERVAL[0];
    }

    if (Date.now() > this.nextEnemyAttack) {
        this.enemy.attack(this.solder);
        delete this.nextEnemyAttack;
    }

};

Battle.prototype.checkBattleStatus = function () {
    if (!this.enemy.isAlive()) {
        setTimeout(() => {
            cc.audioEngine.playMusic(resources.victory_music, false);
            this.battleScene.addVictoryAnimation();
        }, 500);
        console.log("victory animation!");
        this.stop();
        return;
    }
}

Battle.prototype.stop = function () {
    this.running = false;

    console.log("Stopped!");

    clearInterval(this.interval);
};


Battle.ENEMY_INTERVAL = [2000, 3000];
