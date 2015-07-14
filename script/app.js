var game = {

  board: ['r0c0', 'r0c1', 'r0c2', 'r1c0', 'r1c1', 'r1c2', 'r2c0', 'r2c1', 'r2c2'],

  boardValues: [null, null, null, null, null, null, null, null, null],

  player1: {score: 0, name: '', avatar: ''},

  player2: {score: 0, name: '', avatar: ''},

  gameScore: 0,

  setRound: 5, 

  initBoard: function(){
    _.each(game.boardValues, function(elem){
        elem = null;
    });
  },

  setPlayer: function(){
    //player setup: name, avatar, preferences etc.

  },

  updateBoard: function(value, row, col){
    var location = row + col;
    _.each(game.board, function(elem, index){
      if (elem === location){
        game.boardValues[index] = value;
      }
    });
  },

  checkWin: function(){
    var row = game.checkRow();
    var col = game.checkCol();
    var cross = game.checkDiagonal();
    if ((row || col || cross) === true){
      return true;
    }else{
      return false;
    }
  },

  checkRow: function(arr){
    //3 conditions
    var newArray = [];
    //check top
    newArray = _.first(arr, 3);

    //check middle


    //check bottom
    return true;
    return false;
  },

  checkCol: function(row, col){
    //3 conditions
    return true;
    return false;

  },
  checkDiagonal: function(row, col){
    //2 conditions
    return true;
    return false;

  },

  
  updateScore: function(player){
    if (player === player1){
      game.player1.score += 1;
    }else{
      game.player2.score += 1;
    }

  },

  declareWinner: function(){
    if (game.player1.score === game.setRound){
      return game.player1.name;
    }else if (game.player2.score === game.setRound){
      return game.player2.name;
    }else{
      //do nothing.
    }
  },

  init: function(){
    game.initBoard();
    game.setPlayer();    
  }

} //end of game


window.onload = function() {

  //var ENTER_KEY = 13; //enter key code

  game.init();


} //end of window onload