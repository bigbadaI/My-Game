import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import Test from '../assets/test.json';
import WorldTiles from '../assets/world_map_tiles.png'

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
    }
      
    create ()
    {
      const map = this.make.tilemap({ key: 'Test' });
      const tileset = map.addTilesetImage('World', 'WorldTiles');
      map.createStaticLayer('Tile Layer 1', tileset)
    }
}