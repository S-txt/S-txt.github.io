class HP {
    constructor(game) {
        this.game = game;
        this.width = this.game.width / 3;
        this.height = 20;
        this.maxHP = 10;
        this.currentHP = this.maxHP;
        this.imuneTimer = 0;
        this.imuneInterval = 1000;
        this.bar = null;
        this.barText = null;

    }

    draw(context){
        if (this.bar != null){
            this.bar.value = this.currentHP
            this.barText.textContent = this.currentHP + " \\ " + this.maxHP;
        }
    }

}