import Phaser from 'phaser';
import MyGame from './scenes/test'
// import logoImg from './assets/logo.png';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 400,
    height: 300,
    scene: MyGame,
    scale: {
        zoom: 2
    }
};

const game = new Phaser.Game(config);
