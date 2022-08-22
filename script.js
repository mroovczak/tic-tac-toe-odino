const gameBoard = (() =>{
    let gameboard = [
        [,,],
        [,,],
        [,,]
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
gameBoard.gameboard.forEach((field, index) => {
    let element = document.createElement("div");
    element.classList.add(index);
    console.log(element);
    displayController.board.appendChild(element);
    console.log("s");
 });