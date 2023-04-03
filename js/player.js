class Player {
    constructor(game, maxSpeed){
        this.game = game;
        this.SpriteWidth = 128;
        this.SpriteHeight = 128;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 4;
        this.width = this.SpriteWidth;
        this.height = this.SpriteHeight;
        this.scale = 1;
        this.x = 10;
        this.y = this.game.bottomMargin - this.height * this.scale ;
        this.speed = 0;
        this.maxSpeed = maxSpeed;
        this.image = document.getElementById('player');

        this.fps = 16;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;

        this.playerHealth = new HP(this.game);
        this.states = [new Idle(this), new Run(this), new Attack(this), new Hit(this), new Death(this)];
        this.currentState = this.states[0];
        this.currentState.enter()

    }

    draw(context){
        //draw player function

        // context.fillStyle = "lime";
        // context.globalAlpha = 0.5;
        // context.fillRect(this.x, this.y, this.width * this.scale , this.height * this.scale);
        // context.globalAlpha = 1;
        context.drawImage(this.image,
            this.frameX * this.SpriteWidth,
            this.frameY * this.SpriteHeight,
            this.SpriteWidth,
            this.SpriteHeight,
            this.x,
            this.y,
            this.width * this.scale,
            this.height * this.scale)
        this.playerHealth.draw(context)

    }

    setSpeed(speed){
        //set up speed for player
        this.speed = speed;
    }

    update(deltaTime){
        //update function

        this.currentState.handleState(this.game)
        this.x += this.speed

        // horizontal boundaries
        if (this.x < 0){
            this.x = 0;
        } else if (this.x > this.game.width - this.width){
            this.x = this.game.width - this.width;
        }
        // vertical boundaries
        if (this.y < 0){
            this.y = 0;
        } else if (this.y > this.game.height - this.height - this.game.bottomMargin){
            this.y = this.game.height - this.height;
        }
        if (!this.game.gameEnd){
        // sprite animation
        if (this.frameTimer >= this.frameInterval) {
            // fixing not eq frames
            if (this.frameX >= this.maxFrame){
                this.frameX = 0;
            } else {
                this.frameX ++;
                //console.log(this.frameX)
            }
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime
        }
        }
    }

    setState(state){
        //set up state for player
        this.currentState = this.states[state]
        this.currentState.enter()
    }

    hit(){
        //counting hit to player
        if (this.playerHealth.currentHP > 0){
            this.playerHealth.lastHP = this.playerHealth.currentHP;
            this.playerHealth.currentHP -= 1;
        }
    }
}