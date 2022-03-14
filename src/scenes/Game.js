import Phaser, { Cameras } from "phaser";
// assets/imgs
import sky from "../assets/img/castle.jpg";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game-playing");
  }

  preload() {
    this.load.image("background", `${sky}`);
    // load tileset with map json
    // its the path in the build folder!
    this.load.image("tiles", "./assets/tileset3.png");
    // load json file
    this.load.tilemapTiledJSON("map", "./assets/level1-2.json");
    // load player
    this.load.atlas('player', './assets/player.png','./assets/player_atlas.json')
  }

  create() {
    this.add.image(0, 800, "background").setOrigin(0, 0).setScale(2,2).setPosition();
    // add the map
    const map = this.make.tilemap({ key: "map" });
    // tileset
    // important: first param is name of tileset in Tiled, SECOND: key of loaded tileset in preload
    const tileset = map.addTilesetImage("tileset", "tiles");
    const platforms = map.createLayer("platforms", tileset, 0, 0);
    const background = map.createLayer("background", tileset, 0, 0);


    platforms.setCollisionByExclusion(-1, true);

    this.cameras.main.scrollY = 600

    this.player = this.physics.add.sprite(300, 900, 'player');
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, platforms);

    this.cameras.main
    .setBounds(0, 600, background.displayWidth, background.displayHeight)
    .startFollow(this.player);


    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('player', {
        prefix: 'robo_player_',
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 'robo_player_0' }],
      frameRate: 10,
    });
    this.anims.create({
      key: 'jump',
      frames: [{ key: 'player', frame: 'robo_player_1' }],
      frameRate: 10,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Control the player with left or right keys
    // Control the player with left or right keys
if (this.cursors.left.isDown) {
  this.player.setVelocityX(-200);
  if (this.player.body.onFloor()) {
    this.player.play('walk', true);
  }
} else if (this.cursors.right.isDown) {
  this.player.setVelocityX(200);
  if (this.player.body.onFloor()) {
    this.player.play('walk', true);
  }
} else {
  // If no keys are pressed, the player keeps still
  this.player.setVelocityX(0);
  // Only show the idle animation if the player is footed
  // If this is not included, the player would look idle while jumping
  if (this.player.body.onFloor()) {
    this.player.play('idle', true);
  }
}

// Player can jump while walking any direction by pressing the space bar
// or the 'UP' arrow
if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
  this.player.setVelocityY(-350);
  this.player.play('jump', true);
}
  }
  
}
