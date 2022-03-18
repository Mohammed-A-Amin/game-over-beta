import Phaser from "phaser";
// Scenes
import Game from "./scenes/Game";
import GameOver from './scenes/GameOver.js'
import MainMenu from "./scenes/MainMenu";


const config = {
  width: 1025,
  height: 750,
  backgroundColor: "#90EE90",
  autoCenter: true,
  type: Phaser.AUTO,
  // Set Physics
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 700 },
      debug: true,
    },
  },
  scene: [MainMenu, Game, GameOver]
};
new Phaser.Game(config);
// document.getElementById("startGame").addEventListener('click', 
// function(){ )});