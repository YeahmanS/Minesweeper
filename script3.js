const board = document.getElementById('board');
const gameMatrix = Array.from({ length: 9 }, () => Array(9).fill(null));

// Safely place 10 mines without duplicates
function setMines() {
    let minesPlaced = 0;
    while (minesPlaced < 10) {
        const x = Math.floor(Math.random() * 9);
        const y = Math.floor(Math.random() * 9);
        if (gameMatrix[x][y] !== "M") {
            gameMatrix[x][y] = "M";
            minesPlaced++;
        }
    }
}

function checkMines(x, y) {
    let numMines = 0;

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if ((i >= 0 && i < 9) && (j >= 0 && j < 9)) {
                if (gameMatrix[i][j] === "M") {
                    numMines++;
                }
            }
        }
    }

    return numMines;
}

function revealAllMines() {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (gameMatrix[x][y] === "M") {
                const currBox = document.getElementById(`${x}-${y}-d`);
                currBox.innerHTML = ''; // Safer than removeChild
                const image = document.createElement('img');
                image.src = 'assests/TileMine.png';
                image.width = image.height = "100%";
                image.id = `${x}-${y}`;
                currBox.appendChild(image);
            }
        }
    }
}

function makeMove(x, y) {
    if (gameMatrix[x][y] !== null && gameMatrix[x][y] !== "M") {
        // Already revealed
        return;
    }

    const currBox = document.getElementById(`${x}-${y}-d`);
    currBox.innerHTML = ''; // Clear safely

    if (gameMatrix[x][y] === "M") {
        revealAllMines();
        const image = document.createElement('img');
        image.src = 'assests/TileExploded.png';
        image.width = image.height = "100%";
        image.id = `${x}-${y}`;
        currBox.appendChild(image);
        return;
    }

    const numberOfMines = checkMines(x, y);

    if (numberOfMines > 0) {
        const image = document.createElement('img');
        image.src = `assests/Tile${numberOfMines}.png`;
        image.width = image.height = "100%";
        image.id = `${x}-${y}`;
        currBox.appendChild(image);
        gameMatrix[x][y] = numberOfMines;
    } else {
        const image = document.createElement('img');
        image.src = 'assests/TileEmpty.png';
        image.width = image.height = "100%";
        image.id = `${x}-${y}`;
        currBox.appendChild(image);
        gameMatrix[x][y] = 0;

        // Recursively click neighbors
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i >= 0 && i < 9 && j >= 0 && j < 9 && !(i === x && j === y)) {
                    if (gameMatrix[i][j] === null) {
                        makeMove(i, j);
                    }
                }
            }
        }
    }
}

// Render board
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const box = document.createElement('div');
        const image = document.createElement('img');

        image.src = 'assests/TileUnknown.png';
        image.width = image.height = "100%";
        image.id = `${i}-${j}`;

        box.classList.add('box');
        box.id = `${i}-${j}-d`;
        box.appendChild(image);

        box.addEventListener("click", (e) => {
            // Use closest image element to get proper ID
            const target = e.target.tagName === "IMG" ? e.target : e.target.querySelector("img");
            if (!target) return;

            const [xStr, yStr] = target.id.split("-");
            const x = parseInt(xStr, 10);
            const y = parseInt(yStr, 10);

            makeMove(x, y);
        });

        board.appendChild(box);
        
    }
}

setMines();
