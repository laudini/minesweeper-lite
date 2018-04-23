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
            gameIsReady: true
        })
    };


    render() {
        if (this.state.gameIsReady === true) {
            return (
                <div className="Main-Container">
                    <Menu setBoard={this.setBoard} setMines={this.setMines} startGame={this.startGame}/>
                    <Board size={this.state.numberOfCells} mines={this.state.mineCount}/>
                    <Bar/>
                </div>
            )
        } else {
            return (
                <div className="Main-Container">
                    <Menu setBoard={this.setBoard} setMines={this.setMines} startGame={this.startGame}/>
                    <Board size={0} mines={0}/>
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
                <div><label>MINEFIELD SIZE:
                    <select onChange={(e) => this.props.setBoard(e)}>
                        <option>49</option>
                        <option>64</option>
                        <option>81</option>
                        <option>100</option>
                    </select>
                </label>
                    <label>Mine count:
                        <input type="number" id="input" onChange={(e) => this.props.setMines(e)}/>
                    </label>
                </div>
                <div>
                    <button onClick={this.props.startGame}>PLAY</button>
                </div>
            </div>
        )
    }

}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size : this.props.size,
            mines : this.props.mines
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
        ;
        let finalBoard = emptyBoard.map((e, i) => {
            switch (i) {
                case 0:
                    return (
                        <div className="Board-Row">
                            {cells.map((el, j) => {
                                if (el !== 0 && j < currentRowSize) {
                                    return (
                                        <button className="Mine-Field Board-Button">1O</button>
                                    )
                                } else if (el === 0 && j < currentRowSize) {
                                    return (
                                        <button className="Field Board-Button">1X</button>
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
                                        <button className="Mine-Field Board-Button">2O</button>
                                    )
                                } else if (el === 0 && j >= currentRowSize && j < (currentRowSize * 2)) {
                                    return (
                                        <button className="Field Board-Button">2X</button>
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
                                        <button className="Mine-Field Board-Button">3O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 2) && j < (currentRowSize * 3)) {
                                    return (
                                        <button className="Field Board-Button">3X</button>
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
                                        <button className="Mine-Field Board-Button">4O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 3) && j < (currentRowSize * 4)) {
                                    return (
                                        <button className="Field Board-Button">4X</button>
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
                                        <button className="Mine-Field Board-Button">5O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 4) && j < (currentRowSize * 5)) {
                                    return (
                                        <button className="Field Board-Button">5X</button>
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
                                        <button className="Mine-Field Board-Button">6O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 5) && j < (currentRowSize * 6)) {
                                    return (
                                        <button className="Field Board-Button">6X</button>
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
                                        <button className="Mine-Field Board-Button">7O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 6) && j < (currentRowSize * 7)) {
                                    return (
                                        <button className="Field Board-Button">7X</button>
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
                                        <button className="Mine-Field Board-Button">8O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 7) && j < (currentRowSize * 8)) {
                                    return (
                                        <button className="Field Board-Button">8X</button>
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
                                        <button className="Mine-Field Board-Button">9O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 8) && j < (currentRowSize * 9)) {
                                    return (
                                        <button className="Field Board-Button">9X</button>
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
                                        <button className="Mine-Field Board-Button">0O</button>
                                    )
                                } else if (el === 0 && j >= (currentRowSize * 9) && j < (currentRowSize * 10)) {
                                    return (
                                        <button className="Field Board-Button">0X</button>
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