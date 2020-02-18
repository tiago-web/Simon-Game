$(document).ready(function() {

    // Declaring variables
    var buttonColours = ["red", "green", "blue", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var gameRunning = false;
    var level = 0;

    
    // Select a random button
    function nextSequence() {

        // Increase the level
        level++;

        // Change the h1 to the currant level
        $("h1").text("Level "+ level);


        var random = Math.floor(Math.random() * 4);

        // Pick a random colour
        var randomChoosenColour = buttonColours[random];

        // Append the random button to the gamePattern array
        gamePattern.push(randomChoosenColour);

        // Flashes the random button
        $("#"+randomChoosenColour).fadeOut(100).fadeIn(100).fadeIn(100);

        // Play the sound to the random button
        playSound(randomChoosenColour);

        

        

    }
    
    
    // Store in the array the button clicked by the user
    $("div").click(function(){
        var userChoosenColour = this.id;
        userClickedPattern.push(userChoosenColour);

        playSound(userChoosenColour);
        animatePress(userChoosenColour);
    })

    // Plays the right song for each colour
    function playSound(colour) {
        var sound = new Audio("sounds/"+colour+".mp3");
        sound.play();
    }

    // Animates when the user clicks the button
    function animatePress(colour) {
        var colour = "#"+colour
        $(colour).addClass("pressed");
        setTimeout(function(){$(colour).removeClass("pressed")}, 100)
    }

    // Start the game
    $(document).keydown(function() {
        if (!gameRunning){
            
            // Change "Press a Key to Start" to the current level 0
            $("h1").text("Level "+ level);

            nextSequence();
            gameRunning = true;
        }
    })

    
});
