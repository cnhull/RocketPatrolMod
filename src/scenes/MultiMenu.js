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
            fontFamily: 'Courier',
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

        this.add.text(centerX, centerY- textSpacer, 'Multi Player', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'P1: Use (<=) and (=>) to move & (UP) to Fire', menuConfig).setOrigin(0.5);
        this.add.text(centerX, CenterY, 'P2: Use (A) and (D) to move & (W) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer + textSpacer, 'Press <= for Cooperative Mode or => for Competitive Mode', menuConfig).setOrigin(0.5);

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
            //easy breezy
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard!!!!
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }

}