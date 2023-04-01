const buildBaseGame = () => {
    document.title = 'Game!'

    document.body.innerHTML = `
        <div id="wrapper">
            <canvas id="canvasBG"></canvas>
            <canvas id="canvasGame"></canvas>
            
            
        </div>
        
        <img src="./img/SteamMan.png" alt="player" id="player">
        <img src="./img/tile.png" alt="tile" id="tile">
        <img src="./img/street.jpg" alt="street" id="street">
        <img src="./img/road.png" alt="road" id="road">
        <img src="./img/enemy.png" alt="enemy" id="enemy">
    `
}

class Game {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.key = undefined;

        this.bottomMargin = this.height * 0.3;
        this.checkLine = this.height - this.width * 0.25;
        this.startline = this.bottomMargin;

        // speed params
        this.playerSpeed = 3 ;
        this.tileSpeed = 10;
        this.enemySpeed = 8;

        //timers
        this.tileTimer = 0;
        this.tileInterval = 200;

        this.input = new InputHandler(this);
        this.player = new Player(this, this.playerSpeed);

        this.tiles = [];
        this.enemies = [];

        //DOM elements
        this.scoreEl = null;
        this.scoreGradeEl = null;
        this.timeEl = null;

        this.enemyPosition = Math.floor((this.checkLine - this.startline + this.width * 0.25) / this.tileSpeed * this.enemySpeed + this.player.x + this.player.width  + 50);
        this.randomTileInterval = Math.random() * this.tileInterval + 500;

        this.touchX = -1;
        this.touchY = -1;

        this.streetBg = document.getElementById('street')
        this.roadBg = document.getElementById('road')

        this.lastScore = '';
        this.deltaScore = -1;
        this.score = 0;

        this.roundTime = 50000; // in ms how fast difficulty will raise
        this.currentTime = 0; // in ms

        this.gameEnd = false;
        this.gamePaused = false;

        window.addEventListener("resize", (e) => {
            this.height = e.target.innerHeight
            this.width = e.target.innerWidth
            this.ctx.height = e.target.innerHeight
            this.ctx.width = e.target.innerWidth
        });

        // init ui elements
        this.setUI()

    }
    render(context, deltaTime){
        context.drawImage(this.roadBg, 0,this.bottomMargin, this.width, this.height-this.bottomMargin)
        context.drawImage(this.streetBg, 0,0, this.width, this.bottomMargin)

        handlerTiles(this, deltaTime);

        this.player.draw(context);
        this.player.update(deltaTime);

        context.fillRect(0, this.checkLine,this.width, 3)

        this.timeEl.textContent = Math.floor(this.currentTime * 0.001);
    }

    setUI(){
        // Init UI DOM elements
        let progress = document.createElement("progress");
        progress.className = "hp";
        progress.max = this.player.playerHealth.maxHP;
        progress.value = this.player.playerHealth.currentHP;
        document.body.append(progress);

        let progressText = document.createElement("div");
        progressText.className = "hpText";
        document.body.append(progressText);

        let score = document.createElement("div");
        score.className = "score";
        score.textContent = this.score;
        document.body.append(score);

        let scoreGrade = document.createElement("div");
        scoreGrade.className = "scoreGrade";
        scoreGrade.textContent = this.lastScore;
        document.body.append(scoreGrade);

        let timer = document.createElement("div");
        timer.className = "timer";
        this.currentTime = 0; // reset timer
        timer.textContent = this.currentTime;
        document.body.append(timer);

        this.player.playerHealth.bar = progress;
        this.player.playerHealth.barText = progressText;
        this.scoreEl = score;
        this.scoreGradeEl = scoreGrade;
        this.timeEl = timer;
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
    // update elements
    game.enemies.forEach(enemy =>{
        enemy.draw(game.ctx);
        enemy.update(deltaTime);
    })
    game.tiles.forEach(tile => {
        tile.draw(game.ctx);
        tile.update(game.ctx,deltaTime);
        getScore(game, tile, deltaTime);
    })


    // update score on screen
    game.scoreEl.textContent = game.score;
    game.scoreGradeEl.textContent = game.lastScore;

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
            game.score += game.deltaScore
            game.scoreEl.textContent = game.score;
        } else {
            game.lastScore = "miss"
            // abstract player hp - 1
            game.player.hit()
        }
    }

}

const buildGamePage = () => {
    buildBaseGame();


    const canvas = document.getElementById('canvasGame');
    const ctx = canvas.getContext('2d', { alpha: false }); // Alpha channel disabled for better optimization
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    function animate(timeStamp){
        // main animation loop

        // fps calculation
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0,0, canvas.width, canvas.height);
        if (!game.gameEnd){
            game.render(ctx, deltaTime);
            game.currentTime += deltaTime;
            requestAnimationFrame(animate)
        } else{
            // game is ended redraw to leaderboard
            buildLeaderBoardPage();
        }
    }

    const game = new Game(ctx, canvas.width, canvas.height);

    let lastTime = 0;
    animate(0);

    //console.log(game);
}