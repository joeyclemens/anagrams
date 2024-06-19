// Define word sets for each day
let wordSets = {
    "2024-06-19": ["serene", "fluffy", "glider", "marvel", "bamboo", "galaxy", "window", "jaguar", "velvet", "octave", "bubble", "guitar", "meadow", "sphere", "radiant", "forest", "summit", "impact", "dragon", "marvel"],
    "2024-04-23": ["river", "tulip", "castle", "pebble", "shadow", "sunset", "banana", "forest", "rocket", "mellow", "lemon", "candle", "peacock", "garden", "ripple", "dancer", "planet", "cradle", "whale", "shovel"],
    "2024-04-24": ["whisper", "unicorn", "butterfly", "journey", "silence", "mystery", "harmony", "diamond", "twinkle", "crimson", "comedy", "sapphire", "rainbow", "guitar", "sizzle", "laughter", "dazzle", "carousel", "giggly", "gondola"],
    "2024-04-25": ["lagoon", "flamingo", "zephyr", "blossom", "cascade", "saffron", "velvet", "whisper", "sunset", "horizon", "breeze", "cascade", "mystic", "serenade", "radiance", "journey", "laughter", "triumph", "twinkle", "sapphire"],
    "2024-04-26": ["echo", "ripple", "serene", "silence", "starry", "dazzle", "whisper", "cascade", "mellow", "sapphire", "harmony", "lullaby", "blossom", "twilight", "whirlwind", "glisten", "triumph", "carousel", "glimmer", "gondola"]
    // Add more sets for each day as needed
};

// Function to get words for the current day
function getWordsForCurrentDay() {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    return wordSets[today] || []; // Return words for today or an empty array if not available
}

// Define words array using words for the current day
let words = getWordsForCurrentDay();

// Array to keep track of used words
let usedWords = [];

// Select a random word from the array
let randomWord = getRandomWord();

// Display the shuffled word
displayWord(shuffleWord(randomWord));

// Initialize or load score from localStorage
let scoreData = localStorage.getItem('scoreData');
let score = 0;
if (scoreData) {
    scoreData = JSON.parse(scoreData);
    if (Date.now() - scoreData.timestamp < 24 * 60 * 60 * 1000) {
        score = scoreData.score;
    } else {
        localStorage.removeItem('scoreData');
    }
}

// Display initial score
updateScore();

// Function to get a random word from the array
function getRandomWord() {
    // If all words have been used, reset the usedWords array
    if (usedWords.length === words.length) {
        usedWords = [];
    }
    let newRandomWord;
    do {
        newRandomWord = words[Math.floor(Math.random() * words.length)];
    } while (usedWords.includes(newRandomWord)); // Keep selecting new word until it's not a repeat
    usedWords.push(newRandomWord); // Add the new word to usedWords array
    return newRandomWord;
}

// Function to display the shuffled word
function displayWord(word) {
    let wordToDisplay = word;
    if (word !== "Game Over") {
        wordToDisplay = shuffleWord(word);
    }
    document.getElementById("word").innerText = wordToDisplay;
}


// Function to shuffle letters of the word
function shuffleWord(word) {
    return word.split('').sort(function(){return 0.5-Math.random()}).join('');
}

// Function to update score
function updateScore() {
    document.getElementById("score").innerText = `Score: ${score}`;
}

// Function to check if the input is a valid anagram
function checkAnagram() {
    let userInput = document.getElementById("userInput").value.toLowerCase().trim(); // Trim whitespace

    if (userInput === randomWord) {
        document.getElementById("result").innerText = "Correct!";
        // Play the 'ding' sound
        document.getElementById("correctSound").play();
        // Increment score
        score++;
        // Update score display
        updateScore();
        // Change background color to green
        document.body.style.backgroundColor = "#4CAF50"; // Green color
        // Store score in localStorage
        localStorage.setItem('scoreData', JSON.stringify({score: score, timestamp: Date.now()}));

        // Check if all words have been used
        if (usedWords.length === words.length) {
            displayWord("Game Over");
            handleGameOver(); // Call handleGameOver when all words are exhausted
        } else {
            // Get a new random word
            randomWord = getRandomWord();
            // Display the new shuffled word
            displayWord(shuffleWord(randomWord));
        }

        // Clear the input field
        document.getElementById("userInput").value = "";
        // Clear the result message after 1 second
        setTimeout(() => {
            document.getElementById("result").innerText = "";
            // Reset background color
            document.body.style.backgroundColor = "#f0f0f0"; // Default background color
        }, 1000);
    } else {
        document.getElementById("result").innerText = "Incorrect, try again.";
        // Play the 'buzzer' sound
        document.getElementById("incorrectSound").play();
        // Change background color to red
        document.body.style.backgroundColor = "#FF5733"; // Red color
        // Clear the background color after 1 second
        setTimeout(() => {
            // Reset background color
            document.body.style.backgroundColor = "#f0f0f0"; // Default background color
        }, 1000);
    }
}





// Function to submit score and team name to the form
document.getElementById("scoreForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Get score and team name
    let scoreValue = score;
    let teamNameValue = document.getElementById("teamName").value;
    
    // Set score and team name in hidden input fields
    document.getElementById("scoreInput").value = scoreValue;
    document.getElementById("teamNameInput").value = teamNameValue;
    
    // Submit the form
    this.submit();
});

// Function to skip the current word
function skipWord() {
    // Decrement the score by 1
    score--;
    // Update the score display
    updateScore();
    // Get a new random word
    randomWord = getRandomWord();
    // Display the new shuffled word
    displayWord(shuffleWord(randomWord));
    // Clear the input field
    document.getElementById("userInput").value = "";
    // Clear the result message
    document.getElementById("result").innerText = "";
    
    // Check if all words have been used
    if (usedWords.length === words.length) {
        displayWord("Game Over");
        handleGameOver(); // Call handleGameOver when all words are exhausted
    }
}

function confirmReset() {
    var confirmation = confirm("Are you sure you want to reset the score?");
    if (confirmation) {
        resetScore();
    } else {
        // Do nothing or provide feedback to the user if needed
    }
}

// Function to reset the score to 0
function resetScore() {
    // Reset the score to 0
    score = 0;
    // Update the score display
    updateScore();
    // Clear the localStorage
    localStorage.removeItem('scoreData');
}

document.addEventListener("DOMContentLoaded", function() {
    // JavaScript code for handling the modal
    // Get the help modal
    var modal = document.getElementById("helpModal");
  
    // Get the help button that opens the modal
    var helpBtn = document.getElementById("helpButton");
  
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
  
    // When the user clicks the button, open the modal 
    helpBtn.onclick = function() {
      modal.style.display = "block";
    }
  
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    // Check if game over flag is set and date is today
    let gameOverData = localStorage.getItem('gameOverData');
    if (gameOverData) {
        gameOverData = JSON.parse(gameOverData);
        const today = new Date();
        const storedDate = new Date(gameOverData.timestamp);
        if (today.toDateString() === storedDate.toDateString()) {
            // Game over, disable input field and skip button
            document.getElementById("userInput").disabled = true;
            document.getElementById("skipButton").disabled = true;
        }
    }
});

// Function to handle midnight reset
function handleMidnightReset() {
    const now = new Date();
    const resetTime = new Date(now);
    resetTime.setHours(23, 59, 0, 0); // Set to 11:59 PM
    const timeUntilReset = resetTime - now;

    // Schedule next reset at 11:59 PM
    setTimeout(() => {
        // Clear localStorage to reset game state
        localStorage.removeItem('gameOverData');
    }, timeUntilReset);
}

// Function to handle game over
function handleGameOver() {
    // Store game over flag and current date
    localStorage.setItem('gameOverData', JSON.stringify({ gameOver: true, timestamp: Date.now() }));
    
    // Disable input field and skip button
    document.getElementById("userInput").disabled = true;
    document.getElementById("skipButton").disabled = true;

    // Handle midnight reset
    handleMidnightReset();
}

// Function to detect if the device is mobile
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Log device type for debugging
console.log("Is mobile device: ", isMobileDevice());

// Only apply custom cursor if the device is not mobile
if (!isMobileDevice()) {
    document.addEventListener("DOMContentLoaded", function() {
        // Create a new image element for the custom cursor
        var customCursor = document.createElement("img");
        customCursor.src = "custom-cursor.png"; // Ensure you have the correct path to the cursor image
        customCursor.style.position = "fixed";
        customCursor.style.pointerEvents = "none"; // Ensure the cursor doesn't interfere with clicks
        customCursor.style.zIndex = "9999"; // Make sure the cursor appears above other elements
        customCursor.style.width = "32px"; // Adjust the width and height as needed
        customCursor.style.height = "32px";

        // Add the custom cursor to the body
        document.body.appendChild(customCursor);

        // Update the position of the custom cursor to follow the mouse movement
        document.addEventListener("mousemove", function(event) {
            customCursor.style.left = event.clientX + "px";
            customCursor.style.top = event.clientY + "px";
        });
    });
} else {
    console.log("Custom cursor is disabled on mobile devices.");
}

document.addEventListener('DOMContentLoaded', function () {
    // Find the form element
    const form = document.getElementById('scoreForm');

    // Add event listener for form submission
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Customized prompt message
        const teamName = prompt("Please enter your Team Name/Name and submit your score:");

        // Check if the team name is not empty and user clicked OK
        if (teamName && teamName.trim() !== '') {
            // Get score
            let scoreValue = score;

            // Set score and team name in hidden input fields
            document.getElementById("scoreInput").value = scoreValue;
            document.getElementById("teamNameInput").value = teamName.trim();

            // Submit the form
            this.submit();
        } else {
            // If team name is empty or user clicked Cancel, inform them and do nothing
            alert("Back to the Anagrams you go...");
        }
    });
});


