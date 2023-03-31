import { Player } from './player.js';
import { Tile } from './tile.js'
import { InputHandler } from "./input.js";
import {Enemy} from "./enemy.js";

window.addEventListener('load',function (){

    const params = new URL(document.location).searchParams;

    document.querySelector('.username').textContent = params.get('username')

    console.log(params.get("id"), params.get("username"))

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    class Game {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.key = undefined;
            this.bottomMargin = this.height * 0.3;
            this.checkLine = this.height - this.width * 0.25;
            this.startline = this.bottomMargin;
            this.playerSpeed = 3 ;
            this.tileSpeed = 10;

            this.input = new InputHandler(this);
            this.player = new Player(this, this.playerSpeed);
            this.enemySpeed = 8;
            // УДАЛИТЬ ПОТОМ
            this.speedDelta = Math.abs(this.enemySpeed - this.tileSpeed);
            this.yRoad = this.checkLine - this.startline + this.width*0.25;
            this.ySpeed = this.tileSpeed;
            this.yUpdates = this.yRoad / this.ySpeed; // число обновлений до достижения
            this.yTimeinSec = this.yUpdates ; // 60 апдейтов в секунде, столько нужно секунд на апдейт
            this.xSpeed = this.enemySpeed * 60 / 1000
            // __________
            this.enemyPosition = this.yUpdates * (this.enemySpeed) + this.player.x + this.player.width  + 50 // + (this.width - (this.player.x + this.player.width - 100))
                                ;
            this.tiles = []
            this.enemies = []
            this.tileTimer = 0;
            this.tileInterval = 200;
            this.randomTileInterval = Math.random() * this.tileInterval + 500;
            this.touchX = -1;
            this.touchY = -1;
            this.streetBg = document.getElementById('street')
            this.roadBg = document.getElementById('road')
            this.lastScore = '';
            this.deltaScore = -1;
            this.score = 0;
            this.roundTime = 50000; // in ms
            this.currentTime = 0; // in ms
            this.gameEnd = false;
            this.gamePaused = false;
            window.addEventListener("resize", (e) => {
                this.height = e.target.innerHeight
                this.width = e.target.innerWidth
                canvas.height = e.target.innerHeight
                canvas.width = e.target.innerWidth
            });

        }
        render(context, deltaTime){
            context.drawImage(this.roadBg, 0,this.bottomMargin, this.width, this.height-this.bottomMargin)
            context.drawImage(this.streetBg, 0,0, this.width, this.bottomMargin)
            if (!this.gameEnd){
                handlerTiles(this, deltaTime);
                // this.enemy.draw(context)
                // this.enemy.update(deltaTime)
                this.player.draw(context);
                this.player.update(deltaTime);
                context.fillRect(0, this.checkLine,this.width, 3)
                //context.fillStyle="pink"
                //context.fillRect(this.player.x+this.player.width*this.player.scale-60, this.bottomMargin-50, 10,50)


            }

            //displayText(this, context);
        }
    }

    function handlerTiles (game, deltaTime){
        // generate all
        // TODO move starting position to top border
        if (game.tileTimer > game.tileInterval + game.randomTileInterval){
            game.tiles.push(new Tile(game, game.tileSpeed ,Math.floor(Math.random() * 4)))
            game.enemies.push(new Enemy(game, game.enemyPosition, game.enemySpeed))
            game.randomTileInterval = Math.random() * game.tileInterval + 500;
            game.tileTimer = 0;
        } else {
            game.tileTimer += deltaTime
        }
        game.enemies.forEach(enemy =>{
            enemy.draw(ctx);
            enemy.update(deltaTime);
        })
        game.tiles.forEach(tile => {
            tile.draw(ctx);
            tile.update(ctx,deltaTime);
            getScore(game, tile, deltaTime);
        })
        displayText(game,ctx)

        // filtering deleted elements
        game.tiles = game.tiles.filter(tile => !tile.markedForDelition);
        game.enemies = game.enemies.filter(enemy => !enemy.markedForDelition);
    }

    function getScore(game, tile, deltaTime){
        game.deltaScore = 0
        if (game.touchY >= game.checkLine &&tile.x <= game.touchX &&
            game.touchX <= tile.x + tile.width &&
            game.touchY - tile.y <= tile.height){
            if (game.checkLine - 50 <= game.touchY){
                game.deltaScore = 50
                game.lastScore = "perfect"
                //game.enemies[0].markedForDelition = true;
            // } else if (game.checkLine * 1.25 - 50 <= game.touchY){
            //     game.deltaScore = 25
            //     game.lastScore = "good"
            //     //game.enemies[0].markedForDelition = true;
            // } else if (game.checkLine * 1.5 - 50 <= game.touchY){
            //     game.deltaScore = 10
            //     game.lastScore = "bad"
            //     game.enemies[0].markedForDelition = true;
            } else {
                game.deltaScore = 0
                game.lastScore = "miss"
                // abstract player hp - 1
                game.player.hit()

            }
            game.score += game.deltaScore
            game.deltaScore = 0
            //console.log('deltaScore: ' + game.deltaScore)
        }

    }

    function displayText(game, context){
        context.fillStyle = 'grey';
        context.font = '16px Comics Sans';
        context.fillText(game.score, 30,  30);
        context.font = '30px Comics Sans';
        context.fillText(game.lastScore , game.width/2.5, game.height/2);
        //context.font = '16px Comics Sans';
        //context.fillText(game.roundTime/1000 , 70, 30);
        context.fillStyle = 'white';
        context.font = '16px Comics Sans';
        context.fillText(game.score, 30, 30);
        context.font = '30px Comics Sans';
        context.fillText(game.lastScore, game.width/2.5+2, game.height/2+2);
        //context.font = '16px Comics Sans';
        //context.fillText(game.roundTime/1000 , 70, 30)
    }




    const game = new Game(ctx, canvas.width, canvas.height);

    let lastTime = 0;
    // main animation loop
    function animate(timeStamp){
        // fps calculation
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.render(ctx, deltaTime);
        game.roundTime -= deltaTime;
        requestAnimationFrame(animate)
    }
    animate(0);
    console.log(game);
});