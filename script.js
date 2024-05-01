const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const status = document.querySelector('.status');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => 'Game ended in a draw!';
const currentPlayerTurn = () => `Current player: ${currentPlayer}`;

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = parseInt(cell.getAttribute('data-cell'));

  if (gameState[cellIndex] !== '' || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin()) {
    gameActive = false;
    status.textContent = winningMessage();
    return;
  }

  if (checkDraw()) {
    gameActive = false;
    status.textContent = drawMessage();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = currentPlayerTurn();
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winConditions.some(condition => {
    return condition.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function checkDraw() {
  return gameState.every(cell => {
    return cell !== '';
  });
}

function handleRestart() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.textContent = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
}

board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', handleRestart);
status.textContent = currentPlayerTurn();
