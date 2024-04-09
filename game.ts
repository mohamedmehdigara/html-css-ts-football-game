const player1 = document.getElementById('player1')!;
const player2 = document.getElementById('player2')!;
const ball = document.getElementById('ball')!;

// Constants
const fieldWidth = 800;
const fieldHeight = 400;
const playerHeight = 100;
const ballRadius = 10;
const playerSpeed = 10;

// Initial positions
let player1Y = fieldHeight / 2 - playerHeight / 2;
let player2Y = fieldHeight / 2 - playerHeight / 2;
let ballX = fieldWidth / 2;
let ballY = fieldHeight / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Event listeners for player movement
document.addEventListener('keydown', (event) => {
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
});

// Update ball position
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
    if (ballX - ballRadius <= 0 || ballX + ballRadius >= fieldWidth) {
        resetBall();
    }

    ball.setAttribute('cx', ballX.toString());
    ball.setAttribute('cy', ballY.toString());
}

// Reset ball position
function resetBall() {
    ballX = fieldWidth / 2;
    ballY = fieldHeight / 2;
    ballSpeedX = Math.random() > 0.5 ? 5 : -5;
    ballSpeedY = Math.random() * 10 - 5;
}

// Game loop
setInterval(updateBall, 1000 / 60);
