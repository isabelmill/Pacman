'use strict';

const CHERRY = '🍒';
var gCherryIntervalId;

// function createRandomCherry() {
//     var cherryPos = {
//         i: getRandomInt(1, 8),
//         j: getRandomInt(1, 10)
//     };
//     if (isEmptyCell(cherryPos)) {
//         gBoard[cherryPos.i][cherryPos.j] = CHERRY;
//         renderCell(cherryPos, CHERRY);
//     }
// }

// function isEmptyCell(coord) {
//     var cell = gBoard[coord.i][coord.j]
//     return cell === EMPTY
// }

function createRandomCherry() {
    var emptys = getEmptyCells()
    if (emptys.length === 0) return
    var randomIdx = getRandomInt(0, emptys.length - 1)
    var cherryPos = emptys[randomIdx]
    gBoard[cherryPos.i][cherryPos.j] = CHERRY;
    renderCell(cherryPos, CHERRY);

}

function getEmptyCells() {
    var emptys = []
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard.length - 1; j++) {
            var cell = gBoard[i][j]
            if (cell === EMPTY) emptys.push({
                i: i,
                j: j
            })
        }
    }
    return emptys
}