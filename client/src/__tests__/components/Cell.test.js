import React from 'react';
import ReactDOM from 'react-dom';
import Cell from '../../components/Cell';

describe('Cell', ()=>{

    /**
     * Test render
     */
    it('renders without crashing', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Cell />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});