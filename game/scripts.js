const rows = 6;
const cols = 7;
let currentPlayer = 'brown';
let board = Array(rows).fill(null).map(() => Array(cols).fill(null));
let gameOver = false;

// Create the grid in the HTML
const gridElement = document.getElementById('grid');
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.addEventListener('click', handleCellClick);
    gridElement.appendChild(cell);
  }
}

document.getElementById('reset-button').addEventListener('click', resetGame);

function handleCellClick(event) {
  if (gameOver) return;

  const col = event.target.dataset.col;
  const row = getEmptyRow(col);

  if (row === -1) return;

  board[row][col] = currentPlayer;
  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  cell.classList.add(currentPlayer);

  if (checkWin(row, col)) {
    console.log('WE HAVE A WINNER!', currentPlayer)
    var winner = `Player ${currentPlayer === 'brown' ? '1' : '2'}`
    document.getElementById('game-status').textContent = `${winner} (${capitalize(currentPlayer)}) gets the cheese!`;
    document.getElementById('winner').classList.remove('hidden')
    gameOver = true;
    return;
  }

  if (isDraw()) {
    document.getElementById('game-status').textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'brown' ? 'green' : 'brown';
  document.getElementById('game-status').textContent = `Player ${currentPlayer === 'brown' ? '1' : '2'}'s turn (${capitalize(currentPlayer)})`;
}

function getEmptyRow(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (!board[row][col]) return row;
  }
  return -1;
}

function checkWin(row, col) {
  return checkDirection(row, col, 1, 0) ||  // Horizontal
         checkDirection(row, col, 0, 1) ||  // Vertical
         checkDirection(row, col, 1, 1) ||  // Diagonal /
         checkDirection(row, col, 1, -1);   // Diagonal \
}

function checkDirection(row, col, rowDir, colDir) {
  let count = 1;  // We start counting the current disc (already placed)

  // Count in the positive direction (rowDir, colDir)
  count += countConsecutive(row, col, rowDir, colDir);

  // Count in the negative direction (-rowDir, -colDir)
  count += countConsecutive(row, col, -rowDir, -colDir);

  return count >= 4;
}

function countConsecutive(row, col, rowDir, colDir) {
  let count = 0;
  let currentRow = Number(row) + Number(rowDir);
  let currentCol = Number(col) + Number(colDir);

  // Move in the given direction and count matching tokens
  while (
    currentRow >= 0 && currentRow < rows &&
    currentCol >= 0 && currentCol < cols &&
    board[currentRow][currentCol] === currentPlayer
  ) {
    count++;
    currentRow += rowDir;
    currentCol += colDir;
  }

  return count;
}

function isDraw() {
  return board.every(row => row.every(cell => cell));
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function resetGame() {
  board = Array(rows).fill(null).map(() => Array(cols).fill(null));
  currentPlayer = 'brown';
  gameOver = false;
  document.getElementById('game-status').textContent = "Player 1's turn (brown)";
  document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('brown', 'green'));
  document.getElementById('winner').classList.add('hidden')
}
