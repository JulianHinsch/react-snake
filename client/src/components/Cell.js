import React from 'react';
import PropTypes from 'prop-types';

const Cell = (props) => (
    <div className='cell' style={{backgroundColor: this.props.color}}/>
)    

Cell.propTypes = {
    color: PropTypes.string.isRequired,    
}

export default Cell;