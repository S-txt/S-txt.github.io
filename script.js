import { Player } from './player.js';
import { Tile } from './tile.js'
import { InputHandler } from "./input.js";

window.addEventListener('load',function (){

    const params = new URL(document.location).searchParams;

    document.querySelector('.username').textContent = params.get('username')

    console.log(params.get("id"), params.get("username"))

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ctx.draw(123)

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.key = undefined;
            this.bottomMargin = this.height * 0.39;
            this.input = new InputHandler(this);
            this.player = new Player(this)
            this.tiles = []
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
            //if (!this.gameEnd){
                handlerTiles(this, deltaTime);

                this.player.draw(context);
                this.player.update(deltaTime);


            //}

            //displayText(this, context);
        }
    }

    function handlerTiles (game, deltaTime){
        if (game.tileTimer > game.tileInterval + game.randomTileInterval){
            game.tiles.push(new Tile(game, Math.floor(Math.random() * 4)))
            //console.log(game.tiles)
            game.randomTileInterval = Math.random() * game.tileInterval + 500;
            game.tileTimer = 0;
        } else {
            game.tileTimer += deltaTime
        }
        game.tiles.forEach(tile => {
            tile.draw(ctx);
            tile.update(ctx,deltaTime);
            getScore(game, tile, deltaTime);
        })
        displayText(game,ctx)
        game.tiles = game.tiles.filter(tile => !tile.markedForDelition);
    }

    function getScore(game, tile, deltaTime){
        game.deltaScore = 0
        if (tile.x <= game.touchX &&
            game.touchX <= tile.x + tile.width &&
            game.touchY - tile.y <= tile.height){
            if (game.height - tile.height <= game.touchY){
                game.deltaScore = 50
                game.lastScore = "perfect"
            } else if (game.height - tile.height * 1.25 <= game.touchY){
                game.deltaScore = 25
                game.lastScore = "good"
            } else if (game.height - tile.height * 1.5 <= game.touchY){
                game.deltaScore = 10
                game.lastScore = "bad"
            } else {
                game.deltaScore = 0
                game.lastScore = "miss"
                // abstract player hp - 1
                if (game.player.playerHealth.currentHP > 0){
                    game.player.playerHealth.currentHP -= 1;
                }

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
        context.font = '16px Comicsw Sans';
        context.fillText(game.score, 30, 30);
        context.font = '30px Comics Sans';
        context.fillText(game.lastScore, game.width/2.5+2, game.height/2+2);
        //context.font = '16px Comics Sans';
        //context.fillText(game.roundTime/1000 , 70, 30)
    }




    const game = new Game(canvas.width, canvas.height);

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