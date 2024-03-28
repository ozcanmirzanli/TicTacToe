let fields = [null, null, null, null, null, null, null, null, null];

let lastClickedIndex = null;

let currentPlayer = "circle";

function init() {
  render();
}

function render() {
  let content = document.getElementById("content");
  // Initialize an empty string to build up the HTML content for the game board.
  let boardHtml = "";
  // Check if there's a winning combination on the board.
  const winningCombination = checkForWin();

  for (let i = 0; i < fields.length; i++) {
    let cellValue = ""; // Placeholder for the cell's SVG content (circle or cross).

    if (fields[i] === "circle") {
      cellValue = generateCircleSVG();
    } else if (fields[i] === "cross") {
      cellValue = generateCrossSVG();
    }

    // Default class for a cell. If the cell is part of the winning combination, add a "winning-cell" class.
    let cellClass = "cell";
    if (winningCombination && winningCombination.includes(i)) {
      cellClass += " winning-cell";
    }

    boardHtml += `<div class="${cellClass}" onclick="handleCellClick(${i})">${cellValue}</div>`;
  }

  content.innerHTML = boardHtml;
}

function handleCellClick(index) {
  if (checkForWin()) {
    alert("Game over. Please reset the game to start over.");
    return;
  }

  // If the clicked cell is empty, mark it with the current player's symbol.
  if (fields[index] === null) {
    fields[index] = currentPlayer; // Mark the cell.
    lastClickedIndex = index; // Update the last clicked index.

    // After marking the cell, check if this move wins the game.
    const winningCombination = checkForWin();
    if (winningCombination) {
      alert(`${currentPlayer.toUpperCase()} wins!`);
    }

    // Switch to the other player.
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";

    render();
  } else {
    alert("This cell is already taken!");
  }
}

function generateCircleSVG() {
  return `
    <svg width="70px" height="70px" viewBox="0 0 70 70">
      <circle cx="35" cy="35" r="30" stroke="#00B0F0" stroke-width="8" fill="none" />
    </svg>
  `;
}

function generateCrossSVG() {
  return `
    <svg width="80px" height="80px" viewBox="0 0 70 70">
      <path d="M15 15 L55 55" stroke="#FFC000" stroke-width="8" fill="none"/>
      <path d="M55 15 L15 55" stroke="#FFC000" stroke-width="8" fill="none"/>
    </svg>
  `;
}

function checkForWin() {
  // Define all possible winning combinations.
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    // If the three cells in a condition are filled with the same player's symbol, return the winning condition.
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return condition;
    }
  }
  return null;
}

function resetGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  render();
}

init();
