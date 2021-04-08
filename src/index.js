import Phaser from 'phaser';
import MyGame from './scenes/test'
import BattleScene from './scenes/battle'
// import logoImg from './assets/logo.png';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    width: 500,
    height: 300,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0,
            debug: false,
        }
    },
    scene: [BattleScene, MyGame],
    scale: {
        zoom: 2
    }
};

const game = new Phaser.Game(config);
