class PlayVersus extends Phaser.Scene{
    constructor(){
        super("playVersus");
    }

    preload(){
        //loads images and sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        //this.load.image('starfield', './assets/starfield.png');
        this.load.image('black', './assets/starfieldBlack.png');
        this.load.image('blue', './assets/starfieldBlue.png');
        this.load.image('star', './assets/starfieldStar.png');
        this.load.image('planets', './assets/planets.png');
        this.load.image('frame', './assets/frame.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){

        this.speed = game.settings.spaceshipSpeed;
        this.totalTime = game.settings.gameTotal;

        let musicConfig = {  
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
            
        }
        let music = this.sound.add('Moonbase', musicConfig);
        music.play(musicConfig);

        //this.add.text(20, 20, "Rocket Patrol Play");
        //creates starfield/places tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfieldBlack = this.add.tileSprite(0, 0, 640, 480, 'black').setOrigin(0, 0);
        this.starfieldBlue = this.add.tileSprite(0, 0, 640, 480, 'blue').setOrigin(0, 0);
        this.starfieldStar = this.add.tileSprite(0, 0, 640, 480, 'star').setOrigin(0, 0);
        this.starfieldPlanets = this.add.tileSprite(0, 0, 640, 480, 'planets').setOrigin(0, 0);
        //borders!!
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);

        //green UI block
        this.add.rectangle(37, 42, 566, 64, 0x191970).setOrigin(0, 0);

        //adds player 1 rocket
        this.p1Rocket = new Rocket(this, game.config.width/2 + 2, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);
        this.p2Rocket = new Rocket2(this, game.config.width/2 -2, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);

        //add spaceships 3x
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0, 0);


        //defining keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //animation time, baby (config)
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //SCOOOOORE
        this.winner = "  It's a tie!  ";
        this.p1Score = 0;
        this.p2Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Candara',
            fontSize: '28px',
            backgroundColor: '#6495ED',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.frame = this.add.tileSprite(0, 0, 640, 480, 'frame').setOrigin(0, 0);

        this.timeLeft = 0;
        this.clockDisplay = this.add.text(game.config.width/2, 54, this.timeLeft + "  ", scoreConfig);
        //this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        this.p1Display = this.add.text(69, 54, "P1: " + this.p1Score, scoreConfig);
        this.p2Display = this.add.text(180, 54, "P2: " + this.p2Score, scoreConfig);
        //this.scoreRight = this.add.text(500, 54, game.highScore, scoreConfig);
        
        //game over flag
        this.gameOver = false;

        //60 second clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 64, ' GAME OVER ', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 , ' P1 Score: ' + this.p1Score, scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + (64*1), ' P2 Score: ' + this.p2Rocket.score, scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + (64*2), this.winner , scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + (64*3), ' (Space) to Restart or <= for Menu ', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update(){
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.restart(this.p1Score);
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }

        //this.starfield.tilePositionX -= 4;
        this.starfieldBlue.tilePositionX -= 2;
        this.starfieldStar.tilePositionX -= 4;
        this.starfieldPlanets.tilePositionX -= 3;

        if(!this.gameOver){
            this.timeLeft = Math.trunc((game.settings.gameTimer - this.clock.getElapsed())/1000)
            this.clockDisplay.text = this.timeLeft;
            if(Math.trunc(this.clock.getElapsed()/1000) > 28){
                game.settings = {
                    spaceshipSpeed: this.speed + 1,
                    gameTimer: this.timeLeft*1000,
                    gameTotal: this.totalTime
                    
                  }
            }
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //check collisions!!
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.ship03, "p1");
        }
        if(this.checkCollision(this.p2Rocket, this.ship03)){
            console.log('kablooey ship 03');
            this.p2Rocket.reset();
            this.shipExplode(this.ship03, "p2");
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, "p1");
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)){
            console.log('kablooey ship 02');
            this.p2Rocket.reset();
            this.shipExplode(this.ship02, "p2");
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, "p1");
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)){
            console.log('kablooey ship 01');
            this.p2Rocket.reset();
            this.shipExplode(this.ship01, "p2");
        }
    }

    checkCollision(rocket, ship){
        //simple Axis-Aligned Bounding Boxes-- aka, a hitbox. 
        if(rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
            }
        else{
            return false;
        }
    }

    shipExplode(ship, rocket){
        console.log( rocket + " hits!");
        console.log("p1 score: " + this.p1Score);
        console.log("p2 score: " + this.p2Score);
        ship.alpha = 0; //temporarily hide ship
        //create an explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        //plays explosion
        boom.anims.play('explode');
        //when the explosion hits the last frame...
        boom.on('animationcomplete', () => {
            //resetting ship position
            ship.reset();
            //and making it visible again
            ship.alpha = 1;
            //...and getting rid of the explosion that is now completed
            boom.destroy();
        });
        //increment score
        //rocket += ship.points;

        if(rocket == "p1"){
            this.p1Score += ship.points;
            this.p1Display.text = "P1: " + this.p1Score;
            console.log("adding to p1!!!");
        }

        if(rocket == "p2"){
            this.p2Score += ship.points;
            this.p2Display.text = "P2: " + this.p2Score;
            console.log("adding to p2!!!");
        }
        this.sound.play('sfx_explosion');
        if(this.p1Score > this.p2Score){
            this.winner = " Player 1 Wins! ";
        }
        else if(this.p2Score > this.p1Score){
            this.winner = " Player 2 Wins! ";
        }
        else if(this.p1Score == this.p2Score){
            this.winner = "It's a tie!";
        }
    }
}