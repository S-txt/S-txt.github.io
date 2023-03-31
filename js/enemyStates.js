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
        // this.idleFrames = 0;
        // this.runFrames = 0;
        // this.attackFrames = 0;
        // this.hitFrames = 0;
        // this.deathFrames = 0;
    }

    // setFrames(idleFrames, runFrames, attackFrames, hitFrames, deathFrames){
    //     this.idleFrames = idleFrames;
    //     this.runFrames = runFrames;
    //     this.attackFrames = attackFrames;
    //     this.hitFrames = hitFrames;
    //     this.deathFrames = deathFrames;
    // }
}

class Idle extends State{
    constructor(enemy) {
        super('IDLE');
        this.enemy = enemy;
    }
    // action when entering this state
    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 3;
        this.enemy.maxFrame = 3;
        this.enemy.setSpeed(0);
    }
    // tracking to change state
    handleState(game){
        //don't use on enemy

    }
}
class Run extends State{
    constructor(enemy) {
        super('RUN');
        this.enemy = enemy;
    }
    // action when entering this state
    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 4;
        this.enemy.maxFrame = 3;
        this.enemy.setSpeed(this.enemy.maxSpeed)
    }
    // tracking to change state
    handleState(game){
        if (this.enemy.x <= game.player.x + game.player.width * game.player.scale - 50) {
            this.enemy.setState(states.HIT)
        }

        // reserve out of bounce
        if(this.enemy.x <= -this.enemy.width){
            this.enemy.setState(states.HIT)
        }

    }
}
class Attack extends State{
    constructor(enemy) {
        super('ATTACK');
        this.enemy = enemy;
    }
    // action when entering this state
    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 3;
        this.enemy.maxFrame = 3;
    }
    // tracking to change state
    handleState(){
    }
}
class Hit extends State{
    constructor(enemy) {
        super('HIT');
        this.enemy = enemy;
    }
    // we have not this state, just blinking
    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 2;
        this.enemy.maxFrame = 1;
        this.enemy.setSpeed(0);
    }
    // tracking to change state
    handleState(){
        if (this.enemy.frameX >= this.enemy.maxFrame) {
        this.enemy.setState(states.DEATH);
        }
    }
}
class Death extends State{
    constructor(enemy) {
        super('DEATH');
        this.enemy = enemy;
    }
    // we have not this state, just blinking
    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 1;
        this.enemy.maxFrame = 4;
        this.enemy.setSpeed(0);
    }
    // tracking to change state
    handleState(){
        if (this.enemy.frameX >= this.enemy.maxFrame){
            this.enemy.markedForDelition = true;
        }
    }
}