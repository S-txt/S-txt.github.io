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
        window.addEventListener('touchstart', e => {
            this.game.touchY = e.changedTouches[0].pageY
            this.game.touchX = e.changedTouches[0].pageX
            this.game.key = 'touchstart'
        })
        // window.addEventListener('click', e => {
        //     console.log(e.button)
        //     this.game.touchY = e.y
        //     this.game.touchX = e.x
        //     this.game.key = 'click'
        // })
    }
}