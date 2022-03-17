import Phaser from "phaser";
// assets
import background from "../assets/img/sky.png";
// external classes
import Player from "../objects/Player";
import { addCoins } from "../data.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game-playing");
  }

  preload() {
    this.load.image("bg", `${background}`);
    // Player image needs to be associated with Player Atlas
    this.load.atlas("player", "assets/player.png", "assets/player_atlas.json");
    // load tileset and json files
    this.load.image("tiles", "assets/grassworld.png");
    this.load.tilemapTiledJSON("map", "assets/grasslevel.json");
  }

  create() {
    // load the background image
    this.bg = this.add
      .image(0, 0, "bg")
      .setOrigin(0, 0)
      .setDisplaySize(3000, 750);
    // SET WORLD bounds
    // Load tilemap
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("grass-level", "tiles");
    const platforms = map.createLayer("platforms", tileset, 0, 0);
    const background = map.createLayer("background", tileset, 0, 0);
    platforms.setCollisionByExclusion(-1, true);

    // adding the player and physics for player
    // this.player = new Player(this, 0, 200, "player");
    this.player = this.physics.add
      .sprite(10, 650, "player")
      .setScale(0.2)
      .setCollideWorldBounds(true);

    // Player Animations - Ideally this needs to happen in player class
    // Ran into issues with Player class so lets leave it here for now
    this.anims.create({
      key: "idle",
      frames: [{ key: "player", frame: "robo_player_0" }],
      frameRate: 10,
    });

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("player", {
        prefix: "robo_player_",
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: [{ key: "player", frame: "robo_player_1" }],
      frameRate: 10,
    });

    // Set bounds to the image of bacground
    // This is where you determine the world bounds by setting it to width and height of your background
    this.physics.world.setBounds(
      0,
      0,
      background.displayWidth,
      background.displayHeight
    );

    // Collision between Map and Player
    this.physics.add.collider(this.player, platforms);
    // Get inputs
    this.cursors = this.input.keyboard.createCursorKeys();

    // Setting the cameras zoom and content to the size of your background!
    // Do the same thing here set the background size to the camera and bound it to bound
    this.cameras.main
      .setBounds(0, 0, background.displayWidth, background.displayHeight)
      .startFollow(this.player)
      .setZoom(3);
  }

  update() {
    // This will Ideally be handled by the Player class too
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-100);
      if (this.player.body.onFloor()) {
        this.player.play("walk", true);
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(100);
      addCoins();
      if (this.player.body.onFloor()) {
        this.player.play("walk", true);
      }
    } else {
      // If no keys are pressed, the player keeps still
      this.player.setVelocityX(0);
      // Only show the idle animation if the player is footed
      // If this is not included, the player would look idle while jumping
      if (this.player.body.onFloor()) {
        this.player.play("idle", true);
      }
    }

    // Player can jump while walking any direction by pressing the space bar
    // or the 'UP' arrow
    if (
      (this.cursors.space.isDown || this.cursors.up.isDown) &&
      this.player.body.onFloor()
    ) {
      this.player.setVelocityY(-350);
      this.player.play("jump", true);
    }
    if (this.player.body.velocity.x > 0) {
      this.player.setFlipX(false);
    } else if (this.player.body.velocity.x < 0) {
      // otherwise, make them face the other side
      this.player.setFlipX(true);
    }
  }
}
