import React, { Component } from 'react';
import Board from './components/Board';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameInProgress: false,
            direction: 'right',
            isChangingDirection: false,
            snakeCoordinates: [
                JSON.stringify({x: 7, y: 13}),
                JSON.stringify({x: 6, y: 13}),
                JSON.stringify({x: 5, y: 13})
            ],
            foodCoordinates: {
                x: 20,
                y: 13,
            },
            intervalID: undefined,
            lose: false,
        }
    }
    
    componentWillMount(){
        document.addEventListener("keydown", this.handleKeydown);
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeydown);
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
            intervalID: intervalID,
            lose: false,
        });
    }

    handleKeydown = (event) => {
        switch(event.keyCode) {
            //Enter
            case 13:
                !this.state.gameInProgress && this.startNewGame();
                break;
            //Left
            case 37:
                if (!this.state.isChangingDirection && this.state.direction !== 'right') {
                    this.setState({direction: 'left', isChangingDirection: true});
                }
                break;
            //Up
            case 38:
                if (!this.state.isChangingDirection && this.state.direction !== 'down') {
                    this.setState({direction: 'up', isChangingDirection: true});
                }
                break;
            //Right
            case 39:
                if (!this.state.isChangingDirection && this.state.direction !== 'left') {
                    this.setState({direction: 'right', isChangingDirection: true});
                }
                break;
            //Down
            case 40: 
                if (!this.state.isChangingDirection && this.state.direction !== 'up') {
                    this.setState({direction: 'down', isChangingDirection: true});
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
        let headCoordinates = JSON.parse(this.state.snakeCoordinates[0]);
        switch(this.state.direction) {
            case "right":
                return ({x: (headCoordinates.x+1), y: headCoordinates.y});
            case "left":
                return ({x: (headCoordinates.x-1), y: headCoordinates.y});
            case "up":
                return ({x: headCoordinates.x, y: (headCoordinates.y-1)});
            case "down":
                return ({x: headCoordinates.x, y: (headCoordinates.y+1)});
            default:
                return ({x: (headCoordinates.x+1), y: headCoordinates.y});
        }
    }

    /**
     * Enqueue the set of coordinates from next cell to the beginning of the array 
     * Dequeue the last set of coordinates in the array, unless next cell is food
     * If next cell is off the board, or is a snake cell, you lose!
     */
    advanceSnake = () => {
        let currentCoordinates = this.state.snakeCoordinates;
        let nextCoordinates = this.getNextCell();
        let isWall = (position) => (position < 0 || position >= 27);
        //check for lose
        if (isWall(nextCoordinates.x) || isWall(nextCoordinates.y)) {
            //check for wall
            this.endGame();
            return;
        } else if (this.state.snakeCoordinates.includes(JSON.stringify(nextCoordinates))) {
            //check for intersection
            this.endGame();
            return;
        }
        //change the cell positions
        currentCoordinates.unshift(JSON.stringify(nextCoordinates));
        if(JSON.stringify(this.state.foodCoordinates)===JSON.stringify(nextCoordinates)) {
            //nom
            this.moveFood();
        } else {
            currentCoordinates.pop();
        }
        this.setState({snakeCoordinates: currentCoordinates, isChangingDirection: false});
    }

    /**
     * Set random food coordinates to state
     * Avoid the current position of the snake
     */
    moveFood = () => {
        let newFoodCoordinates = {
            x: Math.floor(Math.random()*27),
            y: Math.floor(Math.random()*27),
        }
        while(this.state.snakeCoordinates.includes(JSON.stringify(newFoodCoordinates))) {
            newFoodCoordinates = {
                x: Math.floor(Math.random()*27),
                y: Math.floor(Math.random()*27),
            }
        }
        this.setState({foodCoordinates: newFoodCoordinates});
    }

    endGame = () => {
        clearInterval(this.state.intervalID);
        this.setState({gameInProgress: false, lose: true});
    }

    render() {
        return (
            <div>
                <Board
                    snakeCoordinates = {this.state.snakeCoordinates}
                    foodCoordinates = {this.state.foodCoordinates}/>
                <div className="message">
                    {!this.state.gameInProgress && !this.state.lose && (
                        <p>PRESS ENTER TO BEGIN</p>
                    )}
                    {this.state.lose && (
                        <p>
                            <span>GAME OVER!</span>
                            <br/>
                            <span>SCORE: {this.state.snakeCoordinates.length}</span>
                            <br/>
                            <span>PRESS ENTER FOR NEW GAME</span>
                            <br/>
                        </p>
                    )}
                </div>
            </div>
        );
    }
}
