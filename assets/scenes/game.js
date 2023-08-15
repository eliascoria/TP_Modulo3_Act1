export default class game extends Phaser.Scene {
  score;
  constructor() {
    super("game");
  }

  init() {
    this.score = 0;
    this.level = 1;
  }
  create() {
    //sprites
    this.ball = this.physics.add
      .sprite(400, 100, "ball")
      .setBounce(1).setCircle(8, 8, 8)
      .setCollideWorldBounds(true);
    this.ballVel = 200;
    this.obstacle = this.physics.add.staticGroup();
    this.ball.setVelocity(this.ballVel);
    this.shovel = this.physics.add.sprite(400, 500, "pala").setGravity(0);
    this.shovel.setCollideWorldBounds(true);
    this.shovel.body.allowGravity = false;
    this.shovel.setImmovable(true);
    

    //cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //colliders
    this.physics.add.collider(
      this.shovel,
      this.ball,
      this.ballbounce,
      null,
      this
    );

    this.physics.add.collider(this.obstacle, this.ball);
    //levels
    this.levelText = this.add.text(700, 20, "Level: " + this.level, {
      fontSize: "16px",
      fontStyle: "bold",
      fill: "#3cf508",
    });
    //score
    this.scoreText = this.add.text(20, 20, "Score:" + this.score, {
      fontSize: "16px",
      fontStyle: "bold",
      fill: "#3cf508",
    });

    //
    this.cameras.main.setBackgroundColor(this.backgroundColor);
  }

  update() {
    if (this.score >= 10) {
      this.nextLvl();
    }
    if(this.ball.y>=580){
      this.gameOver();
    }

    if (this.cursors.left.isDown) {
      this.shovel.setVelocityX(-330);
    } else {
      if (this.cursors.right.isDown) {
        this.shovel.setVelocityX(330);
      } else {
        this.shovel.setVelocityX(0);
      }
    }
    if (this.cursors.up.isDown) {
      this.shovel.setVelocityY(-330);
    } else {
      if (this.cursors.down.isDown) {
        this.shovel.setVelocityY(330);
      } else {
        this.shovel.setVelocityY(0);
      }
    }
  }
  ballbounce() {
    this.score += 1;
    this.scoreText.setText("Score: " + this.score);
  }
  nextLvl() {
    this.level++;
    this.levelText.setText("Level: " + this.level);
    this.score = 0;
    this.scoreText.setText("Score: " + this.score);

    this.shovel.setPosition(400, 500);

    this.ballVel = this.ballVel * 1.2;
    this.ball.setPosition(400, 20);
    this.ball.setVelocity(this.ballVel);

    this.addObst();

    this.cameras.main.setBackgroundColor(this.randomColor());

    if (this.level >= 20) {
      this.LvlWin();
    }
  }
  addObst(){
    let rndObstacleX = Phaser.Math.Between(10,790);
    let rndObstacleY = Phaser.Math.Between(80,450);
    let rndObstacleScale = Phaser.Math.Between(1,3);
    this.obstacle.create(rndObstacleX, rndObstacleY, "obstacle").setScale(rndObstacleScale).refreshBody();
  }
  randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 8)];
    }
    return color;
  }

  gameOver(){
    this.shovel.setVisible(false);
    this.ball.destroy();
    this.obstacle.setVisible(false);
    this.scoreText.setVisible(false);
    this.levelText.setVisible(false);
    this.cameras.main.setBackgroundColor("#0000");

    this.gameOverText = this.add.text(280,220, "Perdiste",{
      fontSize: '50px',
      fill: "#fff",
      align: "center"
    });

    this.restartText = this.add.text(320,340, "Reintentar",{
      fontSize: '26px',
      fill: "#fff",
      align: "center"
    }).setInteractive().on('pointerdown', () => this.scene.start('game'));

  }
  gameWin(){
    this.shovel.setVisible(false);
    this.ball.destroy();
    this.obstacle.setVisible(false);
    this.scoreText.setVisible(false);
    this.levelText.setVisible(false);
    this.cameras.main.setBackgroundColor("#0000");

    this.gameWinText = this.add.text(280,220, "Ganaste",{
      fontSize: '50px',
      fill: "#fff",
      align: "center"
    });

    this.restartText = this.add.text(320,340, "Reintentar",{
      fontSize: '26px',
      fill: "#fff",
      align: "center"
    }).setInteractive().on('pointerdown', () => (this.scene.start("game")));;    
  }
}
