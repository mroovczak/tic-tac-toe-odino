//gameBoard Modulke
const gameBoard = (() => {
    let gameboard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]; //create empty 3x3 array of

    return {
        gameboard,
    }
})();

//Player factory
const Player = (name, sign) => {
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
const gameModule = (() => {
    let round = 0; //which player is moving
    let players = [];
    players.push(Player("Antek", "x"));
    players.push(Player("Mietek", "o"));
    const doMove = (e) => {
        console.log("click");

        if (!isMoveLegal(e)) {
            return false
        } else {
            round = 1 - round;
            displayController.drawSign(e);
            // console.log (isGameOver());

        }
        if (winner = isWin()) {
            let playerNumber = gameBoard.gameboard[winner[0]][winner[1]]
            console.log(players[playerNumber].getName());
            players[playerNumber].setScore(players[playerNumber].getScore() + 1);
            displayController.drawLine(winner); //causes problem withy starting new round
            // console.table(winner);
            // console.table(players[playerNumber].getScore());
            displayController.updateResults();
            nextGame();
            return false
        };
        if (!isGameOver()) {
            console.log('draw');
            nextGame();
            return false
        }
        return true
    }
    const isMoveLegal = (e) => {
        return (null == gameBoard.gameboard[e.target.dataset["x"]][e.target.dataset["y"]]); //returns true if field is NULL      
    };
    const isGameOver = () => {
        return (gameBoard.gameboard.some(row => row.includes(null))); // to search 2d array for null field
    };

    const isWin = () => { //return column/row/vertical, which column etc, sign
        //rows loop instead of .forEach so i can use it in other cases
        for (let i = 0; i < gameBoard.gameboard.length; i++) {
            if (gameBoard.gameboard[i][0] == gameBoard.gameboard[i][1] && gameBoard.gameboard[i][0] == gameBoard.gameboard[i][2] && gameBoard.gameboard[i][0] != null) {
                return [i, 0, i, 2];
            }

            if (gameBoard.gameboard[0][i] == gameBoard.gameboard[1][i] && gameBoard.gameboard[0][i] == gameBoard.gameboard[2][i] && gameBoard.gameboard[0][i] != null) {
                return [0, i, 2, i];
            }
        }
        if (gameBoard.gameboard[0][0] == gameBoard.gameboard[1][1] && gameBoard.gameboard[0][0] == gameBoard.gameboard[2][2] && gameBoard.gameboard[0][0] != null) {
            return [0, 0, 2, 2];
        }
        if (gameBoard.gameboard[0][2] == gameBoard.gameboard[1][1] && gameBoard.gameboard[1][1] == gameBoard.gameboard[2][0] && gameBoard.gameboard[1][1] != null) {
            return [0, 2, 2, 0];
        }
        return false;
    };
    const nextGame = () => {
        gameBoard.gameboard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        // displayController.gameboard = gameBoard.gameboard;
        displayController.clearBoard();
        displayController.drawFields();
        displayController.addListeners();
    }
    const getRound = () => round;

    return {
        players,
        doMove,
        getRound,
        nextGame,
    }
})();

// displayController module
const displayController = (() => {
    const lineThickness = "5px";
    const board = document.querySelector('#board');
    let gameboard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]; //later filled with field elements
    const clearBoard = () => {
        const fields = document.querySelectorAll(".field");
        fields.forEach(field => {
            field.setAttribute("data-sign", "");
        })
        gameboard.forEach((row, indexX) => {
            row.forEach((field, indexY) => {
            field.setAttribute("data-sign", "");
            });
        });
        const line = document.querySelector(".line");
        line.remove();
    }
    const drawFields = () => {
        gameBoard.gameboard.forEach((row, indexX) => {
            row.forEach((field, indexY) => {
                let element = document.createElement("div");
                element.setAttribute("class", "field");
                element.setAttribute("data-x", indexX);
                element.setAttribute("data-y", indexY);
                element.setAttribute("data-sign", "");
                board.appendChild(element);
                gameboard[indexX][indexY] = element; //add elements to array instead of SelectQuerry them later
                // console.table(gameboard);
            });
        });
    }
    const drawSign = (e) => {
        e.target.setAttribute("data-sign", gameModule.players[gameModule.getRound()].getSign());
        // gameBoard.gameboard[e.target.dataset["x"]][e.target.dataset["y"]]=gameModule.players[gameModule.getRound()].getSign();
        gameBoard.gameboard[e.target.dataset["x"]][e.target.dataset["y"]] = gameModule.getRound();
        // console.table(gameBoard.gameboard);    
    };
    const drawLine = (cord) => {
        let ax = cord[0];
        let ay = cord[1];
        let bx = cord[2];
        let by = cord[3];
        let x1 = gameboard[ax][ay].getBoundingClientRect().x + gameboard[ax][ay].getBoundingClientRect().height / 2;
        let y1 = gameboard[ax][ay].getBoundingClientRect().y + gameboard[ax][ay].getBoundingClientRect().width / 2;
        let x2 = gameboard[bx][by].getBoundingClientRect().x + gameboard[bx][by].getBoundingClientRect().height / 2;
        let y2 = gameboard[bx][by].getBoundingClientRect().y + gameboard[bx][by].getBoundingClientRect().width / 2;

        // console.table(gameboard[ax][ay].getBoundingClientRect());
        // console.table(gameboard[bx][by].getBoundingClientRect());
        // gameboard[x1][y1].setAttribute("start","true");
        // gameboard[x2][y2].setAttribute("start","true");
        if (x2 < x1) {
            var tmp;
            tmp = x2;
            x2 = x1;
            x1 = tmp;
            tmp = y2;
            y2 = y1;
            y1 = tmp;
        }

        var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        var m = (y2 - y1) / (x2 - x1);

        var degree = Math.atan(m) * 180 / Math.PI;
        // let board = document.querySelector("#board");
        let lineDiv = document.createElement('div');
        lineDiv.innerHTML = "<div class='line' style='transform-origin: top left; transform: rotate(" + degree + "deg); width: " + lineLength + "px; height: " + lineThickness + "; background: black; position: absolute; top: " + y1 + "px; left: " + x1 + "px;'></div>";
        lineDiv.classList="line";
        document.body.appendChild(lineDiv);
        //document.body.innerHTML += "<div class='line' style='transform-origin: top left; transform: rotate(" + degree + "deg); width: " + lineLength + "px; height: " + lineThickness + "; background: black; position: absolute; top: " + y1 + "px; left: " + x1 + "px;'></div>";

    };
    const addListeners = () => {
        gameboard.forEach((row) => {
            row.forEach((element) => {
                element.addEventListener("click", gameModule.doMove);
            });
        });
    };
    //drawFields(gameboard);
    const updateResults = () => {
        gameModule.players.forEach((player,index) => {
            let score = document.querySelector(`[data-player="${index}"]`).querySelector('#score');
            score.innerText = player.getScore();
            console.log(score);
        })
    };
    return {
        board,
        gameboard,
        drawFields,
        addListeners,
        drawSign,
        drawLine,
        updateResults,
        clearBoard,
    }
})();

    displayController.drawFields();
    displayController.addListeners();

