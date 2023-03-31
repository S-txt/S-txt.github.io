export class HP {
    constructor(game) {
        this.game = game;
        this.width = this.game.width / 3;
        this.height = 20;
        this.maxHP = 10;
        this.currentHP = this.maxHP;
        this.lastHP = this.maxHP;
        this.imuneTimer = 0;
        this.imuneInterval = 1000;

    }

    draw(context){
        context.fillStyle = 'grey';
        context.fillRect(30, 30, this.width, this.height);
        context.fillStyle = 'red';
        context.fillRect(30, 30, this.width / this.maxHP * this.currentHP, this.height);
        context.fillStyle = 'white';
        context.font = '16px Comics Sans';
        context.fillText(this.currentHP + '/' + this.maxHP, 35, 46)

    }

}