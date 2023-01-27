
var settings = {

    //get a random character
    selectedChar: PLAYERCHARACTERS.choices[0],

    //reset the settings
    reset: function () {
        //set the character to the first character
        //this.selectedChar = PLAYERCHARACTERS.Walter;
        this.mouse = { x: 0, y: 0 };

        console.log(this.selectedChar);
    },

    getBackButtonRect: function(){
        return {
            x: canvas.width - 100,
            y: canvas.height - 50,
            width: 100,
            height: 50,
        }
    },

    getRightArrowRect: function(){
        return {
            x: settings.getCharDisplayRect().x + settings.getCharDisplayRect().width + 10,
            y: settings.getCharDisplayRect().y,
            width: 50,
            height: 100,
        };
    },

    getLeftArrowRect: function(){
        return {
            x: settings.getCharDisplayRect().x - 50 - 10,
            y: settings.getCharDisplayRect().y,
            width: 50,
            height: 100,
        };
    },

    getCharDisplayRect: function(){
        return {
            x: canvas.width / 2 - 50,
            y: 100,
            width: 100,
            height: 100,
        };
    },

    //rect for the character name
    getCharNameRect: function(){
        return {
            x: canvas.width / 2 - 50,
            y: 200,
            width: 100,
            height: 50,
        };
    },

    //draw the menu
    draw: function () {

        //fill the background with a light orange color
        ctx.fillStyle = "rgb(255, 200, 100)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Draw settings in the top center of the screen
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Settings", canvas.width / 2, 30);

        //Add a Select your character text
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Select your character", canvas.width / 2, 60);

        var rectCharDisplay = this.getCharDisplayRect();
        var rectLeftArrow = this.getLeftArrowRect();
        var rectRightArrow = this.getRightArrowRect();
        var rectBackButton = this.getBackButtonRect();

        var rectCharName = this.getCharNameRect();

        //draw the rectCharDisplay
        ctx.strokeStyle = "black";
        ctx.strokeRect(rectCharDisplay.x, rectCharDisplay.y, rectCharDisplay.width, rectCharDisplay.height);

        //draw a left and right arrow to the left and right of the character
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("<", rectLeftArrow.x + rectLeftArrow.width / 2, rectLeftArrow.y + rectLeftArrow.height / 2);
        ctx.fillText(">", rectRightArrow.x + rectRightArrow.width / 2, rectRightArrow.y + rectRightArrow.height / 2);

        //draw green boxes around the left and right arrow
        ctx.strokeStyle = "green";
        ctx.strokeRect(rectLeftArrow.x, rectLeftArrow.y, rectLeftArrow.width, rectLeftArrow.height);
        ctx.strokeRect(rectRightArrow.x, rectRightArrow.y, rectRightArrow.width, rectRightArrow.height);

        //draw the back button and outline it in green
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Back", rectBackButton.x + rectBackButton.width / 2, rectBackButton.y + rectBackButton.height / 2);
        ctx.strokeStyle = "green";
        ctx.strokeRect(rectBackButton.x, rectBackButton.y, rectBackButton.width, rectBackButton.height);

        //add an on mouse up event to the canvas
        canvas.onmouseup = function (e) {
            //get the mouse position
            var rect = canvas.getBoundingClientRect();

            //console.log(rect);
            settings.mouse.x = e.clientX - rect.left;
            settings.mouse.y = e.clientY - rect.top;


            //get the index of the selected character
            var charIndex = PLAYERCHARACTERS.choices.indexOf(settings.selectedChar);

            //get the total number of characters
            var totalChars = PLAYERCHARACTERS.choices.length;

            //if the mouse is in the left arrow rect
            if (settings.mouse.x >= rectLeftArrow.x && settings.mouse.x <= rectLeftArrow.x + rectLeftArrow.width &&
                settings.mouse.y >= rectLeftArrow.y && settings.mouse.y <= rectLeftArrow.y + rectLeftArrow.height) {
                

                
                //change the selected character to the previous character
                if (charIndex - 1 <= 0) {
                    settings.selectedChar = PLAYERCHARACTERS.choices[totalChars - 1];
                }
                else {
                    settings.selectedChar = PLAYERCHARACTERS.choices[charIndex - 1];
                }
                

            }

            //if the mouse is in the right arrow rect
            if (settings.mouse.x >= rectRightArrow.x && settings.mouse.x <= rectRightArrow.x + rectRightArrow.width &&
                settings.mouse.y >= rectRightArrow.y && settings.mouse.y <= rectRightArrow.y + rectRightArrow.height) {

                

                
                //change the selected character to the next character
                if (charIndex + 1 >= totalChars) {
                    settings.selectedChar = PLAYERCHARACTERS.choices[0];
                }
                else {
                    settings.selectedChar = PLAYERCHARACTERS.choices[charIndex + 1];
                }
                


            }

            //if the mouse is in the back button rect
            if (settings.mouse.x >= rectBackButton.x && settings.mouse.x <= rectBackButton.x + rectBackButton.width &&
                settings.mouse.y >= rectBackButton.y && settings.mouse.y <= rectBackButton.y + rectBackButton.height) {

                //change the menu to the main menu
                menu.reset();
            }
        };

        //if the selectedChar is not undefined
        if (this.selectedChar != undefined) {

            //if the image is not already in the document
            if(document.getElementById(this.selectedChar.image) == null){
                var img = new Image();
                img.src = this.selectedChar.image;
                img.id = this.selectedChar.image;

                document.body.appendChild(img);
         
                //hide the image from the user
                img.style.display = "none";
            }
            else{
                img = document.getElementById(this.selectedChar.image);

                player.imageFile = this.selectedChar.image;
    
                //draw the image to the canvas
                ctx.drawImage(img, rectCharDisplay.x, rectCharDisplay.y, rectCharDisplay.width, rectCharDisplay.height);
            }

            //draw the  character name
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillText(this.selectedChar.label, rectCharName.x + rectCharName.width / 2, rectCharName.y + rectCharName.height / 2);
        }
    },
}

var menu = {

    mouse: 
    {
        x : 0, 
        y : 0,
        pressed: false
    },

    //mouse move handler
    mouseMoveHandler: function (e) {

        if( gameState == gameStates.mainMenu){
            //get the mouse position

            var rect = canvas.getBoundingClientRect();

            //console.log(rect);
            menu.mouse.x = e.clientX - rect.left;
            menu.mouse.y = e.clientY - rect.top;

            //round the mouse position to the nearest integer
            menu.mouse.x = Math.round(menu.mouse.x);
            menu.mouse.y = Math.round(menu.mouse.y);
        }
    },

    //mouse up handler
    mouseUpHandler: function (e) {

        if( gameState == gameStates.mainMenu){
            //get the mouse position
            var rect = canvas.getBoundingClientRect();
            menu.mouse.x = e.clientX - rect.left;
            menu.mouse.y = e.clientY - rect.top;

            //round the mouse position to the nearest integer
            menu.mouse.x = Math.round(menu.mouse.x);
            menu.mouse.y = Math.round(menu.mouse.y);

            //if the mouse is over the start button
            if (menu.mouse.x > canvas.width / 2 - 50 && menu.mouse.x < canvas.width / 2 + 50 && menu.mouse.y > canvas.height / 2 + 30 && menu.mouse.y < canvas.height / 2 + 70) {
                menu.swapToPlay();
            }

            //if the mouse is over the settings button
            if (menu.mouse.x > canvas.width / 2 - 50 && menu.mouse.x < canvas.width / 2 + 50 && menu.mouse.y > canvas.height / 2 + 80 && menu.mouse.y < canvas.height / 2 + 120) {
                menu.swapToSettings();
            }

        }


    },

    //function to swap the game state to play
    swapToPlay: function () {

        //log that the game is starting
        console.log("Game Starting");

        document.mousemove = null;
        document.mouseup = null;

        //set the mouse pressed boolean to false
        this.mouse.pressed = false;

        //set the game state to play
        gameState = gameStates.game;

        //reset the player
        player.reset();

        //reset the moving slopes
        movingSlopes.reset();

        //play the mp3 file located in the sounds folder
        //document.getElementById("mp3").play();

        //create mp3 element if it doesn't exist
        if (document.getElementById("mp3") == null) {
            var mp3 = document.createElement("audio");
            mp3.src = "sounds/cuckasspussy.wav";
            mp3.id = "wav";
            mp3.loop = false;
            mp3.autoplay = true;
            document.body.appendChild(mp3);
        }
        {
            //play the mp3 file
            document.getElementById("mp3").play();
        }
        

    },

    swapToSettings: function () {
        //log that the game is starting
        console.log("About to Change Settings");

        document.mousemove = null;
        document.mouseup = null;

        //set the mouse pressed boolean to false
        this.mouse.pressed = false;

        //set the game state to play
        gameState = gameStates.settings;

        settings.reset();
    },

    //function to reset the menu
    reset: function () {

        this.mouse.x = 0;
        this.mouse.y = 0;

        document.mousemove = null;
        document.mouseup = null;

        //add the mouse move listener
        document.addEventListener("mousemove", this.mouseMoveHandler, false);

        //add a mouse up listener
        document.addEventListener("mouseup", this.mouseUpHandler, false);

        gameState = gameStates.mainMenu;
    },

    //draw the menu
    draw: function () {
        //fill the canvas with grey
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //draw the title
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Avoider", canvas.width / 2, canvas.height / 2 - 50);

        //draw the start button
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Start", canvas.width / 2, canvas.height / 2 + 50);

        //draw the settings button
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Settings", canvas.width / 2, canvas.height / 2 + 100);


        //draw a blue rectangle around the start button
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width / 2 - 50, canvas.height / 2 + 30, 100, 40);

        //draw a blue rectangle around the settings button
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width / 2 - 50, canvas.height / 2 + 80, 100, 40);

        //if the mouse is over the start button
        if (menu.mouse.x > canvas.width / 2 - 50 && menu.mouse.x < canvas.width / 2 + 50 && menu.mouse.y > canvas.height / 2 + 30 && menu.mouse.y < canvas.height / 2 + 70) {
            //draw a red rectangle around the start button
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(canvas.width / 2 - 50, canvas.height / 2 + 30, 100, 40);
        }

        //if the mouse is over the settings button
        if (menu.mouse.x > canvas.width / 2 - 50 && menu.mouse.x < canvas.width / 2 + 50 && menu.mouse.y > canvas.height / 2 + 80 && menu.mouse.y < canvas.height / 2 + 120) {
            //draw a red rectangle around the start button
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(canvas.width / 2 - 50, canvas.height / 2 + 80, 100, 40);
        }

        //draw the mouse position for debugging in the bottom left corner
        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.textAlign = "left";
        ctx.fillText("Mouse: " + this.mouse.x + ", " + this.mouse.y, 10, canvas.height - 10);
    },




};