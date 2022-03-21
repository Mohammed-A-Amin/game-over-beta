import background from "../assets/img/castle.jpg";
import playbutton from "../assets/img/playbutton.png"
import gameover from "../assets/img/game.jpg"

export default class Game extends Phaser.Scene {

    constructor() {

        super('bootGame')
    }
    

    preload() {
         
        this.load.image('menuBg', `${background}`);
        this.load.audio("menuMusic", "assets/mountain.mp3" )
        this.load.image('play_button', `${playbutton}`);
        this.load.audio("start", "assets/game-start.mp3" )
    
        
        // this.load.audio('theme', [
        //     '../assets/img/gameoverost.mp3'
        // ]);
    
    }
    
    onObjectClicked() {
        // let menuMusic = this.sound.add('menuMusic', {volume: 0.5})
        // menuMusic.stop()

        let start = this.sound.add('start')
        start.play();
        this.scene.start('game-playing')
       
    
    }
    
    create() {
        // menuMusic = this.sound.add('menuMusic', {volume: 0.5})
        // menuMusic.play();
        this.bg = this.add
        .image(0, 0, "menuBg")
        .setOrigin(0, 0)
        .setDisplaySize(1300, 800);
    
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 3, 'play_button').setDepth(1);
    
        playButton.setInteractive();
    
        this.input.on('gameobjectdown', this.onObjectClicked, this);
    

    
    }

}