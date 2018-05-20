import React from 'react';
import ReactDOM from 'react-dom';
import Board from '../../components/Board';
import Cell from '../../components/Cell';
import { shallow, render, mount } from 'enzyme';

const snakeCoordinates = [
    JSON.stringify({x: 7, y: 13}),
    JSON.stringify({x: 6, y: 13}),
    JSON.stringify({x: 5, y: 13})
];

const foodCoordinates = {
    x: 20,
    y: 13,
};

describe('Board', ()=>{

    /**
     * Test render
     */
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Board
            snakeCoordinates = {snakeCoordinates}
            foodCoordinates = {foodCoordinates}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    /**
     * Test that renderCells returns an array of length 729
     */
    it('returns an array of 729 cells', () => {
        const wrapper = shallow(
            <Board 
                snakeCoordinates = {snakeCoordinates}
                foodCoordinates = {foodCoordinates}/>
        )
        expect(wrapper.instance().renderCells().length).toBe(729);
    });

    /**
     * Test that Board renders 729 cells
     */
    it('returns an array of 729 cells', () => {
        //shallow does not render children, only calls constructor, render
        const wrapper = shallow(
            <Board
                snakeCoordinates = {snakeCoordinates}
                foodCoordinates = {foodCoordinates}/>
        )
        expect(wrapper.find('Cell').length===729);
    });

    /**
     * Test that Board renders exactly one white cell
     */
    it('returns one white cell', () => {
        const wrapper = mount(
            <Board 
                snakeCoordinates = {snakeCoordinates}
                foodCoordinates = {foodCoordinates}/>
        )
        expect(wrapper.find('[color="#fff"]').length).toBe(1);
    });

    /**
     *Test that renderCells returns an array that contains the same number  
     * of red cells as the length of the coordinates array prop
     */
    it('returns the correct number of red cells', () => {
        const wrapper = mount(
            <Board
                snakeCoordinates = {snakeCoordinates}
                foodCoordinates = {foodCoordinates}/>
        )
        expect(wrapper.find('[color="#f00"]').length).toBe(snakeCoordinates.length);
    });
});