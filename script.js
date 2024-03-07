// Define an array of words
let words = [
    // Animals
    "tiger", "lion", "elephant", "giraffe", "zebra", "rhino", "hippo", "kangaroo", "koala", "panda",
    "sloth", "monkey", "gorilla", "chimpanzee", "lemur", "meerkat", "cheetah", "jaguar", "leopard", "hyena",
    // Objects
    "table", "chair", "lamp", "mirror", "clock", "vase", "bookshelf", "television", "radio",
    "camera", "laptop", "phone", "headphones", "sunglasses", "umbrella", "backpack", "suitcase", "wallet",
    // Places
    "beach", "forest", "desert", "mountain", "river", "lake", "island", "volcano", "canyon", "valley",
    "glacier", "cave", "waterfall", "jungle", "oasis", "tundra", "savannah", "prairie", "marsh", "wetland",
    // Food
    "apple", "banana", "orange", "strawberry", "blueberry", "watermelon", "pineapple", "grape", "cherry", "kiwi",
    "peach", "pear", "plum", "avocado", "mango", "coconut", "lemon", "lime", "fig", "pizza", "bacon", "waffles",
    // Activities
    "running", "swimming", "hiking", "cycling", "yoga", "dancing", "painting", "singing", "reading", "writing",
    "cooking", "gardening", "fishing", "camping", "skiing", "surfing", "climbing", "photography", "meditation", "knitting"
];


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
    document.getElementById("word").innerText = word;
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
    let userInput = document.getElementById("userInput").value.toLowerCase();
    
    if (userInput === randomWord) {
        document.getElementById("result").innerText = "Correct!";
        // Increment score
        score++;
        // Update score display
        updateScore();
        // Store score in localStorage
        localStorage.setItem('scoreData', JSON.stringify({score: score, timestamp: Date.now()}));
        // Get a new random word
        randomWord = getRandomWord();
        // Display the new shuffled word
        displayWord(shuffleWord(randomWord));
        // Clear the input field
        document.getElementById("userInput").value = "";
        // Clear the result message after 1 second
        setTimeout(() => {
            document.getElementById("result").innerText = "";
        }, 1000);
    } else {
        document.getElementById("result").innerText = "Incorrect, try again.";
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
    // Get a new random word
    randomWord = getRandomWord();
    // Display the new shuffled word
    displayWord(shuffleWord(randomWord));
    // Clear the input field
    document.getElementById("userInput").value = "";
    // Clear the result message
    document.getElementById("result").innerText = "";
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

function checkAnagram() {
    let userInput = document.getElementById("userInput").value.toLowerCase();
    
    if (userInput === randomWord) {
        document.getElementById("result").innerText = "Correct!";
        // Increment score
        score++;
        // Update score display
        updateScore();
        // Store score in localStorage
        localStorage.setItem('scoreData', JSON.stringify({score: score, timestamp: Date.now()}));
        // Play correct sound
        let audioCorrect = new Audio('ding.mp3');
        audioCorrect.play();
        // Get a new random word
        randomWord = getRandomWord();
        // Display the new shuffled word
        displayWord(shuffleWord(randomWord));
        // Clear the input field
        document.getElementById("userInput").value = "";
        // Clear the result message after 1 second
        setTimeout(() => {
            document.getElementById("result").innerText = "";
        }, 1000);
    } else {
        // Animate wrong answer
        let checkbox = document.getElementById("checkButton");
        checkbox.style.transition = "transform 0.2s ease-in-out";
        checkbox.style.transform = "translateX(-10px)";
        setTimeout(() => {
            checkbox.style.transform = "translateX(10px)";
        }, 200);
        setTimeout(() => {
            checkbox.style.transform = "translateX(-5px)";
        }, 400);
        setTimeout(() => {
            checkbox.style.transform = "translateX(5px)";
        }, 600);
        setTimeout(() => {
            checkbox.style.transform = "translateX(0)";
        }, 800);
        
        // Change background color temporarily
        document.body.style.backgroundColor = "#FC0004"; // Red color
        
        // Display result message
        document.getElementById("result").innerText = "Incorrect, try again.";
        
        // Play error sound
        let audioError = new Audio('buzzer.mp3');
        audioError.play();
        
        // Clear the result message and reset background color after 2 seconds
        setTimeout(() => {
            document.getElementById("result").innerText = "";
            document.body.style.backgroundColor = "#f0f0f0"; // Original background color
        }, 2000);
    }
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
  });
  