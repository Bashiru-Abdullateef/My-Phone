const titles = document.querySelectorAll('.title');
const player_X = 'X';
const player_O = 'O';
let turn = player_X;
const gameState = Array(titles.length).fill(null);

// Elements
const strick = document.getElementById('strick');
const gameOver = document.getElementById('game-over');
const gameOverText = document.getElementById('game-over-text');
const playAgain = document.getElementById('play-again');

let clickSound = new Audio('Sound/click.wav');
let gameOverSound = new Audio('Sound/gameOver.wav');

// Winning combinations (for 3x3 Tic Tac Toe)
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Set up click events
titles.forEach((tile, index) => {
    tile.dataset.index = index; // store index for each tile
    tile.addEventListener('click', tileClick);
});

function setHoverText() {
    titles.forEach(tile => {
        tile.classList.remove('x-hover');
        tile.classList.remove('o-hover');
        if (tile.innerText === "") {
            tile.classList.add(turn === player_X ? 'x-hover' : 'o-hover');
        }
    });
}

function tileClick(event) {
    if (gameOver.classList.contains('visible')) return;

    const tile = event.target;
    const tileNumber = tile.dataset.index;

    if (tile.innerText !== "") return;

    tile.innerText = turn;
    gameState[tileNumber] = turn;

    clickSound.play();

    if (checkWinner(turn)) {
        endGame(false); // someone won
    } else if (gameState.every(cell => cell !== null)) {
        endGame(true); // draw
    } else {
        turn = turn === player_X ? player_O : player_X;
        setHoverText();
    }
}

function checkWinner(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === player);
    });
}

function endGame(draw) {
    gameOver.classList.add('visible');
    if (draw) {
        gameOverText.innerText = "It's a Draw!";
    } else {
        gameOverText.innerText = `${turn} Wins!`;
    }
    gameOverSound.play();
}

// Reset game
playAgain.addEventListener('click', () => {
    gameState.fill(null);
    titles.forEach(tile => tile.innerText = '');
    gameOver.classList.remove('visible');
    turn = player_X;
    setHoverText();
});