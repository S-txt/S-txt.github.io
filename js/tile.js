class Tile{
    constructor(game, maxSpeed, row) {
        this.game = game;
        this.width = game.width/4;
        this.height = this.width;
        this.image = document.getElementById('tile')
        this.speed = 0;
        this.maxSpeed = maxSpeed;
        this.x = row * this.width;
        this.y = this.game.bottomMargin - this.height; // changed
        this.markedForDelition = false;
        this.cTime = 0;
        this.endTime = null;

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
        //Update tile function

        this.setSpeed(this.maxSpeed);
        this.y += this.speed;
        this.endTime += deltaTime
        // tile is out of bound
        if (this.y > this.game.width + this.game.bottomMargin + this.width + 10){
            this.markedForDelition = true;
            this.game.lastScore = "miss";
            this.game.player.hit()

        // Player clicked a tile
        } else if ((this.x <= this.game.touchX && this.game.touchX <= this.x + this.width) &&
            (this.y <= this.game.touchY && this.game.touchY <= this.y + this.height) &&
            this.game.touchY >= this.game.checkLine) {
            this.markedForDelition = true;


        }

    }
}
