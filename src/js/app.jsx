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
            numberOfCells: 100,
        }
    }

    setBoard = (e) => {
        this.setState({
            numberOfCells: e.target.value
        })
    };
    setMines = (e) => {
        this.setState({
            mineCount: e.target.value
        })
    };

    render() {
        return (
            <div className="Main-Container">
                <Menu setBoard={this.setBoard} setMines={this.setMines}/>
                <Board size={this.state.numberOfCells} mines={this.state.mineCount}/>
                <Bar/>
            </div>
        )
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
                    <button>PLAY</button>
                </div>
            </div>
        )
    }

}

class Board extends React.Component {
    constructor(props) {
        super(props);
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
        return mineIDs;
    };

    createArray = () => {
        let mineFieldIDs = this.createMines();
        let cells = new Array(this.props.size);

        for (let j = 0; j < mineFieldIDs.length; j++) {
            let temp = mineFieldIDs[j];
            cells[temp] = mineFieldIDs[j];
        }

        for (let k = 0; k < cells.length; k++) {
            if (typeof(cells[k]) !== "number") {
                cells[k] = 0;
            }
        }

        let finalBoard = cells.map((e, i) => {
            if (e !== 0) {
                return (
                    <button className="Mine-Field">o</button>
                )
            } else {
                return (
                    <button className="Field">o</button>
                )
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