window.addEventListener('load',function (){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', e => {
                this.game.key = 'P' + e.key;
            });
            window.addEventListener('keyup', e => {
                this.game.key = 'R' + e.key;
            });
            window.addEventListener('touchstart', e => {
                this.game.touchY = e.changedTouches[0].pageY
                this.game.touchX = e.changedTouches[0].pageX
                this.game.key = 'touchstart'
            })
            window.addEventListener('touchmove', e => {
                //console.log(e)
            })
            window.addEventListener('touchend', e => {
                this.game.touchY = -1
                this.game.touchX = -1
                this.game.key = 'touchend'

            })
        }
    }

    class Player {
        constructor(game){
            this.game = game;
            this.SpriteWidth = 183;
            this.SpriteHeight = 146;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 6;
            this.width = this.SpriteWidth;
            this.height = this.SpriteHeight;
            this.x = 10;
            this.y = this.SpriteHeight;
            this.speed = 0;
            this.maxSpeed = 5;
            this.image = document.getElementById('player');
            this.fps = 15;
            this.frameInterval = 1000/this.fps;
            this.frameTimer = 0;

        }
        draw(context){
            // context.fillRect(this.x, this.y, this.width, this.height);
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

        setSpeed(speed){
            this.speed = speed;
        }

        update(deltaTime){
            // animation & speed controls
            if (this.game.key == 'PArrowRight') {
                this.setSpeed(this.maxSpeed);
                this.frameY = 1;
            } else if (this.game.key == 'RArrowRight'){
                this.setSpeed(0);
                this.frameY = 0
            } else if (this.game.key == 'PArrowLeft'){
                this.setSpeed(-this.maxSpeed);
                this.frameY = 1;
            } else if (this.game.key == 'RArrowLeft'){
                this.setSpeed(0);
                this.frameY = 0
            } else {
                this.setSpeed(0);
                this.frameY = 0
            }

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
                if (this.frameY == 2){
                    this.maxFrame = 5;
                } else {
                    this.maxFrame = 6;
                }
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
    }

    class Tile{
        constructor(game, row) {
            this.game = game;
            this.width = game.width/4;
            this.height = this.width;
            this.image = document.getElementById('tile')
            this.speed = 0;
            this.maxSpeed = 8;
            this.x = row * this.width;
            this.y = this.game.bottomMargin - this.width / 2;
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
            if ((this.y > this.game.width + this.game.bottomMargin + this.width / 2 ) ||
                    ((this.x <= this.game.touchX && this.game.touchX <= this.x + this.width) &&
                    (this.y <= this.game.touchY && this.game.touchY <= this.y + this.height))){
                this.markedForDelition = true
                //game.lastScore = "miss"
            }

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
            getScore(game, tile);
            })
            displayText(game,ctx)
        game.tiles = game.tiles.filter(tile => !tile.markedForDelition);
    }
    function getScore(game, tile){
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
            }
            game.score += game.deltaScore
            console.log('deltaScore: ' + game.deltaScore)
        }

    }
    function displayText(game, context){
        context.fillStyle = 'grey';
        context.font = '16px Comics Sans';
        context.fillText(game.score, 30,  30)
        context.font = '30px Comics Sans';
        context.fillText(game.lastScore , game.width/2.5, game.height/2)
        context.fillStyle = 'white';
        context.font = '16px Comics Sans';
        context.fillText(game.score, 30, 30)
        context.font = '30px Comics Sans';
        context.fillText(game.lastScore, game.width/2.5+2, game.height/2+2)
    }

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.key = undefined;
            this.input = new InputHandler(this);
            this.player = new Player(this)
            this.bottomMargin = height * 0.39;
            // this.numberOfTiles = 2;
            this.tiles = []
            this.tileTimer = 0;
            this.tileInterval = 200;
            this.randomTileInterval = Math.random() * this.tileInterval + 500;
            this.touchX = -1;
            this.touchY = -1;
            this.streetBg = document.getElementById('street')
            this.lastScore = '';
            this.deltaScore = -1;
            this.score = 0;

        }
        render(context, deltaTime){
            //context.drawImage(this.streetBg, 0,0, this.width, this.height*0.39)
            this.player.draw(context);
            this.player.update(deltaTime);
            handlerTiles(this, deltaTime);
            //displayText(this, context);
        }
        init(){
            // for (let i = 0; i < this.numberOfTiles; i++){
            //     this.tiles.push(new Tile(this, Math.floor(Math.random() * 4)));
            }
        }


    const game = new Game(canvas.width, canvas.height);
    //const tile = new Tile(this, Math.random() * 4)
    game.init()
    let lastTime = 0;
    function animate(timeStamp){
        // fps calculation
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.render(ctx, deltaTime);
        requestAnimationFrame(animate)
    }
    animate(0);
    console.log(game);
});