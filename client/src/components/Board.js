import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

export default class Board extends Component {

    static propTypes = {
        foodCoordinates: PropTypes.object,
        snakeCoordinates: PropTypes.array.isRequired,
    }

    renderCells = () => {
        let cellArray = [];
        for (let y = 0; y < 27; y++) {
            for (let x = 0; x < 27; x++) {
                if (this.props.foodCoordinates && x === this.props.foodCoordinates.x && y === this.props.foodCoordinates.y) {
                    //food - white cell
                    cellArray.push(<Cell color={'#fff'} key={`${x}-${y}`}/>)
                } else if (this.props.snakeCoordinates.includes(JSON.stringify({x: x, y: y}))) {
                    //snake - red cell
                    cellArray.push(<Cell color={'#f00'} key={`${x}-${y}`}/>)
                } else {
                    //empty - gray cell
                    cellArray.push(<Cell color={'#333'} key={`${x}-${y}`}/>)
                }
            }
        }
        return cellArray;
    }

    render() {
        console.log('foodCoordinates',this.props.foodCoordinates);
        console.log('snakeCoordinates',this.props.snakeCoordinates);
        return (
            <div className='board'>
                {this.renderCells()}
            </div>
        )
    }
}