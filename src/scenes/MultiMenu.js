class MultiMenu extends Phaser.Scene {
    constructor() {
        super("multiMenu");
    }

    preload(){
        //loads audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        //displays the menu!
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY- textSpacer - textSpacer, 'Multiplayer', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer, 'P1: (<=)&(=>) to move & (UP) to Fire', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY , 'P2: (A)&(D) to move & (W) to Fire', menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer , 'Press <= for Cooperative Mode', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer + textSpacer , 'Press => for Competitive Mode', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer + textSpacer +textSpacer, 'Press (DOWN) to go back', menuConfig).setOrigin(0.5);

        //defining keys
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


        //this.add.text(20, 20, "Rocket Matrol Menu");
        //this.scene.start("playScene");
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //go to single player menu
            this.sound.play('sfx_select');
            this.scene.start("playCoop");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //go to multiplayer menu
            this.sound.play('sfx_select');
            this.scene.start("playVersus");
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.sound.play('sfx_select');
            this.scene.start("menuScene");
        }
    }

}