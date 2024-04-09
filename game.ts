// Get references to SVG elements
const player1 = document.getElementById('player1') as SVGRectElement;
const player2 = document.getElementById('player2') as SVGRectElement;
const ball = document.getElementById('ball') as SVGCircleElement;

// Constants
const fieldWidth = 800;
const fieldHeight = 400;
const playerHeight = 100;
const ballRadius = 10;
const playerSpeed = 10;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let gameTime = 60;
let gameStarted = false;
let gameLoop: number | null = null;

// Initial positions
let player1Y = fieldHeight / 2 - playerHeight / 2;
let player2Y = fieldHeight / 2 - playerHeight / 2;
let ballX = fieldWidth / 2;
let ballY = fieldHeight / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Event listener for player movement
document.addEventListener('keydown', (event) => {
    if (gameStarted) {
        if (event.key === 'w' && player1Y > 0) {
            player1Y -= playerSpeed;
            player1.setAttribute('y', player1Y.toString());
        } else if (event.key === 's' && player1Y < fieldHeight - playerHeight) {
            player1Y += playerSpeed;
            player1.setAttribute('y', player1Y.toString());
        } else if (event.key === 'ArrowUp' && player2Y > 0) {
            player2Y -= playerSpeed;
            player2.setAttribute('y', player2Y.toString());
        } else if (event.key === 'ArrowDown' && player2Y < fieldHeight - playerHeight) {
            player2Y += playerSpeed;
            player2.setAttribute('y', player2Y.toString());
        }
    }
});

// Start game button click event
const startButton = document.getElementById('startButton')!;
startButton.addEventListener('click', () => {
    if (!gameStarted) {
        startGame();
    }
});

// Reset game button click event
const resetButton = document.getElementById('resetButton')!;
resetButton.addEventListener('click', () => {
    if (gameStarted) {
        resetGame();
    }
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

// Function to reset the game
function resetGame() {
    gameStarted = false;
    startButton.style.display = 'block';
    clearInterval(gameLoop!);
}

// Function to update the game state
function updateGame() {
    updateBall();
    updateTimer();
}

// Function to update the position of the ball
function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for collisions with top and bottom walls
    if (ballY - ballRadius <= 0 || ballY + ballRadius >= fieldHeight) {
        ballSpeedY *= -1;
    }

    // Check for collisions with players
    if (ballX - ballRadius <= 70 && ballY >= player1Y && ballY <= player1Y + playerHeight) {
        ballSpeedX *= -1;
    }
    if (ballX + ballRadius >= fieldWidth - 70 && ballY >= player2Y && ballY <= player2Y + playerHeight) {
        ballSpeedX *= -1;
    }

    // Check for goal
    if (ballX - ballRadius <= 0) {
        scorePlayer2++;
        resetBall();
        updateScoreDisplay();
    } else if (ballX + ballRadius >= fieldWidth) {
        scorePlayer1++;
        resetBall();
        updateScoreDisplay();
    }

    ball.setAttribute('cx', ballX.toString());
    ball.setAttribute('cy', ballY.toString());
}

// Function to reset the position of the ball
function resetBall() {
    ballX = fieldWidth / 2;
    ballY = fieldHeight / 2;
    ballSpeedX = Math.random() > 0.5 ? 5 : -5;
    ballSpeedY = Math.random() * 10 - 5;
}

// Function to update the score display
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score')!;
    scoreDisplay.textContent = `${scorePlayer1} - ${scorePlayer2}`;
}

// Function to update the timer display
function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer')!;
    timerDisplay.textContent = `Time: ${gameTime}`;
}

// Function to update the game timer
function updateTimer() {
    gameTime--;
    updateTimerDisplay();
    if (gameTime <= 0) {
        endGame();
    }
}

// Function to end the game
function endGame() {
    clearInterval(gameLoop!);
    gameStarted = false;
    startButton.style.display = 'block';
    startButton.textContent = 'Start Game';
    gameTime = 60;
}
