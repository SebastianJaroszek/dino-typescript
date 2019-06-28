import 'phaser';
import GameScene from './game';

const config: any = {
    type: Phaser.AUTO,
    parent: 'content',
    physics: {
        default: 'arcade'
    },
    width: 960,
    height: 450,
    backgroundColor: "#3498db",
    scene: [
        GameScene
    ]
};

new Phaser.Game(config);
