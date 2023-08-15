export default class preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("ball", "./assets/images/ball.png");
    this.load.image("pala", "./assets/images/pala.png");
    this.load.image("obstacle", "./assets/images/obstaculo.png");
    
  }

  create() {
    this.scene.start("game");
  }
}
