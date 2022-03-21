import win from "../assets/img/win.jpg";
import replay from "../assets/img/replay.png"

export default class Game extends Phaser.Scene {

    constructor() {

        super('Win')
    
    }
    
    preload() {
        
        this.load.image('win', `${win}`);
        this.load.image('replay', `${replay}`);
        this.load.audio("victory", "assets/victory.mp3" )
        this.load.audio("start", "assets/game-start.mp3" )
        
        // this.load.audio('theme', [
        //     '../assets/img/gameoverost.mp3'
        // ]);
    
    }
    
    onObjectClicked() {

        window.location.reload()
    
    }
    
    create() {
        let victory = this.sound.add('victory')
        victory.play();
        this.cameras.main.setBackgroundColor('#000');
        let replay = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'replay').setDepth(2).setScale(0.1,0.1);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 4, 'win').setDepth(1);
       
    
        replay.setInteractive();
    
        this.input.on('gameobjectdown', this.onObjectClicked, this);

        
    
        document.getElementsByClassName('game-over')[0].classList.add('visible');

    
    }

}