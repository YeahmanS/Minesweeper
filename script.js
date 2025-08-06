const board = document.getElementById("board");
const flagText = document.getElementById("flag");
const gameStateButton = document.getElementById("gameState");

let flag = 10
let timer = 0
let gameState = "running"

function makeMove(x,y){

    const box = document.getElementById(String([x,y]))

    if (box.textContent == "M"){
                revealAllMines();
            } 
    else {
            if (gameState != "over" ){
            const numberOfMines = checkMines(x,y)

            if (numberOfMines > 0 ){
                box.textContent = String(numberOfMines);
            } else {
                box.textContent = "B"
                for (let i = x-1; i < x+2; i++) {
                    for (let j = y-1; j < y+2; j++) {
                        if ((i>=0 && i<9) && (j>=0 && j<9)) {
                            const currBox = document.getElementById([i,j]);
                                if (currBox.textContent != "B") {
                                    currBox.click();
                                    }
                            }
                        }
                    }
                }
            }
        }
            

    return
}

function checkMines(x,y){

    let numMines = 0;

    for (let i = x-1; i < x+2; i++) {
        for (let j = y-1; j < y+2; j++) {
            if ((i>=0 && i<9) && (j>=0 && j<9)) {
                const currBox = document.getElementById([i,j]);

                if (currBox.textContent == "M") {
                    numMines +=1;
                }   
            } 
        }  
    }

    return numMines
}

function revealAllMines(){

    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            const currBox = document.getElementById([x,y]);
            if (currBox.textContent == "M") {
                    gameState = "over"
                    gameStateButton.innerText = "notsimley";
                    currBox.style.borderColor = "black";
                    currBox.style.borderWidth = "2px"; 
                    currBox.style.color = "red"; 
                }
        }
        
    }
}

function resetGame(){
    for (let i=0;i<9;i++){
    for (let j = 0; j < 9; j++){
        const box = document.getElementById([i,j])
        box.innerText = ""
        box.style.borderTopColor = "whitesmoke"; 
        box.style.borderLeftColor = "whitesmoke"; 
        box.style.borderRightColor = "black"; 
        box.style.borderBottomColor = "black"; 
        box.style.borderWidth = "4px";
        box.style.color = "darkgray"
    }}

    setMines()
    flag = 10 
    flagText.innerText = flag

}

for (let i=0;i<9;i++){
    for (let j = 0; j < 9; j++) {
        const box = document.createElement("div");
        box.id = [i,j]
        box.classList.add("grid-box");
        board.appendChild(box);

        box.addEventListener("click", (e) => {
            console.log(e.target.id);

            makeMove(Number(e.target.id[0]),Number(e.target.id[2]))
            
            if(gameState != "over"){
            box.style.borderColor = "black";
            box.style.borderWidth = "2px";

            box.style.color = "red";
            }
        });

        box.addEventListener("contextmenu",(e)=>{
            e.preventDefault();
            if(flag){
                box.innerText = "F";
                box.style.color = "red";
                flag -=1
                flagText.innerText = String(flag)
            }

            
        })
    }
}

function setMines() {
    for (let index = 0; index < 10; index++) {
    const x = Math.floor(Math.random()*9)
    const y = Math.floor(Math.random()*9)
    
    const mine = document.getElementById(`${x},${y}`)
    mine.innerText = "M" 
    }
}


gameStateButton.addEventListener("click",()=>{
    if(gameState == "over"){
        gameState = "running"
        gameStateButton.innerText = "simley";
        resetGame()

    }
})

setMines()