import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    render(){
        return(
            <div className='header-container'>
                <ul className='nav'>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to='game'>
                        <li>Game</li>
                    </Link>
                    <li><a href = 'http://localhost:8000/auth/logout'>Logout</a></li>
                </ul>
            </div>
        )
    }
}