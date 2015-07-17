var game = {

  //board: ['r0c0', 'r0c1', 'r0c2', 'r1c0', 'r1c1', 'r1c2', 'r2c0', 'r2c1', 'r2c2'],

  boardValues: [[], [], []],

  boardSize: 3,

  player1: {score: 0, name: 'SPIRIT', avatar: '', move: 0},

  player2: {score: 0, name: 'FLESH', avatar: '', move: 2},

  gameScore: 0,

  counter: 0,

  setRound: 3,

  moveCounter: 0,

  //15Jul15
  setPlayer: function(){
    $('#p1-name').html(game.player1.name);
    $('#p2-name').html(game.player2.name);

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

  //DIAGONAL CHECKING
  checkDiagLine: function(arr, rev){
    var newArr = arr;
    var diagOut = false;
    var diagArr = [];
    var flatArr = [];//created 9 elements: from 3x3 matrix
    var len = (game.boardSize * game.boardSize);
    var stepCount = (game.boardSize + 1);
    
    if (rev === true){
      newArr = newArr.reverse();
      flatArr = _.flatten(newArr);
    }else{
      newArr = newArr.reverse();
      flatArr = _.flatten(newArr);
    }
    for (var j = 0; j < len; j += stepCount){
      diagArr.push(flatArr[j]);
    } //end of for    
    diagOut = game.checkLineMove(diagArr); 
    return diagOut;
  },//end of checkDiagLine

  //16Jul15
  checkDiag: function(arr){
    var newArr = arr;
    var diagOutLR = false;
    var diagOutRL = false;

    diagOutRL = game.checkDiagLine(newArr, true);
    diagOutLR = game.checkDiagLine(newArr, false);

    return (diagOutRL || diagOutLR || false);

  }, //end of checkDiag

  //
  checkRound: function(arr){
    var row = game.checkRow(arr);
    var col = game.checkCol(arr);
    var cross = game.checkDiag(arr);
    if ((row || col || cross) === true){
      return true;
    }else{
      return false;
    }
  }, //end checkWin

  //
  updateScore: function(playerName){
    if (playerName === game.player1.name){
      game.player1.score += 1;

    }else{
      game.player2.score += 1;
    }
  },

  renderMatchWin: function(playerName){
    if (playerName === game.player1.name){
      $('#p1-score').html(game.player1.score);
      $('#p1-match').html(playerName + " WINS!");
      // $('h6').html("PRESS GAME TO START AGAIN");
      $('#p2-reset').html("<button>PLAY AGAIN</button>");
      game.counter = 1; //switches starting player2
      if (game.player1.score < game.setRound){
        $( '#p2-reset' ).show( 1000 );
      } 

    }else{
      $('#p2-score').html(game.player2.score);
      $('#p2-match').html(playerName + " WINS!");
      // $('h6').html("<button>PRESS GAME TO START AGAIN</button>");
      $('#p1-reset').html("<button>PLAY AGAIN</button>");
      game.counter = 0; //switches starting player1
      if (game.player2.score < game.setRound){  
        $( '#p1-reset' ).show( 1000 );
      }
    }

  },

  renderGameWin: function(playerName){
    $('.gameWinner').html("<button>" + playerName + " WINS! Play Again!" + "<button>");
    // $( '.gameWinner' ).click(function(){
    //   game.gameReset();
    // });
  },

  //nty
  checkWinner: function(){
    if (game.player1.score === game.setRound){
      //console.log(game.player1.name)
      game.renderGameWin(game.player1.name);
      //return game.player1.name;
    }else if (game.player2.score === game.setRound){
      //console.log(game.player2.name);
      // return game.player2.name;
      game.renderGameWin(game.player2.name);
    }else{
      //do nothing!
    }
  },

  playerMove: function (playerName, arr){
    var playerMove = game.checkRound(arr);
    if (playerMove === true){
      game.updateScore(playerName);
      game.renderMatchWin(playerName);
      game.checkWinner();
    }
  }, //end of playerMove

  gameReset: function (){
    $('div.matrix').html('');
    game.init();
    arrBoard = game.boardValues;
    $('#p1-match').html("free");
    $('#p2-match').html("slave");
    $( '.resetBtn' ).hide( 1000 );
    $( '.div.matrix' ).hide( 1000 );
    game.score = 0;
    $('.score').html("0");
    game.player1.score = 0;
    game.player2.score = 0;
    game.moveCounter = 0;
  },

  matchReset: function(){
    $('div.matrix').html('');   //clears board display
    game.init();                // clears board array
    arrBoard = game.boardValues;
    $('#p1-match').html("free");
    $('#p2-match').html("slave");
    $( '.resetBtn' ).hide( 1000 );
    game.moveCounter = 0;
  },

  init: function(){
    game.initBoard(game.boardValues); //working
    game.setPlayer();   
  }

} //end of game


window.onload = function() {

  //var ENTER_KEY = 13; //enter key code

  //15Jul
  game.init();

  //Declare global array data
  var arrBoard = game.boardValues;

   $('#board').on('click', '.matrix', function(){
    //set up player alternate access
    game.moveCounter++; //tracks the number of tile clicks
    var playerNum = 1;
    if (game.counter % 2 === 0){
      playerNum = game.player1.move; //0 player1
      playerName = game.player1.name;
    }else{
      playerNum = game.player2.move; //2 player2
      playerName = game.player2.name;
    }
    game.counter++;

    var row = $(this).attr('data-row');
    var col = $(this).attr('data-col');
    game.setTile(row, col, playerNum);

    //marking starts here..
    if (playerNum === 0){
      $(this).html('<img src="css/images/safari.png" width="100%", height="100%">');
    }else{
      $(this).html('<img src="css/images/firefox.jpg" width="100%", height="100%">');
    }
    game.playerMove(playerName, arrBoard);

    if ((game.moveCounter === 9) && ((game.player1.score < game.setRound) || (game.player2.score < game.setRound))){
      $('.gameWinner').html("It's a DRAW");
      $('.gameWinner').show(1000);
    }

  });//end of board display  

  $( ".resetBtn" ).click(function() {
    game.matchReset();
  });

  $( '.gameWinner' ).click(function(){
      game.gameReset();
      $('.gameWinner').hide(1000);
  });


} //end of window onload

































// $("#submit").one('click', function (event) {  
//            event.preventDefault();
//            //do something
//            $(this).prop('disabled', true);
//      });
  //Player1 move
    //mark the tile

  // var moveSelect = function(id){
  //     $( id ).click(function() {
  //     // $( this ).slideUp();
  //     var tileValue = ($(this).attr('value'));
  //     return tileValue;
  //   });
  // }

// $('<div>').attr({
//   'data-row': ,
//   'data-col': ,
//   class: 'matrix'
// });




  // var tileSelected = document.getElementById('r0c0');
  // var tile = tileSelected.getAttribute('value');

  // tileSelected.addEventListener('click', )


  //   game.setTile(row, col, game.player1.move);
  //   //check the move
  //   game.playerMove(game.player1, arr);


  // //Player2 move
  //   game.playerMove(game.player2, arr);




  /*Play sequence

    Player1 select the tile
      mark the tile/change image/
        selected tile to be one-time selectable
    Update board array
      :Check move

    Enable Player2 to select the tile
      :Check move 

    :Check move
      if win, update score
          if win < round
              play another set
  */


/* Other Features
  play against computer logic


 */
