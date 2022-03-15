import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.playerSprite = scene.add.existing(this);
  }

  preload() {}

  create() {}

  update() {}
}
