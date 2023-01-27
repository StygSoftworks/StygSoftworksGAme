var colors ={


    //function to get a random neon color
    getRandomNeonColor: function () {
        //get a random number between 0 and 255
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        //ensure that the color is neon
        r = Math.floor(r / 2) + 128;
        g = Math.floor(g / 2) + 128;
        b = Math.floor(b / 2) + 128;

        //return the color
        return "rgb(" + r + "," + g + "," + b + ")";
    },

    //function to get a random color
    getRandomColor: function () {
        //get a random number between 0 and 255
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        //return the color
        return "rgb(" + r + "," + g + "," + b + ")";
    },

    //function to get a random pastel color
    getRandomPastelColor: function () {
        //get a random number between 0 and 255
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        //ensure that the color is pastel
        r = Math.floor(r / 2) + 128;
        g = Math.floor(g / 2) + 128;
        b = Math.floor(b / 2) + 128;

        //return the color
        return "rgb(" + r + "," + g + "," + b + ")";
    }
}