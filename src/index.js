import Phaser from 'phaser';
import MyGame from './scenes/test'
// import logoImg from './assets/logo.png';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    width: 900,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0,
            debug: false,
        }
    },
    scene: MyGame,
    scale: {
        zoom: 2
    }
};

const game = new Phaser.Game(config);
