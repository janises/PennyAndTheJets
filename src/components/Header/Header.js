import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUsernameAndId, logout} from './../../ducks/reducer';

class Header extends Component {
    componentDidMount() {
        this.props.getUsernameAndId();
        
    }

    render(){
   
        return(
            <div className='header-container'>
                <ul className='nav'>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to='/game'>
                        <li>Game</li>
                    </Link>
                    <Link to="/highscores">
                        <li>High Scores</li>
                    </Link>
                    {this.props.userId? (
                        <Link to={`/user/${this.props.userId}`}>
                        <li>{this.props.username}</li>
                    </Link>
                    ): (
                        <Link to='/user/0'>
                            <li>User</li>
                        </Link>
                    )}
                    
                    <li><a href = 'http://localhost:8000/auth/logout'>Logout</a></li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {userId, username} = state;
    return {
        userId,
        username
    }
}

let outputActions = {
    getUsernameAndId,
    logout
}

export default connect(mapStateToProps, outputActions)(Header);