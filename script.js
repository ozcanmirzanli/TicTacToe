let fields = [null, null, null, null, null, null, null, null, null];
let lastClickedIndex = null; // To keep track of the last clicked cell
let currentPlayer = "circle"; // Initialize currentPlayer

function init() {
  render();
}

function render() {
  let content = document.getElementById("content");
  let boardHtml = "";

  for (let i = 0; i < fields.length; i++) {
    let cellValue = "";
    if (fields[i] === "circle") {
      cellValue = generateCircleSVG();
    } else if (fields[i] === "cross") {
      cellValue = generateCrossSVG();
    }

    boardHtml += `<div class="cell" onclick="handleCellClick(${i})">${cellValue}</div>`;
  }

  content.innerHTML = boardHtml;

  // Apply animation only to the last clicked cell's SVG, if applicable
  if (lastClickedIndex !== null) {
    const lastCell = content.children[lastClickedIndex];
    const svgElement = lastCell.querySelector("svg");
    if (svgElement) {
      const animationClass =
        fields[lastClickedIndex] === "circle"
          ? "circle-animation"
          : "path-animation";
      svgElement
        .querySelector(
          fields[lastClickedIndex] === "circle" ? "circle" : "path"
        )
        .classList.add(animationClass);
    }
  }
}

function handleCellClick(index) {
  if (fields[index] === null) {
    fields[index] = currentPlayer; // Mark the cell with the current player's symbol
    lastClickedIndex = index; // Update lastClickedIndex with the current clicked cell's index
    render(); // Re-render to show the updated board

    // Switch players
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
  } else {
    currentPlayer.onclick = null;
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

// Don't forget to call init() to start the game
init();
