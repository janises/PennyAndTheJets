import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Landing extends Component {
    render(){
        return (
            <div className="landing-container">
                <div className='login-container'>
                    <div className="game-preview"></div>
                    <a className='login' href = 'http://localhost:8000/auth'><button className='login-button btn'>LOGIN</button></a>
                    <Link to='/instructions'> 
                        <button className='continue btn'>CONTINUE WITHOUT LOGGING IN</button>
                    </Link>

                    <div className='landing-bird1'></div>
                </div>
            </div>
            
        )
    }
}
