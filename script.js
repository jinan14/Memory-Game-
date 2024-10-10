
let userName = '';
let userScore = 0;
let level = 0;
let sequence = [];
let userSequence = [];

const sounds = {
    red: new Audio('red.mp3'),
    blue: new Audio('blue.mp3'),
    green: new Audio('green.mp3'),
    yellow: new Audio('yellow.mp3'),
    wrong: new Audio('wrong.mp3')
};

document.addEventListener('DOMContentLoaded', () => {
    startGame();
});

function startGame() {
    userName = prompt('Enter your name:');
    document.getElementById('user-info').textContent = `Player: ${userName} | Score: ${userScore}`;
    document.getElementById('start-btn').addEventListener('click', startLevel);
}

function startLevel() {
    level++;
    userSequence = [];
    document.getElementById('level-info').textContent = `Level: ${level}`;
    addNewStepToSequence();
    showSequence(randomColor);
}
let randomColor = null;
function addNewStepToSequence() {
    //generate random color
    const colors = ['red', 'blue', 'green', 'yellow'];
     randomColor = colors[Math.floor(Math.random() * colors.length)];
    //push the random color to the array 
    sequence.push(randomColor);
}

function showSequence(randomColor) {
        setTimeout(() => {
            //For each color, it sets a timeout to call lightUp(color) after a delay
            lightUp(randomColor);
        },500);//800 milliseconds 
        //the first color will light up

    // Allow user input after the sequence is shown
    //it sets another timeout to call enableUserInput()
    // allows the user to start interacting with the boxes
    setTimeout(() => {
        enableUserInput();
    }, sequence.length * 500);
}

function lightUp(color) {
    const box = document.getElementById(color);
    let originalColor = box.style.backgroundColor;

    switch (color) {
        case 'red':
            box.style.backgroundColor = '#f0739c'; // Light pink
            break;
        case 'blue':
            box.style.backgroundColor = '#7171f7'; // Light blue
            break;
        case 'green':
            box.style.backgroundColor = '#b26adb'; // Light purple
            break;
        case 'yellow':
            box.style.backgroundColor = '#f8be52'; // Light yellow
            break;
    }
    
    // Play sound for the color
    sounds[color].currentTime = 0; // Reset time to allow replay
    sounds[color].play();

    //After 400 milliseconds, it resets the box's background color back to its original state.
    setTimeout(() => {
        box.style.backgroundColor = originalColor;
    }, 400);
}

function enableUserInput() {
    // selects all elements with the class .box and iterates over each box.
    const boxes = document.querySelectorAll('.box');
    //For each box, adds an event listener 
    //and call the function
    boxes.forEach((box) => {
        box.addEventListener('click', handleUserClick);
    });
}

function disableUserInput() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.removeEventListener('click', handleUserClick);
    });
}

function handleUserClick(event) {
    // retrieves the id of the box that was clicked. 
    const clickedColor = event.target.id;
    userSequence.push(clickedColor);
    
    // Play sound for clicked color
    sounds[clickedColor].currentTime = 0; // Reset time to allow replay
    sounds[clickedColor].play();

    // Check the user's input
    if (userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]) {
         // Play wrong sound if incorrect
         sounds.wrong.currentTime = 0; // Reset time to allow replay
         sounds.wrong.play();
        //if the user Array on this index is not equal to the seq array on the same index
        //call endGame function
        //else return the user choose the correct answer 
        endGame();
        return;
    }

    // If the user has matched the entire sequence correctly, move to the next level
    if (userSequence.length === sequence.length) {
        userScore++;
        document.getElementById('user-info').textContent = `Player: ${userName} | Score: ${userScore}`;
        disableUserInput();
        setTimeout(startLevel, 800); // Move to the next level after a short delay
    }
}

function endGame() {
    alert(`Game over, ${userName}! Your final score is ${userScore}.`);
    resetGame();
}

function resetGame() {
    level = 0;
    userScore = 0;
    sequence = [];
    userSequence = [];
    document.getElementById('user-info').textContent = `Player: ${userName} | Score: ${userScore}`;
    document.getElementById('level-info').textContent = '';
}