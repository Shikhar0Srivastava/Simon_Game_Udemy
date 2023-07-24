var buttoncolors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var started = false;


$(document).on("keypress", function(){

  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

// plays sounds on click
  playSound(userChosenColour);

  animatePress(userChosenColour);


  // last index of userChosenColour = length -1 ofc
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){


  // this if ensures that last clicked button is correct
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){


    // this if sees if both lengths are same means level is over
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();}, 1000
      );
    }
  } else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}


function nextSequence(){

  userClickedPattern=[];

  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColour = buttoncolors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

// plays sounds randomly
  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);

}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){$("#" + currentColour).removeClass("pressed")}, 100);
}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
