//make hexadecimal version? choose which one first?
let pickedColor;
let pickedSquare;
let squares = document.querySelectorAll(".square");
let numberOfSquares = 6;
let header = document.querySelector("header");
let winner = document.querySelector("#winner");
let resetButton = document.querySelector("#reset");
let gameOver = false;

//mode selectors
let easyMode = false;
let easy = document.querySelector("#easy");
let hard = document.querySelector("#hard");

//mode functionality

let modeButtons = function() {
    easy.addEventListener("click", function () {
        easy.classList.add("selectedMode");
        hard.classList.remove("selectedMode");
        easyMode = true;
        resetGrid();
    })
    
    hard.addEventListener("click", function () {
        hard.classList.add("selectedMode");
        easy.classList.remove("selectedMode");
        easyMode = false;
        resetGrid();
    })
}


//header span for color to pick out
let headerSpan = document.querySelector("#chosenColor");

let rand255 = function () {
    return Math.round(Math.random() * 1000 % 255);
}

let checkMode = function () {
    if (easyMode) {
        numberOfSquares = 3;
        for (i = 3; i < squares.length; i++) {
            squares[i].classList.add("hidden")
        }
    } else {
        numberOfSquares = 6;
    };
}

let resetGrid = function () {
    //check easy mode
    checkMode();
    gameOver = false;
    // generate random number between 0-5, stored to choose square
    let randSquare = [Math.round(Math.random() * 100 % numberOfSquares)];
    //
    for (let i = 0; i < numberOfSquares; i++) {
        //reshow after reset
        squares[i].classList.remove("hidden");
        //generate RGB string
        let randRGB = "rgb(" + rand255() + ", " + rand255() + ", " + rand255() + ")";
        //assign RGB string to square
        squares[i].style.background = randRGB;
        //pick a random square, defined from pickedSquare variable.
        if (i == randSquare) {
            pickedColor = randRGB;
            pickedSquare = squares[i];
        }
    }
    headerSpan.textContent = pickedColor;
    winner.classList.add("hidden");
    resetButton.textContent = "new colors"
}

//hide all squares on win
let hideSquares = function () {
    for (let i = 0; i < squares.length; i++) {
        squares[i].classList.add("hidden");
    }
};

//game Logic function
let gameLogic = function () {
    if (!gameOver) {
        //test if picked square = picked color. 
        if (this == pickedSquare) {
            console.log("you win!");
            //header change to color & win statement appear
            header.style.background = pickedColor;
            winner.classList.remove("hidden");
            //toggle state of game, no more clicky
            gameOver = true;
            //hide all but winning square
            hideSquares();
            pickedSquare.classList.remove("hidden");
            //display play again text on reset button
            resetButton.textContent = "play again?"
        } else {
            this.classList.add("hidden");
            console.log("nah.");
        }
    }
}

//testing true or false
// for (let i = 0; i < squares.length; i++) {
//     squares[i].addEventListener("click", gameLogic)
// };

//reset button
// resetButton.addEventListener("click", resetGrid);

let init = function() {
modeButtons();
//resetbutton
resetButton.addEventListener("click", resetGrid);
//testing true or false
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", gameLogic)
};
resetGrid();
}

//initial setup on loading page...
init();