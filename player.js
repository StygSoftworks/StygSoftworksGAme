//player.js
//This file contains the player class which is used to create the player object.


//The player class
var player={


    imageFile : "images/statesFaceSmall.png"
    ,
    
    
    //function to reset the player and its properties
    reset: function(){

        

        //reset the x and y gravity
        this.gravity = {
            x: 0,
            y: 0,//0.3/CONSTANTS.FPS
        };

        //set the gravity to slighly below the jump button value
        this.gravity.y = 5/CONSTANTS.FPS;

        this.jumpButton ={
            pressed: false,
            value : -(6/CONSTANTS.FPS) - player.gravity.y,
            keys : [38, 32, 87], // up, space, w
            //function to check if the jump button is pressed or given a value
            isButtonCodePressed: function (_key) {
                return this.keys.indexOf(_key) != -1;
            }
        }

        this.x=canvas.width/5;
        this.y=canvas.height/2;

        this.width=canvas.width/10;
        this.height= canvas.height/10;

        //reset the score
        this.score=0;
        
        //reset the x and y velocity
        this.velocity = {
            x: 0,
            y: 0
        };

        //reset the x and y acceleration
        this.acceleration = {
            x: 0,
            y: 0
        };
        

        this.rotation = 0;

        player.jumpButton.pressed = false;

        this.gameOver=false;

        //add touch listeners
        document.addEventListener("touchstart",this.touchStartHandler,false);
        document.addEventListener("touchend",this.touchEndHandler,false);

        //add key listeners
        document.addEventListener("keydown",this.keyDownHandler,false);
        document.addEventListener("keyup",this.keyUpHandler,false);

        //add mouse listeners
        document.addEventListener("mousedown",this.mouseDownHandler,false);
        document.addEventListener("mouseup",this.mouseUpHandler,false);
    },

    //handle jump
    jump: function(){

        this.velocity.y += this.jumpButton.value;
        
    },

    //touch start handler
    touchStartHandler: function(e){
        player.jumpButton.pressed = true;
    },

    //touch end handler
    touchEndHandler: function(e){
        player.jumpButton.pressed = false;
    },
    
    //keydown handler
    keyDownHandler: function(e){
        //if player.jumpButton is not undefined
        if(player.jumpButton != undefined){
            //if the jumpButton
            if(player.jumpButton.isButtonCodePressed(e.keyCode)){
                player.jumpButton.pressed = true;
            }
        }
    },

    //mouse down handler
    mouseDownHandler: function(e){
        player.jumpButton.pressed = true;
    },

    //keyup handler
    keyUpHandler: function(e){
        //if player.jumpButton is not undefined
        if(player.jumpButton != undefined){
            //if the jumpButton
            if(player.jumpButton.isButtonCodePressed(e.keyCode)){
                player.jumpButton.pressed = false;
            }
        }
    },

    //mouse up handler
    mouseUpHandler: function(e){
        player.jumpButton.pressed = false;
    },

    //function to draw the player
    draw: function(){

        //draw the player
        ctx.lineWidth=1;

        //detect if this.imageFile is not undefined
        if(this.imageFile != undefined){

            //add the image to the canvas if it is not already there
            if(document.getElementById(this.imageFile) == null){
                var img = new Image();
                img.src = this.imageFile;
                img.id = this.imageFile;

                document.body.appendChild(img);
         
                //hide the image from the user
                img.style.display = "none";
            }

            //draw the image and handle transparent backgrounds
            var img = document.getElementById(this.imageFile);


            //increase the rotation by the velocity
            this.rotation += this.velocity.y;

            //make sure the rotation is between -45 and 45
            if(this.rotation > 45){
                this.rotation = 45;
            }
            else if(this.rotation < -45){
                this.rotation = -45;
            }


            if(this.rotation != 0){

                

                //draw the image at the rotation
                ctx.save();
                ctx.translate(this.x + this.width/2, this.y + this.height/2);
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.drawImage(img, -this.width/2, -this.height/2, this.width, this.height);
                ctx.restore();
            }

            //if the player is not moving
            else{
                //draw the image normally
                ctx.drawImage(img, this.x, this.y, this.width, this.height);
            }



            
        }
        
        //print the this.y position of the player to the top left of the screen rounded to the nearest integer
        ctx.fillStyle="black";
        ctx.font="10px Arial";
        ctx.textAlign="left";
        ctx.fillText("y: "+Math.round(this.y),20,10);
 
    },

    //function to draw the score at the top right of the screen
    drawScore: function(){
        //print the score to the top right of the screen
        ctx.fillStyle="black";
        ctx.font="10px Arial";
        ctx.textAlign="right";
        ctx.fillText("Score: "+this.score,canvas.width,10);
    },

    //function to move the player based on updating the velocity and acceleration
    move: function(){
            //add the velocity to the position
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            //add the gravity to the velocity
            this.velocity.x += this.gravity.x;
            this.velocity.y += this.gravity.y;
    },

    //function to update the player
    update: function(){

        //if the jump button is pressed
        if(this.jumpButton.pressed){
            //jump
            this.jump();
        }

        //move the player
        this.move();

        //draw the player
        this.draw();

        //if the player is off the screen, reset the player and set the game state to menu
        if(this.y>canvas.height || this.y<0){
            //set the game over boolean to true
            this.gameOver=true;
        }

        //if gameOver is true
        if(this.gameOver){

            //remove the key listeners
            document.removeEventListener("keydown",this.keyDownHandler,false);
            document.removeEventListener("keyup",this.keyUpHandler,false);

            //remove the mouse listeners
            document.removeEventListener("mousedown",this.mouseDownHandler,false);
            document.removeEventListener("mouseup",this.mouseUpHandler,false);

            gameState = gameStates.mainMenu;

            //reset the score
            this.score=0;
            this.reset();

            //reset the menu
            menu.reset();

        }

    }

}
