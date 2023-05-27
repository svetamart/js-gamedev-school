/**
 * Created by andrey on 08.05.2022.
 */

var Battle = function () {
    // this.solder = new Solder('solder');
    // this.enemy = new Solder('enemy');

    this.soldiers = [];
    this.enemies = [];
    var number = Math.floor(Math.random() * 4) + 2;

    for (var i = 0; i < number; i++) {
        this.soldiers.push(new Solder('solder'));
        this.enemies.push(new Solder('enemy'));
    }

    setTimeout(this.start.bind(this), 3000);


};


Battle.prototype.start = function () {
    this.running = true;

    console.log("Started!");

    this.interval = setInterval(this.run.bind(this), 100);
};

Battle.prototype.run = function () {
    var defeatedCount = 0;

    if (!this.nextEnemyAttack) {
        this.nextEnemyAttack = [];
        for (var j = 0; j < this.enemies.length; j++) {
            this.nextEnemyAttack.push(Date.now() + 
            Math.random() * (Battle.ENEMY_INTERVAL[1] - Battle.ENEMY_INTERVAL[0]) + Battle.ENEMY_INTERVAL[0]);
        }
    }

    for (var i = 0; i < this.soldiers.length; i++) {
        var soldier = this.soldiers[i];
        var enemy = this.enemies[i];

        if (!soldier.isAlive()) {
            defeatedCount++;
        }

        if (!enemy.isAlive()) {
            defeatedCount++;
        }

        if (enemy.isAlive() && soldier.isAlive() && Date.now() > this.nextEnemyAttack[i]) {
            enemy.attack(soldier);
            this.nextEnemyAttack[i] = Date.now() + 
                Math.random() * (Battle.ENEMY_INTERVAL[1] - Battle.ENEMY_INTERVAL[0]) + Battle.ENEMY_INTERVAL[0]; 
        }
    }

    if ((defeatedCount === (this.soldiers.length + this.enemies.length) / 2)) {
        this.stop();
        return;
    }

};

Battle.prototype.stop = function () {
    this.running = false;

    console.log("Stopped!");

    clearInterval(this.interval);
};

Battle.ENEMY_INTERVAL = [1000, 2000];
