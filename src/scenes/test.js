import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import Test from '../assets/test.json';
import WorldTiles from '../assets/world_map_tiles.png'
import Man from '../assets/Male 12-3.png'

export default class MyGame extends Phaser.Scene
{

    constructor ()
    {
        super({ key: 'MyGame' });
    }
    init() {
      this.cursors = this.input.keyboard.createCursorKeys()
    }

    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('WorldTiles', WorldTiles);
        this.load.tilemapTiledJSON('Test', Test)
        this.load.spritesheet('man', Man, {
          frameWidth: 32
        })
    }
      
    create ()
    {
      this.anims.create({
        key: 'down-idle',
        frames: [{ key: 'man', frame: 1}]
      })
      this.anims.create({
        key: 'down-walk',
        frames: this.anims.generateFrameNumbers('man', {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
      })
      this.anims.create({
        key: 'left-idle',
        frames: [{ key: 'man', frame: 4}]
      })
      this.anims.create({
        key: 'left-walk',
        frames: this.anims.generateFrameNumbers('man', {start: 3, end: 5}),
        frameRate: 10,
        repeat: -1
      })
      this.anims.create({
        key: 'right-idle',
        frames: [{ key: 'man', frame: 7}]
      })
      this.anims.create({
        key: 'right-walk',
        frames: this.anims.generateFrameNumbers('man', {start: 6, end: 8}),
        frameRate: 10,
        repeat: -1
      })
      this.anims.create({
        key: 'up-idle',
        frames: [{ key: 'man', frame: 10}]
      })
      this.anims.create({
        key: 'up-walk',
        frames: this.anims.generateFrameNumbers('man', {start: 9, end: 11}),
        frameRate: 10,
        repeat: -1
      })
      const map = this.make.tilemap({ key: 'Test' });
      const tileset = map.addTilesetImage('World', 'WorldTiles');
      map.createStaticLayer('Tile Layer 1', tileset)
      this.player = this.physics.add.sprite(100, 100, 'man')
        .play('down-idle')
       
      this.physics.world.bounds.width = map.widthInPixels;
      this.physics.world.bounds.height = map.heightInPixels;
      this.player.setCollideWorldBounds(true);
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.player);
      this.cameras.main.roundPixels = true;
    }

    update() {
      const speed = 200

      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-speed)
        this.player.play('left-walk', true)
      }
      else if (this.cursors.right.isDown) {
        this.player.setVelocityX(speed)
        this.player.play('right-walk', true)
      }
      else if (this.cursors.down.isDown) {
        this.player.setVelocityY(speed)
        this.player.play('down-walk', true)
      }
      else if (this.cursors.up.isDown) {
        this.player.setVelocityY(-speed)
        this.player.play('up-walk', true)
      }
      else {
        this.player.setVelocity(0)
        const key = this.player.anims.currentAnim.key
        const parts = key.split('-')
        const direction = parts[0]
        this.player.play(`${direction}-idle`)
      }
    }
}