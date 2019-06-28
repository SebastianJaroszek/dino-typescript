class GameScene extends Phaser.Scene {

    cat: Phaser.Physics.Arcade.Sprite;
    background: Phaser.Physics.Arcade.Sprite;
    dog: Phaser.Physics.Arcade.Sprite;

    dogs: Phaser.GameObjects.Group;

    score: number;
    scoreText: Phaser.GameObjects.Text;

    timer: Phaser.Time.TimerEvent;

    active: boolean = true;

    speed: number = 1;
    gravity: number = 1000;

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload(): void {
        this.load.image('cat', 'assets/cat.png');
        this.load.image('dog1', 'assets/dog1.png');
        this.load.image('dog2', 'assets/dog2.png');
        this.load.image("background", "assets/background.jpg");
    }

    create(): void {
        this.background = this.physics.add.sprite(480, 225, 'background');

        this.physics.world.setBounds(0, 0, 960, 430, true, true, true, true);

        this.cat = this.physics.add.sprite(100, 370, 'cat');
        this.cat.setScale(0.2);
        this.cat.setFlipX(true);
        this.cat.setGravityY(this.gravity);
        this.cat.setCollideWorldBounds(true);

        this.dogs = this.physics.add.group();

        this.timer = this.time.addEvent({
            delay: 2000,
            callback: this.createOneDog.bind(this),
            loop: false
        });

        const space_key: Phaser.Input.Keyboard.Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        space_key.on('down', this.jump.bind(this));
        //
        //
        // this.score = 0;
        // let style = {font: '20px Arial', fill: '#fff'};
        // this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
        //
        // this.arrow = this.input.keyboard.createCursorKeys();

    }

    update(timestep: number, delta: number): void {

        this.physics.add.overlap(this.cat, this.dogs, this.hitDog.bind(this));

        // this.physics.overlap(this.player, this.coin, this.hit.bind(this));
        //
        // if (this.arrow.right.isDown) {
        //     this.player.x += 3;
        // } else if (this.arrow.left.isDown) {
        //     this.player.x -= 3;
        // }
        //
        // if (this.arrow.up.isDown) {
        //     this.player.y -= 3;
        // } else if (this.arrow.down.isDown) {
        //     this.player.y += 3;
        // }
    }

    private createTimerForDogs() {
        this.timer = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 2500),
            callback: this.createOneDog.bind(this),
            loop: false
        });
    }

    private createOneDog(): void {

        this.dog = this.physics.add.sprite(1100, 370, 'dog1');

        this.dogs.add(this.dog);

        this.dog.setVelocityX(-400 * this.speed);
        this.dog.setScale(0.15);

        // this.speed += 0.1;
        this.cat.setGravityY(this.gravity * this.speed);

        this.createTimerForDogs();
    }

    private jump(): void {
        if (!this.active || this.cat.y < 300) {
            return;
        }
        this.cat.setVelocityY(-800/* - (this.speed * 2 * 75)*/);
    }

    private hitDog(): void {

        this.active = false;

        this.timer.destroy();

        this.dogs.children.each((p: Phaser.Physics.Arcade.Sprite) => {
            p.body.velocity.x = 0;
        });

        this.restartGame();
    }

    private restartGame(): void {
        this.scene.restart();
        this.score = 0;
        this.active = true;
        this.speed = 1;
    }

    /*private hit() {
        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 400);

        this.score += 1;
        this.scoreText.setText('score: ' + this.score);

        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 2,
            scaleY: 2,
            yoyo: true
        });
    }*/
}

export default GameScene;
