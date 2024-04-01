const cells= document.querySelectorAll(".cell");
const statusText= document.querySelector("#statusText");
const restartbtn= document.querySelector("#restartbtn");

const winConditions= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options=["", "", "", "", "", "", "", "", ""];
let Player1 = "X" ;
let running = false;

startGame ();

function startGame () {
    cells.forEach(cell => cell.addEventListener("click" , cellClicked))
    restartbtn.addEventListener("click" , restartGame);
    statusText.textContent = `${Player1} turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell (cell, index){
    options[index] = Player1;
    cell.textContent = Player1;
}

function changePlayer () {
    Player1 = (Player1 == "X") ? "O" : "X";
    statusText.textContent = `${Player1} turn`;    
}

function checkWinner () {
    let roundWon = false;
    for (let i=0 ; i< winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if(cellA == cellB && cellB == cellC) {
            roundWon=true;
            break;
        }
    }
    if (roundWon) {
        statusText.textContent= `Congratulations ${Player1} wins`;
        running = false;
    }
    else if (!options.includes("")) {
        statusText.textContent = `Its a Draw!!`;
        running=false;
    }
    else {changePlayer();
    }
}

function restartGame() {
    Player1 = "X";
    options=["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${Player1} turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true; 
}