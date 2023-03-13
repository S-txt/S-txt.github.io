const states = {
    IDLE: 0,
    RUN: 1,
    ATTACK: 2,
    HIT: 3,
}

class State {
    constructor(state) {
        this.state = state;
    }

}

export  class Idle extends State{
    constructor(player) {
        super('IDLE');
        this.player = player;
    }
    // action when entering this state
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 0;
        this.player.maxFrame = 6;
    }
    // tracking to change state
    handleState(game){
        if  (game.score >= 500){
            this.player.setState(states.RUN)
        } else if (game.lastScore == 'miss'){
            this.player.setState(states.HIT)
        } else if(['perfect'].includes(game.lastScore)){
                this.player.setState(states.ATTACK)
            }

    }
}
export  class Run extends State{
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
export  class Attack extends State{
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
    handleState(){
        if (this.player.frameX >= this.player.maxFrame){
            this.player.game.lastScore = "perfect "
            this.player.setState(states.IDLE)
        }
    }
}
export  class Hit extends State{
    constructor(player) {
        super('HIT');
        this.player = player;
    }
    // we have not this state, just blinking
    enter(){
        this.player.frameX = 0;
        this.player.frameY = 0;
        this.player.maxFrame = 2;
    }
    // tracking to change state
    handleState(){
        if (this.player.frameX >= this.player.maxFrame){
            this.player.setState(states.IDLE)

        }
    }
}