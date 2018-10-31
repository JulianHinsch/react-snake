import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

describe('App', ()=>{

    /**
     * Test render
     */
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    /**
     * Test componentWillMount adds event listener
     */

     /**
      * Test componentWillUnmount removes event listener
      */

    /**
     * Test startNewGame sets an interval
     */

    /**
     * Test startNewGame modifies state
     */

    /**
     * Test handleKeyDown (enter)
     */

    /**
     * Test handleKeyDown (left)
     */

    /**
     * Test handleKeyDown (right)
     */

    /**
     * Test handleKeyDown (up)
     */

    /**
     * Test handleKeyDown (down)
     */

    /**
     * Test getNextCell returns an object with keys x,y, with values 0-26
     */

    /**
     * Test advanceSnake advances snake
     */

    /**
     * Test moveFood moves food
     */
    
    /**
     * Test endGame modifies state
     */

    /**
     * Test endGame clears interval
     */
})
