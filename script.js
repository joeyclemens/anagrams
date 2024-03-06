// Define an array of words
let words = ["apple", "banana", "orange", "strawberry", "kiwi", "grape", "pineapple", "blueberry", "watermelon", "peach"];

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
