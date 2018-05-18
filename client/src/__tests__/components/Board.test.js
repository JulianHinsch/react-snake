import React from 'react';
import ReactDOM from 'react-dom';
import Board from '../../components/Board';
import { shallow } from 'enzyme';

describe('Board', ()=>{

    /**
     * Test render
     */
    it('renders without crashing', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Board />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    /**
     * Test renderCells
     */
    it('renders 27 x 27 cells', ()=>{

    })

});