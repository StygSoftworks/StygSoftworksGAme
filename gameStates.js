//gameStates.js
//This file contains the game states for the game like the main menu, the game, the pause menu, etc.
//It also contains the game state manager which is used to switch between the different game states.

//The game states Enum
var gameStates={
    //The main menu
    mainMenu: 0,
    //The game
    game: 1,
    //The pause menu
    pauseMenu: 2,
    //The game over menu
    gameOverMenu: 3,
    //The game won menu
    gameWonMenu: 4,
    //Settings
    settings: 5,
};

var gameState= gameStates.mainMenu;