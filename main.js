import Phaser from "phaser";
// Scenes
import Game from "./src/scenes/Game";

const config = {
  width: 800,
  height: 1000,
  type: Phaser.AUTO,
  // Set Physics
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [Game],
};

new Phaser.Game(config);
