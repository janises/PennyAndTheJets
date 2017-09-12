import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Instructions extends Component {
    render(){
        return(
            <div className='instructions-container'>
                <h1>HOW TO PLAY</h1>
                <p>Use the arrow keys to move.</p>
                <Link to="/game">
                    <button>PLAY</button>
                </Link>
                <div className="instructions-peng"></div>
            </div>
        )
    }
}