import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    render(){
        return(
            <div className='header-container'>
                <ul>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to='game'>
                        <li>Game</li>
                    </Link>
                </ul>
            </div>
        )
    }
}