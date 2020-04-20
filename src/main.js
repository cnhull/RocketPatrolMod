console.log("hewwo world");

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, MultiMenu, SingleMenu, PlayVersus, PlayCoop ]
}

let game = new Phaser.Game(config);

game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
    
}

let textSettings = {

}

game.highScore = 0;
game.versus = 0;
game.coopScore = 0;

//reserves keyboard variables
let keyF, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE, keyW, keyS, keyA, keyD;

