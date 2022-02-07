'use strict';
var PACMAN = '<img class="packman" src="img/pac1.png" />';

var gRemovedGhosts = [];
var gPacman;
// var isSuper = false;
var gIntervalId;

var gRotateDeg = 0

function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
    // return if cannot move
    if (nextCellContent === WALL) return;
    if (gPacman.isSuper === true && nextCellContent === SUPERFOOD_IMG) return;
    // hitting a ghost?  call gameOver
    if (!gPacman.isSuper && nextCellContent === GHOST) {
        var elTxt = document.querySelector('p');
        elTxt.innerText = 'YOU LOST';
        elTxt.style.display = 'block';
        var elBtn = document.querySelector('.play-again');
        elBtn.style.display = 'block';
        var elBtn1 = document.querySelector('button');
        elBtn1.style.display = 'none';
        gameOver();
        return;
    };
    if (nextCellContent === FOOD) {
        updateScore(1);
        gFoodOnBoard++
    }
    if (nextCellContent === CHERRY) {
        updateScore(10);
    }
    if (nextCellContent === SUPERFOOD_IMG) {
        updateScore(1);
        gSuperFoodOnBoard++
        eatSuperFood()
    }

    if (gPacman.isSuper && nextCellContent === GHOST) {
        killGhost({
            i: nextLocation.i,
            j: nextLocation.j
        })
    }

    isVictory()
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, getPacmanHTML());
}

function killGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        if (currGhost.location.i ===
            location.i && currGhost.location.j === location.j) {
            break
        }
    }
    var killedGhost = gGhosts.splice(i, 1)[0];

    gRemovedGhosts.push(killedGhost);
    return gRemovedGhosts
}

function eatSuperFood() {
    gPacman.isSuper = true
    // getGhostHTML();
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = 'blue'
    }
    setTimeout(() => {
        gPacman.isSuper = false
        gGhosts.push(...gRemovedGhosts)
        gRemovedGhosts = [];
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = getRandomColor()
        }
    }, 5000);
}


function getNextLocation(ev) {
    var rotation = document.querySelector(".packman");

    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    // figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            nextLocation.i++;
            // rotation.style.transform = "rotate(90deg)"
            gRotateDeg = 90
            break;
        case 'ArrowUp':
            // rotation.style.transform = "rotate(270deg)"
            gRotateDeg = 270
            nextLocation.i--;
            break;
        case 'ArrowLeft':
            // rotation.style.transform = "rotate(180deg)"
            gRotateDeg = 180
            nextLocation.j--;
            break;
        case 'ArrowRight':
            gRotateDeg = 360
            nextLocation.j++;
            break;
    }
    return nextLocation;
}

function getPacmanHTML() {
    return `<img class="packman" style="transform: rotate(${gRotateDeg}deg);" src="img/pac1.png" />`;
}