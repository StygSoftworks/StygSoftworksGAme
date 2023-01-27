//Enum for the slope position on the screen
var screenPositionEnum = {
    Quarter: 0,
    Half: 1,
    ThreeQuarter: 2,
    Full: 3,
    Outside:4,
};

//
var movingSlopes = {
    //array of slopes
    slopes: [],

    //function for determining the screenPositionEnum for a slope based on the rotation, height, y
    getScreenPositionEnum: function (x, y, width, height) {
        //get the slope position on the screen
        var slopePosition = y + height;

        //get the screen position enum
        var screenPosition = screenPositionEnum.Outside;

        //if the slope is in the first quarter of the screen
        if (slopePosition < canvas.height / 4) {
            screenPosition = screenPositionEnum.Quarter;
        }
        //if the slope is in the second quarter of the screen
        else if (slopePosition < canvas.height / 2) {
            screenPosition = screenPositionEnum.Half;
        }
        //if the slope is in the third quarter of the screen
        else if (slopePosition < canvas.height * 3 / 4) {
            screenPosition = screenPositionEnum.ThreeQuarter;
        }
        //if the slope is outside the screen
        else if (slopePosition < canvas.height) {
            screenPosition = screenPositionEnum.Full;
        }


        //return the screen position enum
        return screenPosition;
    },


    //velocity of the slopes with x and y components
    velocity: {
        x: -2,
        y: 0
    },

    
    //function to reset the slopes
    reset: function () {
        //empty the slopes array
        this.slopes = [];

        this.velocity= {
            x: -3,
            y: 0
        }

        this.debug = true;

        this.addRandomSlope();

        //print out the canvas width
        console.log(canvas.width);

        //print out the total width of all the slopes
        //console.log(this.slopes[this.slopes.length - 1].x + this.slopes[this.slopes.length - 1].width);

        /*
        //add slopes till the end of the screen
        while (this.slopes[this.slopes.length - 1].x + this.slopes[this.slopes.length - 1].width < canvas.width) {
            this.addRandomSlope();

            //console.log(this.slopes[this.slopes.length - 1].x + this.slopes[this.slopes.length - 1].width)
        }
        */
        
    },

    //function to add a slope
    addSlope: function (x, y, width, height, color, rotation) {
        //create a new slope
        var newSlope = {
            x: x,
            y: y,
            width: width,
            height: height,
            color: color,
            rotation: rotation,
        };

        //add the slope to the array
        this.slopes.push(newSlope);
    },

    //function to draw a slope
    drawSlope: function (slope) {

        //backup the fill style
        var backupFillStyle = ctx.fillStyle;

        //draw the slope
        ctx.fillStyle = slope.color;
        
        //draw the slope with degrees if the slope is not 0
        if(slope.rotation!=0)
        {
            ctx.save();

            //make the thickness of the slope 1
            ctx.lineWidth = 1;

            ctx.translate(slope.x, slope.y);
            ctx.rotate(slope.rotation * Math.PI / 180);
            ctx.fillRect(0, 0, slope.width, slope.height);
            ctx.restore();

            //if the debug is on
            if (this.debug) {


            }

        }
        else
        {
            ctx.fillRect(slope.x, slope.y, slope.width, slope.height);
        }

        //reset the fill style
        ctx.fillStyle = backupFillStyle;
    },

    //function to get if the slope, rotated, is colliding with a rectangle
    isColliding: function (slope, rect)
    {
        //get if the slope, rotated by the slope, is colliding with the rectangle
        return checkCollisionRectangleRotated(slope,player, slope.rotation,0);
    },

    //function to remove a slope from the array
    removeSlope: function (slope) {
        //get the index of the slope
        var index = this.slopes.indexOf(slope);

        //remove the slope from the array
        this.slopes.splice(index, 1);
    },

    //function to draw the slopes
    draw: function () {
        //loop through the slopes
        for (var i = 0; i < this.slopes.length; i++) {
            //draw the slope
            this.drawSlope(this.slopes[i]);
        }

        //put the number of slopes on the bottom right of the screen in black text
        ctx.fillStyle = "black";
        ctx.fillText("Slopes: " + this.slopes.length, canvas.width - 100, canvas.height - 10);

        if(this.debug)
        {
            //draw in green
            ctx.strokeStyle = "green";
            //draw a line across the screen from left to right every quarter of the screen
            for (var i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 4 * (i + 1));
                ctx.lineTo(canvas.width, canvas.height / 4 * (i + 1));
                ctx.stroke();
            }
        }
    },

    //function to update the slopes
    update: function () {
        //loop through the slopes
        for (var i = 0; i < this.slopes.length; i++) {
            //get the slope
            var slope = this.slopes[i];

            //move the slope
            slope.x += this.velocity.x;
            
            //remove the slope if it is off the screen
            if (slope.x < -slope.width) {

                //log the slope
                //console.log('removing slope');

                //remove the slope
                this.removeSlope(slope);
                //add a new random slope
                this.addRandomSlope();

                //increase the player score
                player.score += 1;

            }

            //get if the slope is colliding with the player
            var isColliding = this.isColliding(slope, player);

            //if the slope is colliding with the player
            if (isColliding) {
                //change the game state to mainMe   
                gameState = gameStates.mainMenu;
            }

            
        }

        while (this.slopes[this.slopes.length - 1].x + this.slopes[this.slopes.length - 1].width < canvas.width) {
            this.addRandomSlope();

            //console.log(this.slopes[this.slopes.length - 1].x + this.slopes[this.slopes.length - 1].width)
        }

        //draw the slopes
        this.draw();
    },

    //add a random slope to the array to the right of the screen, with a random slope between 45 and -45 degrees
    addRandomSlope: function () {

        //get a random rotation between -30 and -30 degrees
        var rotation = Math.floor(Math.random() * 60) - 30;

        //get a random pastel color
        var color = colors.getRandomPastelColor();

        //get a random width, between 5 and 20 percent of the screen width
        var width = Math.floor(Math.random() * (canvas.width * 0.05 - canvas.width * 0.01)) + canvas.width * 0.01;

        //get a random height between 10 and 20 percent of the screen height
        var height = canvas.height * 0.1;//Math.floor(Math.random() * (canvas.height * 0.2 - canvas.height * 0.1)) + canvas.height * 0.1;

        //set the x to the right of the screen
        var x = 0;//canvas.width + width;

        //set the y to be at botom of the screen minus the height
        var y = canvas.height;// - height;

        //if there are more than 1 slopes
        if (this.slopes.length > 0) {
            //get the last slope
            var lastSlope = this.slopes[this.slopes.length - 1];

            //set the x to be the top right point of the last slope
            x = lastSlope.x + lastSlope.width - 4;
            y = lastSlope.y + (lastSlope.width) * Math.tan(lastSlope.rotation * Math.PI / 180);
        }

        
        //determine the enum for the slope
        var slopeEnum = this.getScreenPositionEnum(x, y, width, height);

        //determine the color based on the enum
        switch (slopeEnum) {
            case screenPositionEnum.Quarter:
                //color = "rgb(255,0,0)"; // red
                break;
            case screenPositionEnum.Half:
                //color = "rgb(0,255,0)"; // green
                break;
            case screenPositionEnum.ThreeQuarter:
                //color = "rgb(0,0,255)"; // blue

                if (Math.random() > 0.5) {
                    rotation = Math.floor(Math.random() * 45);
                }
                //make sure the rotation is between 0 and 45 degrees randomly
                //rotation = Math.floor(Math.random() * 45);
                break;
            case screenPositionEnum.Full:
                //color = "rgb(255,255,0)"; // yellow
                //make sure the rotation is between -45 and 0 degrees randomly
                

                /*
                //50% chance of pointing down
                if (Math.random() > 0.5) {
                    rotation = Math.floor(Math.random() * 45);
                }
                */


                break;
            case screenPositionEnum.Outside:
                //color = "rgb(255,0,255)"; // magenta
                rotation = Math.floor(Math.random() * 45) - 45;
                break;

        }
        

        //add the slope
        this.addSlope(x, y, width, height, color, rotation);
    }

}
