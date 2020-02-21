$(document).ready(function() {

    // Declaring variables
    var buttonColours = ["red", "green", "blue", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var start = false;
    var level = 0;

    // Start the game
    $(document).keydown(function() {
        if (!start){
            
            // Change "Press a Key to Start" to the current level 0
            $("#level-title").text("Level "+ level);

            nextSequence();
            start = true;
        }
    })

    // Select the random sequence
    function nextSequence() {

        // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
        userClickedPattern = [];

        // Increase the level
        level++;

        // Change the h1 to the current level
        $("#level-title").text("Level "+ level);

        // Returns a number between 0 and 3
        var random = Math.floor(Math.random() * 4);

        // Pick a random colour from the buttonColours array
        var randomChoosenColour = buttonColours[random];

        // Append the random button to the gamePattern array
        gamePattern.push(randomChoosenColour);

        // Flashes the random button
        var flashButton = "#"+randomChoosenColour;
        $(flashButton).fadeOut(100).fadeIn(100).fadeIn(100);

        // Play the sound to the random button
        playSound(randomChoosenColour);

        

        return false;
    }
    
    
    // Store in the array the button clicked by the user
    $(".btn").click(function(){
        var userChoosenColour = $(this).attr("id");
        userClickedPattern.push(userChoosenColour);

        playSound(userChoosenColour);
        animatePress(userChoosenColour);
        checkAnswer(userClickedPattern.length -1);
    })

    // Plays the right song for each colour
    function playSound(colour) {
        var sound = new Audio("sounds/"+colour+".mp3");
        sound.play();
        return false;
    }

    // Animates when the user clicks the button
    function animatePress(colour) {
        var colour = "#"+colour
        $(colour).addClass("pressed");
        setTimeout(function(){$(colour).removeClass("pressed")}, 100)
        return false;
    }

    // Check the user's answer
    function checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            if (gamePattern.length === userClickedPattern.length){
                setTimeout(function(){nextSequence();}, 1000)
            }
        } else {
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            $("body").addClass("game-over");
            setTimeout(function(){$("body").removeClass("game-over")}, 200)
            $("#level-title").text("Game Over, Press Any Key to Restart")
            startOver();
        }

        return false;
    }

    function startOver() {
        start = false;
        level = 0;
        gamePattern = [];
    }
    
});
