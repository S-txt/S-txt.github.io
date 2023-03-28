class Tile{
    constructor(game, row) {
        this.game = game;
        this.width = game.width/4;
        this.height = this.width;
        this.image = document.getElementById('tile')
        this.speed = 0;
        this.maxSpeed = 8;
        this.x = row * this.width;
        this.y = this.game.bottomMargin - this.width;
        this.markedForDelition = false;

    }

    setSpeed(speed){
        this.speed = speed;
    }

    draw(context){
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image,
            this.x,
            this.y,
            this.width,
            this.height)
    }

    update(ctx, deltaTime){
        this.setSpeed(this.maxSpeed);
        this.y += this.speed;
        // tile is out of bound
        if (this.y > this.game.width + this.game.bottomMargin + this.width ){
            this.markedForDelition = true;
            this.game.lastScore = "miss";
            if (this.game.player.playerAlive) {
                this.game.player.playerHealth.currentHP -= 1;
            }
        // Player clicked a tile
        } else if ((this.x <= this.game.touchX && this.game.touchX <= this.x + this.width) &&
            (this.y <= this.game.touchY && this.game.touchY <= this.y + this.height)){
            this.markedForDelition = true

        }

    }
}
