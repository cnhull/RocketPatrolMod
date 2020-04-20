class PlayCoop extends Phaser.Scene{
    constructor(){
        super("playCoop");
    }

    preload(){
        //loads images and sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        //this.add.text(20, 20, "Rocket Patrol Play");
        //creates starfield/places tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        //borders!!
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);

        //green UI block
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

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
        this.p1Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(500, 54, game.highScore, scoreConfig);
        
        //game over flag
        this.gameOver = false;

        //60 second clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 , 'Your Score: ' + this.p1Score, scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + (64*1), 'High Score: ' + game.highScore, scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + (64*2), '(Space) to Restart or <= for Menu', scoreConfig).setOrigin(0.5);
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

        this.starfield.tilePositionX -= 4;
        if(!this.gameOver){
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
            this.shipExplode(this.ship03, p1Rocket);
        }
        if(this.checkCollision(this.p2Rocket, this.ship03)){
            console.log('kablooey ship 03');
            this.p2Rocket.reset();
            this.shipExplode(this.ship03, p2Rocket);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, p1Rocket);
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)){
            console.log('kablooey ship 02');
            this.p2Rocket.reset();
            this.shipExplode(this.ship02, p2Rocket);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, p1Rocket);
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)){
            console.log('kablooey ship 01');
            this.p2Rocket.reset();
            this.shipExplode(this.ship01, p2Rocket);
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
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
        if(this.p1Score > game.highScore){
            game.highScore = this.p1Score;
            this.scoreRight.text = game.highScore;
        }
    }
}