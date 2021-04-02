import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import Test from '../assets/test.json';
import WorldTiles from '../assets/world_map_tiles.png'
import Man from '../assets/Male 12-3.png'

export default class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super('MyGame');
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
        key: 'left-walk',
        frames: this.anims.generateFrameNumbers('man', {start: 3, end: 5}),
        frameRate: 10,
        repeat: -1
      })
      this.anims.create({
        key: 'right-walk',
        frames: this.anims.generateFrameNumbers('man', {start: 6, end: 8}),
        frameRate: 10,
        repeat: -1
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
      this.add.sprite(100, 100, 'man')
        .play('up-walk')
    }
}