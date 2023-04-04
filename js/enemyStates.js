const enemyStates = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2,
    HIT: 3,
    DEATH: 4,
}

class EnemyState {
    constructor(state) {
        this.state = state;
    }
}

class EnemyIdle extends EnemyState{
    constructor(enemy) {
        super('IDLE');
        this.enemy = enemy;
    }
    // action when entering this state
    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 0;
        this.enemy.maxFrame = 6;
        this.enemy.setSpeed(0);
    }
    // tracking to change state
    handleState(game){
        //don't use on enemy
    }
}
class EnemyRun extends EnemyState{
    constructor(enemy) {
        super('RUN');
        this.enemy = enemy;
    }
    // action when entering this state
    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 1;
        this.enemy.maxFrame = 6;
        this.enemy.setSpeed(this.enemy.maxSpeed)
    }
    // tracking to change state
    handleState(game){
        // enemy reach the player
        if (this.enemy.x <= game.player.x + game.player.width * game.player.scale - 50) {
            this.enemy.setState(enemyStates.HIT)
        }

        // reserve out of bounce
        if(this.enemy.x <= -this.enemy.width){
            this.enemy.setState(enemyStates.HIT)
        }

    }
}
class EnemyAttack extends EnemyState{
    constructor(enemy) {
        super('ATTACK');
        this.enemy = enemy;
    }
    // action when entering this state
    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 2;
        this.enemy.maxFrame = 5;
    }
    // tracking to change state
    handleState(){
    }
}
class EnemyHit extends EnemyState{
    constructor(enemy) {
        super('HIT');
        this.enemy = enemy;
    }
    // we have not this state, just blinking
    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 3;
        this.enemy.maxFrame = 3;
        this.enemy.setSpeed(0);
    }
    // tracking to change state
    handleState(){
        if (this.enemy.frameX >= this.enemy.maxFrame) {
        this.enemy.setState(enemyStates.DEATH);
        }
    }
}
class EnemyDeath extends EnemyState{
    constructor(enemy) {
        super('DEATH');
        this.enemy = enemy;
    }
    // we have not this state, just blinking
    enter(){
        this.enemy.frameX = 0;
        this.enemy.frameY = 4;
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