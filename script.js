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
    let score = 0;
    const getScore = () => score;
    const setScore = (newScore) => score = newScore;
    const getName = () => name;
    const getSign = () => sign;
    return {
        getName,
        getSign,
        getScore,
        setScore,
    }
};

//gameController module
const gameModule = (() =>
{
    let round = 0; //which player is moving
    let players = [];
    players.push(Player("Antek","x"));
    players.push(Player("Mietek","o"));
    const nextRound = () => {
        round = 1-round;
        console.log (round);
    }
    const getRound = () => round;

    return {
        players,
        nextRound,
        getRound,
    }
})();

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
                    e.target.setAttribute("data-sign",gameModule.players[gameModule.getRound()].getSign());
                    gameBoard.gameboard[indexX][indexY]=gameModule.players[gameModule.getRound()].getSign();
                    console.table(gameBoard.gameboard);
                    gameModule.nextRound();
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

gameModule.players[0].setScore(3);
console.log(gameModule.players[0].getScore());