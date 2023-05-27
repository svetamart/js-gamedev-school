var Booster = function (playerCoins) {
  this.cost = 50;
  this.playerCoins = playerCoins;

  this.onCoinLabelUpdate = function () {
  };
};

Booster.prototype.activate = function (soldiers) {
  if (this.playerCoins >= this.cost) {
    var lowestHealthSoldier = findLowestHealthSoldier(soldiers);
    if (lowestHealthSoldier) {
      lowestHealthSoldier.hp += 50;
      if (lowestHealthSoldier.hp > 100) {
        lowestHealthSoldier.hp = 100;
      }
      this.playerCoins -= this.cost;
      console.log('Booster is activated. Coins left: ' + this.playerCoins);
      this.onCoinLabelUpdate();
      lowestHealthSoldier.onHPChange();
    }
  } else {
    console.log('Not enough coins to activate Booster.');
  }
};

function findLowestHealthSoldier(soldiers) {
  var lowestHealthSoldier = null;
  var lowestHealth = Infinity;

  for (var i = 0; i < soldiers.length; i++) {
    var soldier = soldiers[i];
    if (soldier.isAlive() && soldier.hp < lowestHealth) {
      lowestHealthSoldier = soldier;
      lowestHealth = soldier.hp;
    }
  }

  return lowestHealthSoldier;
};