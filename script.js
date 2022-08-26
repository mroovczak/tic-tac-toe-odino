const gameBoard = (() =>{
    let gameboard = [
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ]; //create empty 3x3 array of

    return {
        gameboard,
    }
})();

const displayController = (() => {
    const board = document.querySelector('#board');
    const gameboard = gameBoard.gameboard;
    const drawFields = (gameboard) => {
        gameboard.array.forEach((field, index) => {
           let element = document.createElement("div").classList.add(index);
           board.appendChild(element);
        });
    }
    // drawFields(gameboard);

    return {
        board,
    }
})();
console.log(gameBoard.gameboard);
gameBoard.gameboard.forEach((row, indexX) => {
    row.forEach((field,indexY)=> {
        let element = document.createElement("div");
        element.setAttribute("class","field");
        element.setAttribute("data-x",indexX);
        element.setAttribute("data-y",indexY);
        displayController.board.appendChild(element);
    });
 });