//gameBoard Modulke
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

//Player factory
const Player = (name,sign) => {
    const getName = () => name;
    const getSign = () => sign;
    return {
        getName,
        getSign,
    }
};

// displayController module
const displayController = (() => {
    const board = document.querySelector('#board');
    let gameboard=[
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ]; //later filled with field elements
    const drawFields = () => {
        gameBoard.gameboard.forEach((row, indexX) => {
            row.forEach((field,indexY)=> {
                let element = document.createElement("div");
                element.setAttribute("class","field");
                element.setAttribute("data-x",indexX);
                element.setAttribute("data-y",indexY);
                element.setAttribute("data-sign","");
                board.appendChild(element);
                gameboard[indexX][indexY]=element; //add elements to array instead of SelectQuerry them later
                
            });
         });
    }
    const addListeners = () => {
        gameboard.forEach((row,indexX)=> {
            row.forEach((element,indexY) => {
                element.addEventListener("click", (e)=>{
                    e.target.setAttribute("data-sign",player1.getSign());
                    gameBoard.gameboard[indexX][indexY]=player1.getSign();
                    console.table(gameBoard.gameboard);
                });
            });
        });
    }
    //drawFields(gameboard);

    return {
        board,
        drawFields,
        addListeners,
    }
})();
displayController.drawFields();
displayController.addListeners();
const player1 = Player("Antek","x");
const player2 = Player("Mietek","o");
console.log(player1.getName());