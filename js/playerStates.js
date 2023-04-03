const states = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2,
    HIT: 3,
    DEATH: 4,
}

class State {
    constructor(state) {
        this.state = state;
    }
}

class Idle extends State{
    constructor(player) {
        super('IDLE');
        this.player = player;
    }
    // action when entering this state
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 0;
        this.player.maxFrame = 3; // n-1
    }
    // tracking to change state
    handleState(game){
        // is player dead
        if (this.player.playerHealth.currentHP <= 0){
            this.player.setState(states.DEATH)
        }
        // is player get hit

        if (this.player.playerHealth.currentHP !== this.player.playerHealth.lastHP){
            this.player.setState(states.HIT)
        }
        // is player attack
        if(game.lastScore === 'perfect'){
                this.player.setState(states.ATTACK)
        }

    }
}
class Run extends State{
    constructor(player) {
        super('RUN');
        this.player = player;
    }
    // action when entering this state
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 1;
        this.player.maxFrame = 5;
        this.player.setSpeed(this.player.maxSpeed)
    }
    // tracking to change state
    handleState(){

    }
}
class Attack extends State{
    constructor(player) {
        super('ATTACK');
        this.player = player;
    }
    // action when entering this state
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrame = 5;
    }
    // tracking to change state
    handleState(game){
        if (this.player.frameX >= this.player.maxFrame){
            game.lastScore = "perfect "
            //game.enemies[0].setState(states.HIT)

            this.player.setState(states.IDLE)
        }
    }
}
class Hit extends State{
    constructor(player) {
        super('HIT');
        this.player = player;
    }
    // we have not this state, just blinking
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.maxFrame = 2;
    }
    // tracking to change state
    handleState(game){
        if (this.player.frameX >= this.player.maxFrame){
            this.player.playerHealth.lastHP = this.player.playerHealth.currentHP
            game.lastScore="miss "
            this.player.setState(states.IDLE)

        }
    }
}
class Death extends State{
    constructor(player) {
        super('DEATH');
        this.player = player;
    }
    // we have not this state, just blinking
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 4;
        this.player.maxFrame = 5;
    }
    // tracking to change state
    handleState(game){

        if (this.player.frameX >= this.player.maxFrame){
            this.player.game.gameEnd = true;
        }
    }
}