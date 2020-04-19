// rocket prefab (does prefab stand for previously fabricated...?)
class Rocket2 extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this); //adds to "existing", "displayList", and "updateList"

        this.isFiring = false; //is the rocket going pew pew
        this.sfxRocket = scene.sound.add('sfx_rocket'); //adds rocket sfx
    }

    update(){
        if(!this.isFiring){
            if(keyA.isDown && this.x >= 47){
                this.x -=2;
            }
            else if(keyD.isDown && this.x <= 578){
                this.x += 2;
            }
        }//closes "if not firing"

        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play(); //plays sound effect
        }

        //if fired, move up
        if(this.isFiring && this.y >= 108){
            this.y -= 2;
        }
        //reset on miss
        if(this.y <= 108){
            this.isFiring = false;
            this.y = 431;
        }

    }

    //resets rocket to original position
    reset(){
        this.isFiring = false;
        this.y = 431;
    }
    
}