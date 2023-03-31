class Enemy {
    constructor(game, position, maxSpeed) {
        this.game = game;
        this.SpriteWidth = 87;
        this.SpriteHeight = 87;
        this.frameX = 0;
        this.frameY = 4;
        this.maxFrame = 3;
        this.width = this.SpriteWidth;
        this.height = this.SpriteHeight;
        this.x = Math.abs(position);
        this.y = this.game.bottomMargin - this.height;
        this.speed = 0;
        this.maxSpeed = maxSpeed;
        this.image = document.getElementById('enemy');

        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        this.markedForDelition = false;

        this.states = [new EnemyIdle(this), new EnemyRun(this), new EnemyAttack(this), new EnemyHit(this), new EnemyDeath(this)];
        this.currentState = this.states[1];
        this.currentState.enter()

    }

    setSpeed(speed){
        //set up speed for enemy
        this.speed = speed;
    }

    draw(context) {
        //draw function for enemy

        // ==== hitbox of enemy =====
        // context.fillStyle = "red"
        // context.globalAlpha = 0.5;
        // context.fillRect(this.x, this.y, this.width, this.height);
        // context.globalAlpha = 1;
        // ==========================
        context.drawImage(this.image,
            this.frameX * this.SpriteWidth,
            this.frameY * this.SpriteHeight,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height)


    }

    setState(state){
        //set up state for enemy
        this.currentState = this.states[state]
        this.currentState.enter()
    }

    update(deltaTime){
        //main update enemy function
        this.currentState.handleState(this.game)

        this.x -= this.speed
        // sprite animation
        if (this.frameTimer > this.frameInterval) {
            // fixing not eq frames
            if (this.frameX >= this.maxFrame ){
                this.frameX = 0;
            } else {
                this.frameX ++;
            }
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime
        }

    }
}