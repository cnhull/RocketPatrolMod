console.log("hewwo world");

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
    
}

//reserves keyboard variables
let keyF, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE, keyW, keyS, keyA, keyD;

