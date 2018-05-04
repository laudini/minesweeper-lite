import React from 'react';
import ReactDOM from 'react-dom'
import styles from '../../css/style.css'


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container/>
        )
    }

}

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mineCount: 10,
            numberOfCells: 49,
            gameIsReady: false,
            text: "Welcome in Minesweeper. Created by Laudini",
            flagged: 0,
            cleared: 0
        }
    }

    setBoard = (e) => {
        this.setState({
            gameIsReady: false,
            numberOfCells: Number(e.currentTarget.value)
        })
    };

    setMines = (e) => {
        if (e.currentTarget.value <= this.state.numberOfCells) {
            this.setState({
                gameIsReady: false,
                mineCount: Number(e.currentTarget.value)
            })
        }
    };

    startGame = () => {
        if (this.state.mineCount <= this.state.numberOfCells)
            this.setState({
                gameIsReady: this.state.gameIsReady === true ? false : true
            });
        this.changeText();
    };

    handleGoodClick = (e) => {
        if (e.button === 0) {
            e.currentTarget.classList.remove("Board-Button");
            e.currentTarget.classList.add("Button-Cleared");
            e.currentTarget.setAttribute("disabled", "disabled");

            let clickedID = Number(e.currentTarget.dataset.id);
            let lineSize = Math.sqrt(this.state.numberOfCells);
            let neighbourIDs = [clickedID - 1, clickedID + 1, clickedID + lineSize, clickedID + lineSize + 1, clickedID + lineSize - 1, clickedID - lineSize, clickedID - lineSize - 1, clickedID - lineSize + 1]

            let possibleIDs = document.querySelectorAll('[data-id]');
            let chosenIDs = Array.from(possibleIDs);
            let numberOfNearMines = 0;
            for (let o = 0; o < chosenIDs.length; o++) {
                if (chosenIDs[o].classList.contains("Mine-Field") === true) {

                    if (Number(chosenIDs[o].dataset.id) % lineSize === 0) {
                        if (chosenIDs[o].dataset.id == neighbourIDs[0] ||
                            chosenIDs[o].dataset.id == neighbourIDs[2] ||
                            chosenIDs[o].dataset.id == neighbourIDs[4] ||
                            chosenIDs[o].dataset.id == neighbourIDs[5] ||
                            chosenIDs[o].dataset.id == neighbourIDs[6]
                        ) {
                            numberOfNearMines++;
                        }
                    } else if (Number(chosenIDs[o].dataset.id) % lineSize === lineSize - 1) {

                        if (chosenIDs[o].dataset.id == neighbourIDs[1] ||
                            chosenIDs[o].dataset.id == neighbourIDs[2] ||
                            chosenIDs[o].dataset.id == neighbourIDs[3] ||
                            chosenIDs[o].dataset.id == neighbourIDs[5] ||
                            chosenIDs[o].dataset.id == neighbourIDs[7]
                        ) {
                            numberOfNearMines++;
                        }
                    } else {

                        if (chosenIDs[o].dataset.id == neighbourIDs[0] ||
                            chosenIDs[o].dataset.id == neighbourIDs[1] ||
                            chosenIDs[o].dataset.id == neighbourIDs[2] ||
                            chosenIDs[o].dataset.id == neighbourIDs[3] ||
                            chosenIDs[o].dataset.id == neighbourIDs[4] ||
                            chosenIDs[o].dataset.id == neighbourIDs[5] ||
                            chosenIDs[o].dataset.id == neighbourIDs[6] ||
                            chosenIDs[o].dataset.id == neighbourIDs[7]
                        ) {
                            numberOfNearMines++;
                        }
                    }
                }
            }
            e.currentTarget.innerHTML = numberOfNearMines;

        } else if (e.button === 2) {
            e.preventDefault();
            e.currentTarget.classList.toggle("Button-Flagged");
        }
    };

    handleWrongClick = (e) => {
        if (e.button === 0) {
            e.currentTarget.classList.remove("Board-Button");
            e.currentTarget.classList.add("Button-Failed");
            e.currentTarget.setAttribute("disabled", "disabled");
            let allBtns = document.getElementsByClassName("Board-Button");
            for (let p = 0; p < allBtns.length; p++) {
                allBtns[p].setAttribute("disabled", "disabled");
            }

        } else if (e.button === 2) {
            e.preventDefault();
            e.currentTarget.classList.toggle("Button-Flagged");
            e.currentTarget.innerText = "0";
        }
    };
    gameEndText = () => {
        this.setState({
            text: "Congratz. You won!"
        })
    }
    changeText = () => {
        let texts = ['How are you doin\' today?', 'Recommended mine count less than 20!', 'Game created by Kamil Krzeminski', 'Suggestions to krzeminski.yt.kamil@gmail.com', 'Minesweeper by Microsoft was created in 1990s', 'This is not a final version!', 'Follow me on github (laudini) to see more!']
        this.setState({
            text: texts[Math.floor(Math.random() * texts.length)]
        })
    };

    render() {
        if (this.state.gameIsReady === true) {
            return (
                <div className="Main-Container">
                    <Menu maxMines={this.state.numberOfCells} setBoard={this.setBoard} setMines={this.setMines}
                          startGame={this.startGame}/>
                    <Board handleGoodClick={this.handleGoodClick}
                           handleWrongClick={this.handleWrongClick}
                           size={this.state.numberOfCells} mines={this.state.mineCount}/>
                    <Bar text={this.state.text}/>
                </div>
            )
        } else {
            return (
                <div className="Main-Container">
                    <Menu maxMines={this.state.numberOfCells} setBoard={this.setBoard} setMines={this.setMines}
                          startGame={this.startGame}/>
                    <div className="Main-Board">^ CHOOSE YOUR SETTINGS ^</div>
                    <Bar text={this.state.text}/>
                </div>
            )
        }
    }

}

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Choice-Menu">
                <div className="Div-With-Labels"><label className="Label-Size">SIZE:
                    <select onChange={(e) => this.props.setBoard(e)}>
                        <option>49</option>
                        <option>64</option>
                        <option>81</option>
                        <option>100</option>
                    </select>
                </label>
                    <label className="Label-Mines">MINES:
                        <input type="number" defaultValue="10" id="input" min={1} max={this.props.maxMines}
                               onChange={(e) => this.props.setMines(e)}/>
                    </label>
                </div>
                <div className="Play-Button-Space">
                    <button className="Play-Button" onClick={this.props.startGame}>PLAY</button>
                </div>
            </div>
        )
    }

}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: this.props.size,
            mines: this.props.mines
        }
    }

    createMines = () => {
        let mineIDs = [];
        for (let i = 0; i < this.props.mines; i++) {
            let temp = Math.round(Math.random() * (this.props.size));
            if (mineIDs.indexOf(temp) === -1) {
                mineIDs.push(temp);
            } else {
                i--;
            }
        }
        return mineIDs;
    };

    createArray = () => {
        let mineFieldIDs = this.createMines();

        let cells = [];
        for (let i = 0; i < this.props.size; i++) {
            cells[i] = i;
        }


        for (let j = 0; j < mineFieldIDs.length; j++) {
            let temp = mineFieldIDs[j];
            cells[temp] = "mine"
        }
        let currentRowSize = Math.sqrt(this.props.size);
        let emptyBoard = new Array(currentRowSize);
        for (let m = 0; m < currentRowSize; m++) {
            emptyBoard[m] = 0;
        }
        let finalBoard = emptyBoard.map((e, i) => {
            switch (i) {
                case 0:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {

                                if (el === "mine" && j < currentRowSize) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)}
                                                onClick={(e) => this.props.handleWrongClick(e)}
                                                className="Mine-Field Board-Button">0</button>
                                    )
                                }
                                else if (el !== "mine" && j < currentRowSize) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)}
                                                onClick={(e) =>
                                                    this.props.handleGoodClick(e)
                                                }
                                                className="Field Board-Button">0</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 1:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el === "mine" && j >= currentRowSize && j < (currentRowSize * 2)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)}
                                                onClick={(e) => this.props.handleWrongClick(e)}
                                                className="Mine-Field Board-Button">0</button>
                                    )
                                } else if (el !== "mine" && j >= currentRowSize && j < (currentRowSize * 2)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)}
                                                onClick={(e) => this.props.handleGoodClick(e)}
                                                className="Field Board-Button">0</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 2:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el === "mine" && j >= (currentRowSize * 2) && j < (currentRowSize * 3)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)}
                                                onClick={(e) => this.props.handleWrongClick(e)}
                                                className="Mine-Field Board-Button">0</button>
                                    )
                                } else if (el !== "mine" && j >= (currentRowSize * 2) && j < (currentRowSize * 3)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)}
                                                onClick={(e) => this.props.handleGoodClick(e)}
                                                className="Field Board-Button">0</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 3:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el === "mine" && j >= (currentRowSize * 3) && j < (currentRowSize * 4)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)}
                                                onClick={(e) => this.props.handleWrongClick(e)}
                                                className="Mine-Field Board-Button">0</button>
                                    )
                                } else if (el !== "mine" && j >= (currentRowSize * 3) && j < (currentRowSize * 4)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)}
                                                onClick={(e) => this.props.handleGoodClick(e)}
                                                className="Field Board-Button">0</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 4:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el === "mine" && j >= (currentRowSize * 4) && j < (currentRowSize * 5)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)}
                                                onClick={(e) => this.props.handleWrongClick(e)}
                                                className="Mine-Field Board-Button">0</button>
                                    )
                                } else if (el !== "mine" && j >= (currentRowSize * 4) && j < (currentRowSize * 5)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)}
                                                onClick={(e) => this.props.handleGoodClick(e)}
                                                className="Field Board-Button">0</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 5:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el === "mine" && j >= (currentRowSize * 5) && j < (currentRowSize * 6)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)}
                                                onClick={(e) => this.props.handleWrongClick(e)}
                                                className="Mine-Field Board-Button">0</button>
                                    )
                                } else if (el !== "mine" && j >= (currentRowSize * 5) && j < (currentRowSize * 6)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)}
                                                onClick={(e) => this.props.handleGoodClick(e)}
                                                className="Field Board-Button">0</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 6:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el === "mine" && j >= (currentRowSize * 6) && j < (currentRowSize * 7)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)}
                                                onClick={(e) => this.props.handleWrongClick(e)}
                                                className="Mine-Field Board-Button">0</button>
                                    )
                                } else if (el !== "mine" && j >= (currentRowSize * 6) && j < (currentRowSize * 7)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)}
                                                onClick={(e) => this.props.handleGoodClick(e)}
                                                className="Field Board-Button">0</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 7:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el === "mine" && j >= (currentRowSize * 7) && j < (currentRowSize * 8)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)}
                                                onClick={(e) => this.props.handleWrongClick(e)}
                                                className="Mine-Field Board-Button">0</button>
                                    )
                                } else if (el !== "mine" && j >= (currentRowSize * 7) && j < (currentRowSize * 8)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)}
                                                onClick={(e) => this.props.handleGoodClick(e)}
                                                className="Field Board-Button">0</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 8:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el === "mine" && j >= (currentRowSize * 8) && j < (currentRowSize * 9)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)}
                                                onClick={(e) => this.props.handleWrongClick(e)}
                                                className="Mine-Field Board-Button">0</button>
                                    )
                                } else if (el !== "mine" && j >= (currentRowSize * 8) && j < (currentRowSize * 9)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)}
                                                onClick={(e) => this.props.handleGoodClick(e)}
                                                className="Field Board-Button">0</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 9:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el === "mine" && j >= (currentRowSize * 9) && j < (currentRowSize * 10)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)}
                                                onClick={(e) => this.props.handleWrongClick(e)}
                                                className="Mine-Field Board-Button">0</button>
                                    )
                                } else if (el !== "mine" && j >= (currentRowSize * 9) && j < (currentRowSize * 10)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)}
                                                onClick={(e) => this.props.handleGoodClick(e)}
                                                className="Field Board-Button">0</button>
                                    )
                                }

                            })}

                        </div>
                    );
            }
        });

        return (
            finalBoard
        )
    };

    render() {
        let finalBoard = this.createArray();
        return (
            <div className="Main-Board">
                {finalBoard}
            </div>
        )
    }

}

class Bar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Text-Bar">
                {this.props.text}
            </div>
        )
    }

}

document.addEventListener('DOMContentLoaded', function () {

    ReactDOM.render(
        <App/>,
        document.querySelector('#app')
    );

});