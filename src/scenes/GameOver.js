
import gameover from "../assets/img/game.jpg"
import replay from "../assets/img/replay.png"

class GameOver extends Phaser.Scene {

    constructor () {
        super('GameOver');
    }

    preload(){
        this.load.image('over', `${gameover}`);
        this.load.image('replay', `${replay}`);
        this.load.audio("gameEffect", "assets/gameover.mp3" )
    }
    onObjectClicked() {
    
        window.location.reload()
    
    }
    create() {
        let go = this.sound.add('gameEffect')
        go.play();
        this.cameras.main.setBackgroundColor('#000');
        let replay = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 4, 'replay').setDepth(2).setScale(0.1,0.1);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 8, 'over').setDepth(1);
       
    
        replay.setInteractive();
    
        this.input.on('gameobjectdown', this.onObjectClicked, this);
    
        document.getElementsByClassName('game-over')[0].classList.add('visible');
    }
}

export default GameOver;