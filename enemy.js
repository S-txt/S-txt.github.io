import {HP} from "./hp.js";
import {Attack, Hit, Idle, Run, Death} from "./enemyStates.js";

export class Enemy {
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

        //this.Health = new HP(this.game);
        this.markedForDelition = false;

        this.states = [new Idle(this), new Run(this), new Attack(this), new Hit(this), new Death(this)];
        this.currentState = this.states[1];
        this.currentState.enter()

    }

    setSpeed(speed){
        this.speed = speed;
    }

    draw(context) {
        // context.fillStyle = "red"
        // context.globalAlpha = 0.5;
        // context.fillRect(this.x, this.y, this.width, this.height);
        // context.globalAlpha = 1;
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
        this.currentState = this.states[state]
        this.currentState.enter()
    }

    update(deltaTime){
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

        if (this.x <= this.game.player.x + this.game.player.width - 50){
            //this.markedForDelition = true;
        }

    }
}