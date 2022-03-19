import gameover from "../assets/img/game.jpg"
import replay from "../assets/img/replay.png"

class GameOver extends Phaser.Scene {

    constructor () {
        super('GameOver');
    }

    preload(){
        this.load.image('over', `${gameover}`);
        this.load.image('replay', `${replay}`);
    }
    create() {
        this.cameras.main.setBackgroundColor('#000');
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 4, 'replay').setDepth(2).setScale(0.1,0.1);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 8, 'over').setDepth(1);
        
        document.getElementsByClassName('game-over')[0].classList.add('visible');
    }
}

export default GameOver;