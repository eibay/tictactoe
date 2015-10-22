# Tic-Tac-Toe

This is my first project which uses CSS, HTML and Javascript (Underscore and JQuery). The principle behind is building 9 squares
with different images that toggles accordingly based on player's move. Main logic data uses array of 9 elements which corresponds
to every square or tile on the board which is by default set to "1". Players move is set to either 0 or 2. The reason behind is
that, it makes a lot easier to validate the winner of the match because the logic that needs to be looked out for is either
total sum of 0, or 6 only. Any value in between is obviously not a win situation. 

Here are few challenges which requires careful consideration during the initial design of this project.
- flexibility of the grid based on devices
- number of players and number of rounds per game
- toggle the players turn
- one time clicking per tile only
- integrating click functions at UI to logic that will process it
- rendering of the UI interface
- validation of winner per match requires 8 probability positions

You can see it live here: 
http://eibay.herokuapp.com/game

