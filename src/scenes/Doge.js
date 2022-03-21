import replay from "../assets/img/replay.png"
import doge from '../assets/img/doge.png'

class DogeOver extends Phaser.Scene {

    constructor () {
        super('DOGE');
    }

    preload(){
     
        this.load.image('replay', `${replay}`);
        this.load.image('doge', `${doge}`);
        this.load.audio("troll", "assets/trollsound.mp3" )
    }
    onObjectClicked() {
    
        window.location.reload()
    
    }
    create() {
        let troll = this.sound.add('troll')
        troll.play();
        this.cameras.main.setBackgroundColor('#000');
        let replay = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 4, 'replay').setDepth(2).setScale(0.1,0.1);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'doge').setDepth(1);
       
    
        replay.setInteractive();
    
        this.input.on('gameobjectdown', this.onObjectClicked, this);
    
        document.getElementsByClassName('game-over')[0].classList.add('visible');
    }
}

export default DogeOver;