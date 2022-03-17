import Phaser from "phaser";
// Scenes
import Game from "./scenes/Game";

const config = {
  width: 1025,
  height: 750,
  backgroundColor: "#90EE90",
  type: Phaser.AUTO,
  // Set Physics
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 700 },
      debug: true,
    },
  },
  scene: [Game],
};

document.getElementById("startGame").addEventListener('click', 
function(){ new Phaser.Game(config)});