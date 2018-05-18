import React, { Component } from 'react';
import Board from './components/Board';

//Lose conditions: getNextCell returns a value >26, <0, or a coordinate in snakeCoordinates

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameInProgress: false,
            direction: 'right',
            snakeCoordinates: [
                JSON.stringify({x: 7, y: 13}),
                JSON.stringify({x: 6, y: 13}),
                JSON.stringify({x: 5, y: 13})
            ],
            foodCoordinates: {
                x: 20,
                y: 13,
            },
            message: "PRESS ENTER TO BEGIN",
            intervalID: undefined,
        }
    }
    
    componentWillMount(){
        document.addEventListener("keydown", this.handleKeydown);
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown");
    }

    handleKeydown = (event) => {
        switch(event.keyCode) {
            case 13:
                //Enter
                !this.state.gameInProgress && this.startNewGame();
                break;
            case 37:
                //Left
                if (this.state.direction !== 'right') {
                    this.setState({direction: 'left'});
                }
                break;
            case 38:
                //Up
                if (this.state.direction !== 'down') {
                    this.setState({direction: 'up'});
                }
                break;
            case 39:
                //Right
                if (this.state.direction !== 'left') {
                    this.setState({direction: 'right'});
                }
                break;
            case 40: 
                //Down
                if (this.state.direction !== 'up') {
                    this.setState({direction: 'down'});
                }
                break;
            default:
                break;
        }
    }

    /**
     * Return an object with the coordinates to enqueue to this.state.snakeCoordinates
     */
    getNextCell = () => {
        let headPos = JSON.parse(this.state.snakeCoordinates[0]);
        switch(this.state.direction) {
            case "right":
                return ({x: (headPos.x+1), y: headPos.y});
            case "left":
                return ({x: (headPos.x-1), y: headPos.y});
            case "up":
                return ({x: headPos.x, y: (headPos.y-1)});
            case "down":
                return ({x: headPos.x, y: (headPos.y+1)});
            default:
                return ({x: (headPos.x+1), y: headPos.y});
        }
    }

    /**
     * Enqueue the set of coordinates from getNextCell to the beginning of the array 
     * Dequeue the last set of coordinates in the array, unless getNextCell is food
     * If getNextCell is off the board, you lose!
     * If getNextCell is a snake cell, you lose!
     */
    advanceSnake = () => {
        let currentCoordinates = this.state.snakeCoordinates;
        let nextCoordinates = this.getNextCell();
        let isInvalid = (num) => (num < -1 || num > 26);
        //check for lose
        if (isInvalid(nextCoordinates.x) || isInvalid(nextCoordinates.y)) {
            this.endGame();
            return;
        } else if (this.state.snakeCoordinates.includes(JSON.stringify(nextCoordinates))) {
            this.endGame();
            return;
        }
        //change the cell positions
        currentCoordinates.unshift(JSON.stringify(this.getNextCell()));
        if(JSON.stringify(this.state.foodCoordinates)===JSON.stringify(nextCoordinates)) {
            //nom
            this.moveFood();
        } else {
            currentCoordinates.pop();
        }
        this.setState({snakeCoordinates: currentCoordinates});
    }

    moveFood = () => {
        this.setState({
            foodCoordinates: {
                x: Math.floor(Math.random()*27),
                y: Math.floor(Math.random()*27),
            },
        })
    }

    startNewGame = () => {
        let intervalID = setInterval(this.advanceSnake,100);
        this.setState({
            gameInProgress: true,
            direction: 'right',
            snakeCoordinates: [
                JSON.stringify({x: 7, y: 13}),
                JSON.stringify({x: 6, y: 13}),
                JSON.stringify({x: 5, y: 13})
            ],
            foodCoordinates: {
                x: 20,
                y: 13,
            },
            message: "",
            intervalID: intervalID,
        });
    }

    endGame = () => {
        clearInterval(this.state.intervalID);
        this.setState({
            gameInProgress: false,
            message: `GAME OVER! SCORE: ${this.state.snakeCoordinates.length}. PRESS ENTER FOR NEW GAME`
        });
    }

    render() {
        return (
            <div>
                <Board
                    snakeCoordinates = {this.state.snakeCoordinates}
                    foodCoordinates = {this.state.foodCoordinates}/>
                <div className="message">
                    {this.state.message}
                </div>
            </div>
        );
    }
}

