class Test extends Phaser.Scene {
    constructor() {
      super("testScene");
    }
    
    create() {
      this.add.text(20, 20, "test");
    }
  }