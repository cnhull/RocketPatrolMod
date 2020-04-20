console.log("hewwo world");

//Points Breakdown
/*
    10 - track a high score that persists across scenes and display it in the UI (displays in single player modes and at the end of each single player game)
    10 - add your own copyright free music to the Play Scene (credit to Thor Christopher Arisland at opengameart.org/users/tcarisland)
    10 - implement the speed increase that happens after 30 seconds in the original game
    15 - display the time remaining (in seconds) on the screen
    *15 - create a new title screen
    15 - implement parallax scrolling
    50 - implement a simultaneous two-player mode (TWO two-player modes!)
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, MultiMenu, SingleMenu, PlayVersus, PlayCoop ]
}

let game = new Phaser.Game(config);

game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
    gameTotal: 60000
    
}

let textSettings = {

}

game.highScore = 0;
game.versus = 0;
game.coopScore = 0;

//reserves keyboard variables
let keyF, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE, keyW, keyS, keyA, keyD;

