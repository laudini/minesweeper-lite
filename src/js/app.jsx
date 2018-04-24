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
            gameIsReady: false
        }
    }

    setBoard = (e) => {
        this.setState({
            numberOfCells: Number(e.target.value)
        })
    };

    setMines = (e) => {
        this.setState({
            mineCount: Number(e.target.value)
        })
    };

    startGame = () => {
        this.setState({
            gameIsReady: this.state.gameIsReady === true ? false : true
        })
    };

    handleGoodClick = (e) => {
        if (e.button === 0) {
            e.target.classList.remove("Board-Button");
            e.target.classList.add("Button-Cleared");
            e.target.setAttribute("disabled", "disabled");
            let clickedID = Number(e.target.dataset.id);
            let lineSize = Math.sqrt(this.state.numberOfCells);
            let neighbourIDs = [clickedID -1, clickedID +1, clickedID + lineSize, clickedID + lineSize +1, clickedID + lineSize -1, clickedID - lineSize, clickedID - lineSize -1, clickedID - lineSize +1]

            let possibleIDs = document.querySelectorAll('[data-id]');
            let chosenIDs = Array.from(possibleIDs);
            let numberOfNearMines = 0;
            for (let o = 0; o < chosenIDs.length; o++) {
                if (chosenIDs[o].classList.contains("Mine-Field") === true) {
                if (chosenIDs[o].dataset.id == neighbourIDs[0] ||
                    chosenIDs[o].dataset.id == neighbourIDs[1] ||
                    chosenIDs[o].dataset.id == neighbourIDs[2] ||
                    chosenIDs[o].dataset.id == neighbourIDs[3] ||
                    chosenIDs[o].dataset.id == neighbourIDs[4] ||
                    chosenIDs[o].dataset.id == neighbourIDs[5] ||
                    chosenIDs[o].dataset.id == neighbourIDs[6] ||
                    chosenIDs[o].dataset.id == neighbourIDs[7]
                )
                {
                numberOfNearMines ++;
                }
            }
            }
            console.log(numberOfNearMines);
        } else if (e.button === 2) {
            e.preventDefault();
            e.target.classList.toggle("Button-Flagged");
        }
    };

    handleWrongClick = (e) => {
        if (e.button === 0) {
            e.target.classList.remove("Board-Button");
            e.target.classList.add("Button-Failed");
            e.target.setAttribute("disabled", "disabled");
        } else if (e.button === 2) {
            e.preventDefault();
            e.target.classList.toggle("Button-Flagged");
        }
    };

    render() {
        if (this.state.gameIsReady === true) {
            return (
                <div className="Main-Container">
                    <Menu setBoard={this.setBoard} setMines={this.setMines} startGame={this.startGame}/>
                    <Board handleGoodClick={this.handleGoodClick} handleWrongClick={this.handleWrongClick}
                           size={this.state.numberOfCells} mines={this.state.mineCount}/>
                    <Bar/>
                </div>
            )
        } else {
            return (
                <div className="Main-Container">
                    <Menu setBoard={this.setBoard} setMines={this.setMines} startGame={this.startGame}/>
                    <div>^ CHOOSE YOUR SETTINGS ^</div>
                    <Bar/>
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
                        <input type="number" defaultValue="10" id="input" onChange={(e) => this.props.setMines(e)}/>
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
            let temp = Math.floor(Math.random() * this.props.size);
            if (mineIDs.indexOf(temp) === -1) {
                mineIDs.push(temp);
            } else {
                i--;
            }
        }
        console.log(mineIDs.length);
        return mineIDs;
    };

    createArray = () => {
        let mineFieldIDs = this.createMines();
        console.log(mineFieldIDs.length);
        let cells = new Array(this.props.size);
        console.log(cells.length);


        for (let j = 0; j < mineFieldIDs.length; j++) {
            let temp = mineFieldIDs[j];
            cells[temp] = mineFieldIDs[j];
        }

        for (let k = 0; k < cells.length; k++) {
            if (typeof(cells[k]) !== "number") {
                cells[k] = 0;
            }
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
                                if (el !== 0 && j < currentRowSize) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)} onClick={(e) => this.props.handleWrongClick(e)}
                                                className="Mine-Field Board-Button">1O</button>
                                    )
                                } else if (el === 0 && j < currentRowSize) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)} onClick={(e) => this.props.handleGoodClick(e)}
                                                className="Field Board-Button">1X</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 1:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el !== 0 && j >= currentRowSize && j < (currentRowSize * 2)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)} onClick={(e) => this.props.handleWrongClick(e)} className="Mine-Field Board-Button">2O</button>
                                    )
                                } else if (el === 0 && j >= currentRowSize && j < (currentRowSize * 2)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)} onClick={(e) => this.props.handleGoodClick(e)} className="Field Board-Button">2X</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 2:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el !== 0 && j >= (currentRowSize * 2) && j < (currentRowSize * 3)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)} onClick={(e) => this.props.handleWrongClick(e)} className="Mine-Field Board-Button">3O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 2) && j < (currentRowSize * 3)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)} onClick={(e) => this.props.handleGoodClick(e)} className="Field Board-Button">3X</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 3:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el !== 0 && j >= (currentRowSize * 3) && j < (currentRowSize * 4)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)} onClick={(e) => this.props.handleWrongClick(e)} className="Mine-Field Board-Button">4O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 3) && j < (currentRowSize * 4)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)} onClick={(e) => this.props.handleGoodClick(e)} className="Field Board-Button">4X</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 4:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el !== 0 && j >= (currentRowSize * 4) && j < (currentRowSize * 5)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)} onClick={(e) => this.props.handleWrongClick(e)} className="Mine-Field Board-Button">5O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 4) && j < (currentRowSize * 5)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)} onClick={(e) => this.props.handleGoodClick(e)} className="Field Board-Button">5X</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 5:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el !== 0 && j >= (currentRowSize * 5) && j < (currentRowSize * 6)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)} onClick={(e) => this.props.handleWrongClick(e)} className="Mine-Field Board-Button">6O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 5) && j < (currentRowSize * 6)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)} onClick={(e) => this.props.handleGoodClick(e)} className="Field Board-Button">6X</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 6:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el !== 0 && j >= (currentRowSize * 6) && j < (currentRowSize * 7)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)} onClick={(e) => this.props.handleWrongClick(e)} className="Mine-Field Board-Button">7O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 6) && j < (currentRowSize * 7)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)} onClick={(e) => this.props.handleGoodClick(e)} className="Field Board-Button">7X</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 7:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el !== 0 && j >= (currentRowSize * 7) && j < (currentRowSize * 8)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)} onClick={(e) => this.props.handleWrongClick(e)} className="Mine-Field Board-Button">8O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 7) && j < (currentRowSize * 8)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)} onClick={(e) => this.props.handleGoodClick(e)} className="Field Board-Button">8X</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 8:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el !== 0 && j >= (currentRowSize * 8) && j < (currentRowSize * 9)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)} onClick={(e) => this.props.handleWrongClick(e)} className="Mine-Field Board-Button">9O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 8) && j < (currentRowSize * 9)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)} onClick={(e) => this.props.handleGoodClick(e)} className="Field Board-Button">9X</button>
                                    )
                                }

                            })}

                        </div>
                    );
                case 9:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el !== 0 && j >= (currentRowSize * 9) && j < (currentRowSize * 10)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleWrongClick(e)} onClick={(e) => this.props.handleWrongClick(e)} className="Mine-Field Board-Button">0O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 9) && j < (currentRowSize * 10)) {
                                    return (
                                        <button data-id={j} onContextMenu={(e) => this.props.handleGoodClick(e)} onClick={(e) => this.props.handleGoodClick(e)} className="Field Board-Button">0X</button>
                                    )
                                }

                            })}

                        </div>
                    );
            }
        });
        console.log(finalBoard);

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
                Text will be displayed here
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