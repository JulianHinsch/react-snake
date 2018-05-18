import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cell extends Component {
    
    static propTypes = {
        color: PropTypes.string.isRequired,
    }

    render() {
        return (
            <div className='cell' style={{backgroundColor: this.props.color}}>       
            </div>
        )
    }
}