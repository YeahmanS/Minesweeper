document.addEventListener('DOMContentLoaded', () => {
  const SIZE = 9;
  const NUM_MINES = 10;
  const board = document.getElementById('board');

  // Helper: get box by coordinates
  function getBox(x, y) {
    return document.querySelector(`.box[data-x='${x}'][data-y='${y}']`);
  }

  // Place mines randomly
  function setMines() {
    let placed = 0;
    while (placed < NUM_MINES) {
      const x = Math.floor(Math.random() * SIZE);
      const y = Math.floor(Math.random() * SIZE);
      const box = getBox(x, y);
      if (box.dataset.state !== 'M') {
        box.dataset.state = 'M';
        placed++;
      }
    }
  }

  // Count adjacent mines
  function countMines(x, y) {
    let count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && i < SIZE && j >= 0 && j < SIZE) {
          if (getBox(i, j).dataset.state === 'M') count++;
        }
      }
    }
    return count;
  }

  // Reveal all mines on loss
  function revealAllMines() {
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        const box = getBox(x, y);
        if (box.dataset.state === 'M') {
          showTile(box, 'assests/TileMine.png');
        }
      }
    }
  }

  // Display a tile image
  function showTile(box, src) {
    box.innerHTML = '';
    const img = document.createElement('img');
    img.src = src;
    box.appendChild(img);
  }

  // Handle a click move
  function makeMove(x, y) {
    const box = getBox(x, y);
    if (box.classList.contains('revealed')) return;
    box.classList.add('revealed');

    if (box.dataset.state === 'M') {
      revealAllMines();
      showTile(box, 'assests/TileExploded.png');
    } else {
      const num = countMines(x, y);
      if (num > 0) {
        box.dataset.state = num;
        showTile(box, `assests/Tile${num}.png`);
      } else {
        showTile(box, 'assests/TileEmpty.png');
        // Flood-fill neighbors
        for (let i = x - 1; i <= x + 1; i++) {
          for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i < SIZE && j >= 0 && j < SIZE) {
              makeMove(i, j);
            }
          }
        }
      }
    }
  }

  // Build the board grid
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const box = document.createElement('div');
      box.className = 'box';
      box.dataset.x = i;
      box.dataset.y = j;
      box.dataset.state = '';
      const img = document.createElement('img');
      img.src = 'assests/TileUnknown.png';
      box.appendChild(img);
      box.addEventListener('click', () => makeMove(i, j));
      board.appendChild(box);
    }
  }

  setMines();
});
