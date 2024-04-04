// Get elements
const player1 = document.getElementById('player1')!;
const player2 = document.getElementById('player2')!;
const ball = document.getElementById('ball')!;
const field = document.getElementById('field')!;
const goal1 = document.getElementById('goal1')!;
const goal2 = document.getElementById('goal2')!;
const scoreDisplay = document.getElementById('score')!;
const timerDisplay = document.getElementById('timer')!;
const startButton = document.getElementById('startButton')!;
const resetButton = document.getElementById('resetButton')!;

// Constants
const fieldWidth = field.offsetWidth;
const fieldHeight = field.offsetHeight;
const playerHeight = player1.offsetHeight;
const playerSpeed = 10;
const ballRadius = ball.offsetWidth / 2;
const goalHeight = goal1.offsetHeight;
let gameTime = 60;
let gameStarted = false;
let gameLoop: NodeJS.Timeout | null = null; // Explicitly specify the type

// Initial positions
let ballX = fieldWidth / 2;
let ballY = fieldHeight / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1Y = fieldHeight / 2 - playerHeight / 2;
let player2Y = fieldHeight / 2 - playerHeight / 2;
let scorePlayer1 = 0;
let scorePlayer2 = 0;

// Event listeners for player movement
document.addEventListener('keydown', (event) => {
    if (gameStarted) {
        if (event.key === 'ArrowUp' && player1Y > 0) {
            player1Y -= playerSpeed;
            player1.style.top = `${player1Y}px`;
        } else if (event.key === 'ArrowDown' && player1Y < fieldHeight - playerHeight) {
            player1Y += playerSpeed;
            player1.style.top = `${player1Y}px`;
        } else if (event.key === 'w' && player2Y > 0) {
            player2Y -= playerSpeed;
            player2.style.top = `${player2Y}px`;
        } else if (event.key === 's' && player2Y < fieldHeight - playerHeight) {
            player2Y += playerSpeed;
            player2.style.top = `${player2Y}px`;
        }
    }
});

// Start game button click event
startButton.addEventListener('click', () => {
    if (!gameStarted) {
        startGame();
    }
});

// Reset game button click event
resetButton.addEventListener('click', () => {
    resetGame();
});

// Function to start the game
function startGame() {
    gameStarted = true;
    startButton.style.display = 'none';
    gameTime = 60;
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    resetBall();
    updateScoreDisplay();
    updateTimerDisplay();
    gameLoop = setInterval(updateGame, 1000 / 60);
}

// Function to update the game state
function updateGame() {
    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for collisions with field boundaries
    if (ballX - ballRadius <= 0 || ballX + ballRadius >= fieldWidth) {
        ballSpeedX *= -1;
    }
    if (ballY - ballRadius <= 0 || ballY + ballRadius >= fieldHeight) {
        ballSpeedY *= -1;
    }

    // Check for collisions with players
    if (ballX - ballRadius <= player1.offsetWidth && ballY >= player1Y && ballY <= player1Y + playerHeight) {
        ballSpeedX *= -1;
    }
    if (ballX + ballRadius >= fieldWidth - player2.offsetWidth && ballY >= player2Y && ballY <= player2Y + playerHeight) {
        ballSpeedX *= -1;
    }

    // Check for goals
    if (ballX - ballRadius <= 0 && ballY >= goal1.offsetTop && ballY <= goal1.offsetTop + goalHeight) {
        scorePlayer2++;
        resetBall();
        updateScoreDisplay();
    } else if (ballX + ballRadius >= fieldWidth && ballY >= goal2.offsetTop && ballY <= goal2.offsetTop + goalHeight) {
        scorePlayer1++;
        resetBall();
        updateScoreDisplay();
    }

    // Update ball position
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    // Update timer
    gameTime--;
    updateTimerDisplay();

    // Check for game over
    if (gameTime <= 0) {
        gameOver();
    }
}

// Function to reset the ball position
function resetBall() {
    ballX = fieldWidth / 2;
    ballY = fieldHeight / 2;
    ballSpeedX = Math.random() > 0.5 ? 5 : -5;
    ballSpeedY = Math.random() * 10 - 5;
}

// Function to update the score display
function updateScoreDisplay() {
    scoreDisplay.textContent = `${scorePlayer1} - ${scorePlayer2}`;
}

// Function to update the timer display
function updateTimerDisplay() {
    timerDisplay.textContent = `Time: ${gameTime}`;
}

// Function to handle game over
function gameOver() {
    gameStarted = false;
    startButton.style.display = 'block';
    startButton.textContent = 'Start Game';
    clearInterval(gameLoop!);
}

// Function to reset the game
function resetGame() {
    if (gameStarted) {
        gameOver();
    }
    startGame();
}
