import {HP} from './hp.js';
import {Idle, Run, Attack, Hit} from "./playerStates.js";

export class Player {
    constructor(game, maxSpeed){
        this.game = game;
        this.SpriteWidth = 183;
        this.SpriteHeight = 146;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 6;
        this.width = this.SpriteWidth;
        this.height = this.SpriteHeight;
        this.x = 10;
        this.y = this.game.bottomMargin - this.height ;
        this.speed = 0;
        this.maxSpeed = maxSpeed;
        this.image = document.getElementById('player');

        this.fps = 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;

        this.playerHealth = new HP(this.game);
        this.playerAlive = true;
        // TODO add state death
        this.states = [new Idle(this), new Run(this), new Attack(this), new Hit(this)];
        this.currentState = this.states[0];
        this.currentState.enter()

    }

    draw(context){
        context.fillStyle = "lime";
        context.globalAlpha = 0.5;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.globalAlpha = 1;
        context.drawImage(this.image,
            this.frameX * this.SpriteWidth,
            this.frameY * this.SpriteHeight,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height)
        this.playerHealth.draw(context)

    }

    setSpeed(speed){
        this.speed = speed;
    }

    update(deltaTime){
        if (this.playerHealth.currentHP <= 0 ){
            this.playerAlive = false;
            this.game.gameEnd = true;
        }
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

        // sprite animation
        if (this.frameTimer > this.frameInterval) {
            // fixing not eq frames
            if (this.frameX >= this.maxFrame){
                this.frameX = 0;
            } else {
                this.frameX ++;
            }
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime
        }
    }

    setState(state){
        this.currentState = this.states[state]
        this.currentState.enter()
    }
}