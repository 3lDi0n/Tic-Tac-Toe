let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
const boardElement = document.getElementById("board");

// Initialize the game board
function initializeBoard() {
  boardElement.innerHTML = "";
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    boardElement.appendChild(cell);
  }

  updateBoard();
}

// Handle cell click event
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] === "" && !checkWinner()) {
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateBoard();

    if (checkWinner()) {
      alert(`Player ${currentPlayer === "X" ? "O" : "X"} wins!`);
      restartGame(); // Restart the game after a win
    } else if (board.every((cell) => cell !== "")) {
      alert("It's a draw!");
      restartGame(); // Restart the game after a draw
    }
  }
}

// Update the game board display
function updateBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

// Check for a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }

  return false;
}

// Restart the game
function restartGame() {
  initializeBoard();
}

// Initialize the board on page load
window.onload = initializeBoard;
