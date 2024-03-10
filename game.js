// $(".green").on("click", function () {
//   $(".green").css("background-color", "green");
// });
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePatter = [];
var userClickedPattern = [];
var Start = false;
var level = 0;

//This function resets the game and sets all the variables back to default.
function gameReset() {
  gamePatter = [];
  userClickedPattern = [];
  $("h1").text("Game Over, Press Any Key to Restart");
  Start = false;
  level = 0;
}

//This function is the backbone of the project. It plays the randomly selects the next color and lets the game roll. It also changes
//the h1 to the level count.
function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var number = Math.floor(Math.random() * 4);
  var randomColour = buttonColours[number];
  playSound(randomColour);
  gamePatter.push(randomColour);

  //   console.log(gamePatter);
  //   console.log(level);
}

//When we click a button it makes a sound and has an animation
//It also checks our answer with   checkAnswer(level);
$(".btn").on("click", function (event) {
  var userChosenColour = event.target.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  if (userClickedPattern.length == gamePatter.length) {
    checkAnswer(level);
  }
});

//This is the function that plays the sound
function playSound(name) {
  $("#" + name)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  new Audio("sounds/" + name + ".mp3").play();
}

//This is the function that plays the animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, "300");
}

//This is the function that starts the game
$(document).on("keydown", function () {
  if (!Start) {
    nextSequence();
    Start = true;
  }
});

//This function checks if the last element we pressed is the same as the last element in the game order of button presses
//Where is it useD???
function checkAnswer(currentLevel) {
  if (compareArrays(gamePatter, userClickedPattern)) {
    setTimeout(() => {
      nextSequence();
    }, 1500);
    console.log(gamePatter);
    console.log(userClickedPattern);
    userClickedPattern = [];
  } else {
    $("body").addClass("game-over");
    new Audio("sounds/wrong.mp3").play();
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, "200");
    gameReset();
  }
}

//This function compares the arrays so we can check if the buttons we pressed are in the correct order aka same as SIMON
// This function checks if we pressed the button as we should and is included in checkAnswer.
const compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};
