//your JS code here. If required.
const messege = document.querySelector(".message");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const playerInput = document.querySelector(".player-input");
const startbtn = document.querySelector("#submit");
const gameboard = document.querySelector(".game-board");
const gameboardState = Array(9).fill(null);
const cells = document.querySelectorAll(".cell");
let currentPlayer = "";
let currentSymbol = "";
let gameActive = false; // it will track game is active or not.

gameboard.style.visibility = "hidden";

// game board will appear after click
startbtn.addEventListener("click", () => {
    if(player1.value.trim() == "" || player2.value.trim() == ""){
        alert("Enter Player details");
        return;
    }

    playerInput.style.visibility = "hidden";
    gameboard.style.visibility = "";

    currentPlayer = player1;
    currentSymbol = "X";

    gameActive = true;

    messege.textContent = `${currentPlayer.value} you're up!`
});

// who will winner and winning patterns
function checkwinner () {
    const winningPatterns = [
        [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]
    ];

    for(patterns of winningPatterns){
        const [a,b,c] = patterns;

        if(gameboardState[a] && gameboardState[a] === gameboardState[b] && gameboardState[a] === gameboardState[c]){
            return true;
        }
    }
    return false
}

cells.forEach(cell => {
    cell.addEventListener("click" ,(event) => {
        console.log(cell.id);
        const cellIndex = parseInt(cell.id)-1;

        if(gameboardState[cellIndex] || !gameActive){
            return;
        }

        gameboardState[cellIndex] = currentSymbol;
        cell.textContent = currentSymbol;

        if(checkwinner()){
            messege.textContent =`${currentPlayer.value}, Congratulations you won!!!`
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        currentSymbol = currentSymbol ==="X" ?"O" :"X";
        messege.textContent = `${currentPlayer.value} you're up!`;
    });
})
