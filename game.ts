// Game logic goes here

// Get references to SVG elements
const player1 = document.getElementById('player1') as SVGCircleElement;
const player2 = document.getElementById('player2') as SVGCircleElement;
const player3 = document.getElementById('player3') as SVGCircleElement;
const player4 = document.getElementById('player4') as SVGCircleElement;
const ball = document.getElementById('ball') as SVGCircleElement;

// Constants
const fieldWidth = 800;
const fieldHeight = 500;
const playerRadius = 20;
const ballRadius = 10;
const playerSpeed = 5;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let gameTime = 60;
let gameStarted = false;
let gameLoop: number | null = null;

// Initial positions
let player1X = 50;
let player1Y = 250;
let player2X = 200;
let player2Y = 250;
let player3X = 400;
let player3Y = 150;
let player4X = 600;
let player4Y = 350;
let ballX = 400;
let ballY = 250;
let ballSpeedX = 2;
let ballSpeedY = 2;

// Event listener for player movement
document.addEventListener('keydown', handlePlayerMovement);

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
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for collisions with top and bottom walls
    if (ballY - ballRadius <= 0 || ballY + ballRadius >= fieldHeight) {
        ballSpeedY *= -1;
    }

    // Check for collisions with players
    if (checkPlayerCollision(player1X, player1Y)) {
        ballSpeedX *= -1;
    }
    if (checkPlayerCollision(player2X, player2Y)) {
        ballSpeedX *= -1;
    }
    if (checkPlayerCollision(player3X, player3Y)) {
        ballSpeedX *= -1;
    }
    if (checkPlayerCollision(player4X, player4Y)) {
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

    // Update ball position
    ball.setAttribute('cx', ballX.toString());
    ball.setAttribute('cy', ballY.toString());
}

// Function to check collision with players
function checkPlayerCollision(playerX: number, playerY: number): boolean {
    const distance = Math.sqrt((playerX - ballX) ** 2 + (playerY - ballY) ** 2);
    return distance < playerRadius + ballRadius;
}

// Function to reset the position of the ball
function resetBall() {
    ballX = fieldWidth / 2;
    ballY = fieldHeight / 2;
    ballSpeedX = 2;
    ballSpeedY = 2;
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

// Function to handle player movement
function handlePlayerMovement(event: KeyboardEvent) {
    if (gameStarted) {
        switch (event.key) {
            case 'ArrowUp':
                if (player1Y > 0) player1Y -= playerSpeed;
                break;
            case 'ArrowDown':
                if (player1Y < fieldHeight) player1Y += playerSpeed;
                break;
            case 'q':
                if (player2Y > 0) player2Y -= playerSpeed;
                break;
            case 'a':
                if (player2Y < fieldHeight) player2Y += playerSpeed;
                break;
            case 'z':
                if (player3Y > 0) player3Y -= playerSpeed;
                break;
            case 'x':
                if (player3Y < fieldHeight) player3Y += playerSpeed;
                break;
            case 'm':
                if (player4Y > 0) player4Y -= playerSpeed;
                break;
            case ',':
                if (player4Y < fieldHeight) player4Y += playerSpeed;
                break;
        }
        updatePlayerPosition();
    }
}

// Function to update player position
function updatePlayerPosition() {
    player1.setAttribute('cy', player1Y.toString());
    player2.setAttribute('cy', player2Y.toString());
    player3.setAttribute('cy', player3Y.toString());
    player4.setAttribute('cy', player4Y.toString());
}
