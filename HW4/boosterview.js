var BoosterView = cc.Node.extend({
    ctor: function (playerCoins, battle) {
        this._super();

        this.playerCoins = playerCoins;
        this.battle = battle;

        this.coinLabel = new cc.LabelTTF("💰 " + this.playerCoins, resources.marvin_round.name, 20);
        this.coinLabel.setAnchorPoint(0, 1);
        this.coinLabel.setPosition(20, this.height - 20);
        this.addChild(this.coinLabel);

        var buttonSize = cc.spriteFrameCache.getSpriteFrame('button.png').getOriginalSize();
        this.boosterButton = new ccui.Button('#button.png', '#button_on.png', '#button_off.png', ccui.Widget.PLIST_TEXTURE);
        this.boosterButton.setScale9Enabled(true);
        this.boosterButton.setContentSize(180, 70);
        this.boosterButton.setCapInsets(cc.rect(buttonSize.width / 2 - 1, buttonSize.height / 2 - 1, 2, 2));
        this.boosterButton.setPosition(100, this.height - 100);
        this.addChild(this.boosterButton);

        this.boosterButton.setTitleText("BOOSTER");
        this.boosterButton.setTitleFontSize(30);
        this.boosterButton.setTitleFontName(resources.marvin_round.name);

        this.booster = new Booster(this.playerCoins);
        this.booster.onCoinLabelUpdate = this.updateCoinLabel.bind(this);

        this.boosterButton.addClickEventListener(function () {
            if (!this.battle.running) {
                console.log("Wait for the battle to start.");
                return;
            }

            this.booster.activate(this.battle.soldiers);
            this.playerCoins = this.booster.playerCoins;
            this.updateCoinLabel();
        }.bind(this));
    },

    updateCoinLabel: function () {
        this.coinLabel.setString("💰 " + this.playerCoins);
    },
});