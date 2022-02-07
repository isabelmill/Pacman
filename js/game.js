'use strict';
const WALL = '#';
const FOOD = '.';
const SUPERFOOD = 'SUPERFOOD';
const EMPTY = ' ';
const SUPERFOOD_IMG = '<img src="img/pinkDot.png" />';

var gFoodOnBoard = 0;
var gSuperFoodOnBoard = 0;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
};

function init() {
    gFoodOnBoard = 0;
    gSuperFoodOnBoard = 0;
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container');
    gCherryIntervalId = setInterval(createRandomCherry, 15000)
    gGame.isOn = true;
}

function restart() {
    var elTxt = document.querySelector('p');
    elTxt.style.display = 'none';
    var elBtn = document.querySelector('.play-again');
    elBtn.style.display = 'none';
    var elBtn1 = document.querySelector('button');
    elBtn1.style.display = 'block';
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryIntervalId);
    gIntervalGhosts = null;
    gCherryIntervalId = null;
    init();
    gGame.score = 0;
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

function isVictory() {
    if (gSuperFoodOnBoard === 4 && gFoodOnBoard === 56) {
        gameOver()
        var elTxt = document.querySelector('p');
        elTxt.innerText = 'VICTORY!';
        elTxt.style.display = 'block';
        var elBtn = document.querySelector('.play-again');
        elBtn.style.display = 'block';
        var elBtn1 = document.querySelector('button');
        elBtn1.style.display = 'none';
    }
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = SUPERFOOD_IMG;
    board[8][1] = SUPERFOOD_IMG;
    board[1][8] = SUPERFOOD_IMG;
    board[8][8] = SUPERFOOD_IMG;
    return board;
}



// update model and dom
function updateScore(diff) {
    // model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

// TODO
function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryIntervalId);
    gIntervalGhosts = null;
    gCherryIntervalId = null;
}