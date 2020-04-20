class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        //loads audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('Moonbase', './assets/Moonbase.mp3');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('spaceship', './assets/spaceship.png');


    }

    create() {
        //displays the menu!

        let musicConfig = {  
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
            
        }


        let menuConfig = {
            fontFamily: 'Candara',
            fontSize: '28px',
            backgroundColor: '#191970',
            color: '#7B68EE',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }



        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        this.ship02 = new Spaceship(this, game.config.width + 96, 350, 'spaceship', 0, 20).setOrigin(0, 0);


        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY- textSpacer - textSpacer, '  ROCKET PATROL MOD AAAAA  ', menuConfig).setOrigin(0.5);
        //this.add.text(centerX, centerY, 'Use <--> to move & (F) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#87CEFA';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY - textSpacer, '  Press <= for Single Player  ', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY , '  Press => for Multi Player  ', menuConfig).setOrigin(0.5);
        //defining keys
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


        //this.add.text(20, 20, "Rocket Matrol Menu");
        //this.scene.start("playScene");
    }

    update(){

        this.starfield.tilePositionX -= 4;
        this.ship02.update();

        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //go to single player menu
            this.sound.play('sfx_select');
            this.scene.start("singleMenu");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //go to multiplayer menu
            this.sound.play('sfx_select');
            this.scene.start("multiMenu");
        }
        // if(Phaser.Input.Keyboard.JustDown(keyUP)){
        //     this.sound.play('sfx_select');
        //     this.scene.start("test");
        // }
    }

}