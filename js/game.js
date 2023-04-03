const buildBaseGame = () => {
    document.title = 'Game!'

    document.body.innerHTML = `
        <div class="username">${localStorage.getItem('currentRegion')}</div>

        <div id="wrapper">
            <div class="bgStreet"></div>
            <div class="bgRoad"></div>
            <canvas id="canvasBG"></canvas>
            <canvas id="canvasGame"></canvas>
            
            
        </div>
        
        <img src="./img/yurei.png" alt="player" id="player">
        <img src="./img/tile.png" alt="tile" id="tile">
        <img src="./img/street.jpg" alt="street" id="street">
        <img src="./img/road.png" alt="road" id="road">
        <img src="./img/enemy.png" alt="enemy" id="enemy">
    `
}

class Game {
    constructor(ctx, ctxBg, width, height, regionName, regionDiff) {
        this.ctx = ctx;
        this.ctxBg = ctxBg
        this.width = width;
        this.height = height;
        this.regionName = regionName;
        this.regionDiff = regionDiff;
        this.key = undefined;
        this.difficultyModifier = 1.1 + (this.regionDiff * 0.05);

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
        this.tileDifficultyInterval = 500

        this.input = new InputHandler(this);
        this.player = new Player(this, this.playerSpeed);

        this.tiles = [];
        this.enemies = [];

        //DOM elements
        this.scoreEl = null;
        this.scoreGradeEl = null;
        this.timeEl = null;

        this.enemyPosition = Math.floor((this.checkLine - this.startline + this.width * 0.25) / this.tileSpeed * this.enemySpeed + this.player.x + this.player.width  + 50);
        this.randomTileInterval = Math.random() * this.tileInterval + this.tileDifficultyInterval;

        this.touchX = -1;
        this.touchY = -1;

        this.streetBg = document.getElementById('street')
        this.roadBg = document.getElementById('road')


        this.lastScore = '';
        this.deltaScore = -1;
        this.score = 0;

        this.roundTime = 10; // in sec how fast difficulty will raise
        this.currentTime = 0; // in ms
        this.playTime = 0; // in ms
        this.lastTime = 0; // in sec

        this.gameEnd = false;
        this.gamePaused = false;

        window.addEventListener("resize", (e) => {
            this.height = e.target.innerHeight
            this.width = e.target.innerWidth
            this.ctx.height = e.target.innerHeight
            this.ctx.width = e.target.innerWidth
        });

        window.addEventListener("blur", (e ) => {
            this.pauseGame()
        })

        // init
        this.drawBg()

        this.setUI()
        this.pauseGame()
        //this.animationObserver()


    }
    drawBg(){
        console.log("generate BG");
        this.ctxBg.fillStyle = "red";
        this.ctxBg.clearRect(0,0,this.width,this.height);
        if (this.streetBg.complete) {
            this.ctxBg.drawImage(this.streetBg, 0, 0, this.width, this.bottomMargin)
        } else {
            this.streetBg.onload = (e) => {
                this.ctxBg.drawImage(this.streetBg, 0, 0, this.width, this.bottomMargin)
            };
        }
        if (this.roadBg.complete) {
            this.ctxBg.drawImage(this.roadBg, 0, this.bottomMargin, this.width, this.height - this.bottomMargin)
        } else {
            this.roadBg.onload = (e) => {
                this.ctxBg.drawImage(this.roadBg, 0, this.bottomMargin, this.width, this.height - this.bottomMargin)
            };
        }




    }
    animationObserver(){
        // Select the node that will be observed for mutations
        const targetNode = document.getElementsByClassName("scoreGrade")[0];

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(function(mutations) {
            if (!targetNode.classList.contains("animate")){
                targetNode.classList.add("animate");
            } else {targetNode.classList.remove("animate");}

        });

       // Start observing the target node for configured mutations
        observer.observe(targetNode, {
            attributes:    false,
            childList:     true,
            characterData: false});

    }
    render(context, deltaTime){
        //this.drawBg()
        //console.log("play: "+ this.playTime + "\ndelta: " + deltaTime  )
        // TODO predraw bg

        //check pause game
        if (this.gamePaused) return
        this.playTime += deltaTime;

        //increase difficulty
        if (Math.floor(this.playTime * 0.001) % this.roundTime === 0 &&
            this.tileSpeed <= 15 &&
            Math.floor(this.playTime * 0.001) !== this.lastTime
            ){
            //console.log("increase")
            this.lastTime = Math.floor(this.playTime * 0.001);
            this.increaseDifficulty()}

        handlerTiles(this, deltaTime);
        this.player.draw(context);
        this.player.update(deltaTime);

        context.fillRect(0, this.checkLine,this.width, 3)

        this.timeEl.textContent = Math.floor(this.playTime * 0.001);

    }

    setUI(){
        // Init UI DOM elements

        this.playTime = 0;

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
        timer.textContent = this.playTime;
        document.body.append(timer);


        this.player.playerHealth.bar = progress;
        this.player.playerHealth.barText = progressText;
        this.scoreEl = score;
        this.scoreGradeEl = scoreGrade;
        this.timeEl = timer;
        //console.log(this.playTime)
    }

    pauseGame(){

        //pause game function
        if (this.gamePaused) return
        if (this.gameEnd) return
        this.gamePaused = true

        //create a button
        let play = document.createElement("div")
        play.className = "play";
        play.textContent = "Play";
        play.addEventListener('click', (e) => {
            this.gamePaused = false;
            play.remove();
        })
        document.body.append(play);
    }

    increaseDifficulty(){
        this.tileSpeed = Math.floor(this.tileSpeed * this.difficultyModifier)
        this.enemySpeed = Math.floor(this.enemySpeed * this.difficultyModifier)
        this.tileDifficultyInterval = Math.floor(this.tileDifficultyInterval * 0.8) //TODO make it more flex
    }
}

function handlerTiles (game, deltaTime){
    // generate all
    // TODO move starting position to top border
    if (game.tileTimer > game.randomTileInterval){
        game.tiles.push(new Tile(game, game.tileSpeed ,Math.floor(Math.random() * 4)))
        game.enemies.push(new Enemy(game, game.enemyPosition, game.enemySpeed))
        game.randomTileInterval = Math.random() * game.tileInterval + game.tileDifficultyInterval;
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

const buildGamePage = async (regionName, regionDiff) => {
    buildBaseGame();
    const canvas = document.getElementById('canvasGame');
    const ctx = canvas.getContext('2d'); // Alpha channel disabled for better optimization

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const canvasBg = document.getElementById('canvasBG');
    const ctxBg = canvasBg.getContext('2d', { alpha: false }); // Alpha channel disabled for better optimization

    canvasBg.width = window.innerWidth;
    canvasBg.height = window.innerHeight;
    //let times = []
    async function animate(timeStamp){
        // main animation loop

        // fps calculation
        const deltaTime = timeStamp - lastTime;
        lastTime = performance.now();

        ctx.clearRect(0,0, canvas.width, canvas.height);
        if (!game.gameEnd){
            game.currentTime += deltaTime;
            //times.push(deltaTime)
            game.render(ctx, deltaTime);
            requestAnimationFrame(animate)
        } else{

            // send game results to the server 
            await importScore(
                localStorage.getItem('userId'),
                localStorage.getItem('currentRegion'),
                game.score
            )


            // game is ended redraw to leaderboard
            //TODO remove event listener
            //console.log("Game ended at " + game.currentTime/1000 + "\nwith score " + game.score )
            // TODO send score to server
            //times.forEach((t) => {console.log(t)})
            buildLeaderBoardPage(game.regionName,game.score);
        }
    }

    const game = new Game(ctx, ctxBg, canvas.width, canvas.height, regionName, regionDiff);
    game.currentTime = 0;
    let lastTime = 0;
    animate(0);



    console.log(game);

}