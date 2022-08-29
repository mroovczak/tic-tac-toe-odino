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
    const doMove = (e) => {
        if (!isMoveLegal(e)) {
            return false
        } else {
            round = 1-round;
            displayController.drawSign(e);
            // console.log (isGameOver());
            
        }  
        if (winner=isWin()){
            console.log("winner is ",winner[2]);
            console.log(winner[0],winner[1]);
        };
        if (!isGameOver()) {
            console.log('draw');
            return false
        }
        return true
    }
    const isMoveLegal = (e) =>{
        return !(gameBoard.gameboard[e.target.dataset["x"]][e.target.dataset["y"]]); //returns true if field is NULL
    };
    const isGameOver = () => {     
        return (gameBoard.gameboard.some(row => row.includes(null))); // to search 2d array for null field
    };
                
    const isWin = () => {                   //return column/row/vertical, which column etc, sign
        //rows loop instead of .forEach so i can use it in other cases
        for (let i=0; i<gameBoard.gameboard.length; i++) {
            if (gameBoard.gameboard[i][0]==gameBoard.gameboard[i][1] && gameBoard.gameboard[i][0]==gameBoard.gameboard[i][2] && gameBoard.gameboard[i][0]!= null ) {
                return ["row",i,gameBoard.gameboard[i][0]];
            }
    
            if (gameBoard.gameboard[0][i]==gameBoard.gameboard[1][i] && gameBoard.gameboard[0][i]==gameBoard.gameboard[2][i] && gameBoard.gameboard[0][i]!= null ) {
                return ["column",i,gameBoard.gameboard[0][i]];   
            }
        }
        if (gameBoard.gameboard[0][0]==gameBoard.gameboard[1][1] && gameBoard.gameboard[0][0]==gameBoard.gameboard[2][2] && gameBoard.gameboard[0][0]!= null ) {
            return ["vertical",0,gameBoard.gameboard[0][0]];   
        }
        if (gameBoard.gameboard[0][2]==gameBoard.gameboard[1][1] && gameBoard.gameboard[1][1]==gameBoard.gameboard[2][0] && gameBoard.gameboard[1][1]!= null ) {
            return ["vertical",1,gameBoard.gameboard[1][1]];   
        }
        return false;
    };

    const getRound = () => round;

    return {
        players,
        doMove,
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
    const drawSign = (e) => {
        e.target.setAttribute("data-sign",gameModule.players[gameModule.getRound()].getSign());
        gameBoard.gameboard[e.target.dataset["x"]][e.target.dataset["y"]]=gameModule.players[gameModule.getRound()].getSign();
        console.table(gameBoard.gameboard);    
    };
    const addListeners = () => {
        gameboard.forEach((row)=> {
            row.forEach((element) => {
                element.addEventListener("click", gameModule.doMove);
            });
        });
    }
    //drawFields(gameboard);

    return {
        board,
        drawFields,
        addListeners,
        drawSign,
    }
})();
displayController.drawFields();
displayController.addListeners();

gameModule.players[0].setScore(3);
// console.log(gameModule.players[0].getScore());