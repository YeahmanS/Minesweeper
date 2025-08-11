const board = document.getElementById('board');
const gameMatrix = Array.from({ length: 9 }, () => Array(9).fill(null));

function makeMove(x,y){

    if(gameMatrix[x][y] === "M"){
        revealAllMines();
        const currBox = document.getElementById(`${x}-${y}-d`);
        currBox.removeChild(currBox.firstChild);
        const image = document.createElement('img');
        image.setAttribute('src', 'assests/TileExploded.png');
        // image.setAttribute('width', '100%');
        // image.setAttribute('height', '100%');
        // image.setAttribute('id', `${x}-${y}`);
        currBox.appendChild(image);

    } else {
        const numberOfMines = checkMines(x,y)
        if (numberOfMines > 0 ){
            gameMatrix[x][y] = numberOfMines;
            const currBox = document.getElementById(`${x}-${y}-d`);
            currBox.removeChild(currBox.firstChild);
            const image = document.createElement('img');
            image.setAttribute('src', `assests/Tile${numberOfMines}.png`);
            // image.setAttribute('width', '100%');
            // image.setAttribute('height', '100%');
            // image.setAttribute('id', `${x}-${y}`);
            currBox.appendChild(image);

        } else {
            gameMatrix[x][y] === "B" ;
            const currBox = document.getElementById(`${x}-${y}-d`);
            currBox.removeChild(currBox.firstChild);
            const image = document.createElement('img');
            image.setAttribute('src', 'assests/TileEmpty.png');
            // image.setAttribute('width', '100%');
            // image.setAttribute('height', '100%');
            // image.setAttribute('id', `${x}-${y}`);
            currBox.appendChild(image);

            for (let i = x-1; i < x+2; i++) {
                for (let j = y-1; j < y+2; j++) {
                    if ((i>=0 && i<9) && (j>=0 && j<9)){
                        if (gameMatrix[i][j] !== "B" ){
                            const currBox = document.getElementById(`${i}-${j}-d`);
                            currBox.click();
                        }
                    }
                    
                }
                
            }
        }
    }
    
    return
}

function revealAllMines(){

    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (gameMatrix[x][y] === "M") {
                const currBox = document.getElementById(`${x}-${y}-d`);
                currBox.removeChild(currBox.firstChild);
                const image = document.createElement('img');
                image.setAttribute('src', 'assests/TileMine.png');
                image.setAttribute('width', '100%');
                image.setAttribute('height', '100%');
                image.setAttribute('id', `${x}-${y}`);
                currBox.appendChild(image);
        }
        
    }
}
}

function checkMines(x,y){

    let numMines = 0;

    for (let i = x-1; i < x+2; i++) {
        for (let j = y-1; j < y+2; j++) {
            if ((i>=0 && i<9) && (j>=0 && j<9)) {

                if (gameMatrix[i][j] === "M") {
                    numMines +=1;
                }   
            } 
        }  
    }

    return numMines
}


for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9 ; j++) {
        const box = document.createElement('div');
        const image = document.createElement('img');

        image.setAttribute('src', 'assests/TileUnknown.png');
        image.setAttribute('width', '100%');
        image.setAttribute('height', '100%');
        image.setAttribute('id', `${i}-${j}`);

        box.classList.add('box');
        box.setAttribute('id', `${i}-${j}-d`);
        box.appendChild(image);

        box.addEventListener("click", (e) =>{
            makeMove(Number(e.target.id[0]), Number(e.target.id[2]));
        })

        board.appendChild(box);
    }
    
}

function setMines() {
    for (let index = 0; index < 10; index++) {
    const x = Math.floor(Math.random()*9)
    const y = Math.floor(Math.random()*9)

    gameMatrix[x][y] = "M";

    }
}


setMines()