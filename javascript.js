//$(".instructions").slideUp();

// animate effect for sliding a paragraph
$(".btn-instructions").click(function(){
  $(".instructions").slideToggle();
})

var buttons = ["green", "red", "blue", "yellow"];
var gamePatern = [];
var playerPatern = [];
var gameOn = false;
var level = 0;

// Click event to start game
$("h1").on("click", function(event) {
  if (!gameOn) {
    $("#level-title").text("Level " + level);
    setTimeout(function() {
      nextSequence();
      gameOn = true;
      // removing the option to be clicked
      $(".btn").addClass("grabed");
      $("h1").removeClass("grabed");
    }, 150);
  }
})

//
$(".btn").click(function() {
  if (gameOn) {
    var userChosenColor = $(this).attr('id');
    playerPatern.push(userChosenColor);
    animatePress(userChosenColor);
    soundPlay(userChosenColor);

    gameCheck(playerPatern.length - 1);
  };
});

//
function nextSequence() {
  playerPatern = [];
  level++;
  $("h1").text("Level " + level);
  var randmonChoice = Math.floor(Math.random() * 4);
  var randomChosenColour = buttons[randmonChoice];
  gamePatern.push(randomChosenColour);

  $("#" + buttons[randmonChoice]).fadeOut(100).fadeIn(100);
  soundPlay(buttons[randmonChoice]);

}

// makes a visual effect when we press on of the buttons
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed")
  }, 100);
}
// plays sound corresponding to the button
function soundPlay(songTitle) {
  var sound = new Audio("sounds/" + songTitle + ".mp3");
  sound.play();
}
// checking
function gameCheck(currentLevel) {
  if (gameOn) {
    if (gamePatern[currentLevel] === playerPatern[currentLevel]) {
      if (gamePatern.length === playerPatern.length) {
        setTimeout(function() {
          $("body").addClass("success");
        }, 90);
        setTimeout(function() {
          $("body").removeClass("success");
        }, 160);
        setTimeout(function() {
          nextSequence();
        }, 900);
      }
    } else {

      soundPlay("wrong");
      $("body").addClass("game-over");
      $("#level-title").html("Game Over!!<br>Level "+level+"<br>Touch <span class='ME'>Me</span> to Restart");
      reset();
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
    }
  }
}
// reset function
function reset() {
  gameOver = false;
  gameOn = false;
  gamePatern = [];
  level = 0;
  $("h1").addClass("grabed");
  $(".btn").removeClass("grabed");
};
