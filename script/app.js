var game = {

  //board: ['r0c0', 'r0c1', 'r0c2', 'r1c0', 'r1c1', 'r1c2', 'r2c0', 'r2c1', 'r2c2'],

  boardValues: [[], [], []],

  boardSize: 3,

  player1: {score: 0, name: '', avatar: '', move: 0},

  player2: {score: 0, name: '', avatar: '', move: 2},

  gameScore: 0,

  setRound: 5,

  //15Jul15
  setPlayer: function(){
    //player setup: name, avatar, preferences etc.

  },//end setPlayer

  //15Jul15
  setTile: function (row, col, value){
    game.boardValues[row][col] = value;
  }, //end setTile

  //15Jul15
  initBoard: function(arr){
    _.each(arr, function(elem, index1){
        _.each(arr, function(elem, index2){
          game.setTile(index1, index2, 1);
        });
    });
  },//end initBoard


  //15Jul15
  checkLineSum: function(arr){
    var lineSum = 0;
    _.each(arr, function(elem){
       lineSum += elem;   
    });
    // console.log("Linesum: "+ lineSum);
    return lineSum;
  },

  //15Jul15
  checkLineMove: function(arr){
    var sum = game.checkLineSum(arr)
    if (sum === 0){
      return true;
    }else if (sum === 6){
      return true;
    }else{
      return false;
    }
  },

  //ROW CHECKING:

  //15Jul15
  checkRow: function (arr){
    var rowOut = false;
    _.each(arr, function(elem){
      var result = game.checkLineMove(elem);
        if (result === true){
          rowOut = true;
          return rowOut;
        }
    });
    return rowOut;
  },//end checkRow

  //COLUMN CHECKING:

  //15Jul15
  checkCol: function(arr){
    var colArr = [];
    var columnOut = false;

    // 4 determines size of array
    for (var i = 0; i <= game.boardSize; i++){
      
      //column builder
      _.each(arr, function(elem1, index){
        colArr.push(elem1[i]);
      }); //end of column builder

      columnOut = game.checkLineMove(colArr);
      if ( columnOut === true) {
        return columnOut; // declare outside _.each function
      }else{
        colArr = []; //reset to get next column
      }

    } //end of for
      return columnOut;//default to false!
  },//end of checkCol

  //16Jul15
  checkDiagLine: function(arr, rev){
    var diagOut = false;
    var diagArr = [];
    var flatArr = [];//created 9 elements: from 3x3 matrix
    var len = (game.boardSize * game.boardSize);
    var stepCount = (game.boardSize + 1);
    
    if (rev === true){
      arr = arr.reverse();
      flatArr = _.flatten(arr);
    }else{
      flatArr = _.flatten(arr);
    }

    for (var j = 0; j < len; j += stepCount){
      diagArr.push(flatArr[j]);
    } //end of for    
    diagOut = game.checkLineMove(diagArr);
    //console.log("FlatArr: " + flatArr);  
    return diagOut;
  },//end of checkDiagLine

  //16Jul15
  checkDiag: function(arr){
    var diagOutLR = false;
    var diagOutRL = false;

    diagOutLR = game.checkDiagLine(arr, false);
    diagOutRL = game.checkDiagLine(arr, true);

    return (diagOutRL || diagOutLR || false);

  }, //end of checkDiag

//------------------------------------------

  //nty
  checkWin: function(){
    var row = game.checkRow();
    var col = game.checkCol();
    var cross = game.checkDiag();
    if ((row || col || cross) === true){
      return true;
    }else{
      return false;
    }
  }, //end checkWin

  //nty
  updateScore: function(player){
    if (player === player1){
      game.player1.score += 1;
    }else{
      game.player2.score += 1;
    }

  },

  //nty
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

    game.initBoard(game.boardValues); //working
    game.setPlayer(); //nty
    console.log("Init Completed!");   
  }

} //end of game


window.onload = function() {

  //var ENTER_KEY = 13; //enter key code

  //15Jul
  game.init();


} //end of window onload


  // //nty
  // updateBoard: function(value, row, col){
  //   var location = row + col;
  //   _.each(game.board, function(elem, index){
  //     if (elem === location){
  //       game.boardValues[index] = value;
  //     }
  //   });
  // },