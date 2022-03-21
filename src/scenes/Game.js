import Phaser from "phaser";
// assets
import background from "../assets/img/background.png";
// external classes
import Player from "../objects/Player";
import { addCoins, subtractRisk } from "../data.js";
import { addRisk } from "../data.js";
import { dogeRisk } from "../data.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game-playing");
  }

  preload() {
    this.load.audio("bgMusic", "assets/gameoverost.mp3" )
    this.load.audio("jumpSound", "assets/jump.mp3")
    this.load.image("bg", `${background}`);
    // Player image needs to be associated with Player Atlas
    this.load.atlas("player", "assets/player.png", "assets/player_atlas1.json");
    this.load.atlas("knight", "assets/knight2.png", "assets/knight2.json");
    // load tileset and json files
    this.load.image("tiles", "assets/grassworld2.png");
    this.load.tilemapTiledJSON("map", "assets/grasslevel4.json");
  }

  create() {
    let music = this.sound.add('bgMusic')
    music.play();
    music.loop = true;
    // load the background image
    this.bg = this.add
      .image(0, 0, "bg")
      .setOrigin(0, 0)
      .setDisplaySize(3000, 750);
    // SET WORLD bounds
    // Load tilemap
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("grassworld2", "tiles");
    const platforms = map.createLayer("platforms", tileset, 0, 0);
    const background = map.createLayer("background", tileset, 0, 0);
    const deadly = map.createLayer("deadly", tileset, 0, 0);
    const finish = map.createLayer("finish", tileset, 0, 0);
    const doge = map.createLayer("doge", tileset, 0, 0);
    
    // const doge = map.createLayer("doge", tileset, 0, 0);

    doge.setCollisionByExclusion(-1, true);
    finish.setCollisionByExclusion(-1, true);
    deadly.setCollisionByExclusion(-1, true);
    platforms.setCollisionByExclusion(-1, true);
    // this.physics.add.existing(deadly)
    // adding the player and physics for player
    // this.player = new Player(this, 0, 200, "player");
    this.player = this.physics.add
      .sprite(30, 500, "knight")
      .setScale(0.05)
      .setCollideWorldBounds(true);


    // Player Animations - Ideally this needs to happen in player class
    // Ran into issues with Player class so lets leave it here for now

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("knight", {
        prefix: "walk_",
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      
      frames: [{ key: "knight", frame: "idle.png" }],
      frameRate: 10,
    });


    // this.anims.create({
    //   key: "walk",
    //   frames: [{key: "knight", frame: "walk1.png",}],
    //   frameRate: 10,
    // });

    this.anims.create({
      key: "jump",
      frames: [{ key: "knight", frame: "jump.png" }],
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
    this.physics.add.collider(this.player, deadly, () => {
      if (true)
      {
        // this.player.x = 10 
        this.scene.start('GameOver')
        subtractRisk();
        music.stop()
        
      }
    });

    this.physics.add.collider(this.player, doge, () => {
      if (true)
      {
        // this.player.x = 10 
        this.scene.start('DOGE')
        dogeRisk();
        music.stop()
        
      }
    });

    this.physics.add.collider(this.player, finish, () => {
      if (true)
      {
        // this.player.x = 10 
        this.scene.start('Win')
        addRisk();
        music.stop()
        
      }
    });
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
      this.player.setVelocityY(-348);
      this.player.play("jump", true);
      let jumpSound = this.sound.add('jumpSound', {volume: 0.1})
      jumpSound.play();
  
    }
    if (this.player.body.velocity.x > 0) {
      this.player.setFlipX(false);
    } else if (this.player.body.velocity.x < 0) {
      // otherwise, make them face the other side
      this.player.setFlipX(true);
    }
  }
}
