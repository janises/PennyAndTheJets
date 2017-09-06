import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUsernameAndId, logout} from './../../ducks/reducer';

class Header extends Component {
    componentWillMount() {
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
                    {this.props.userId && this.props.username? (
                        <Link to={`/user/${this.props.userId}`}>
                        <li>{this.props.username}</li>
                    </Link>
                    ): null}
                    
                    {this.props.userId && this.props.username? 
                    <li><a href = 'http://localhost:8000/auth/logout'>Logout</a></li>
                    : 
                    
                    <li><a href='http://localhost:8000/auth'>Login</a></li>}
                    

                    {/* <button onClick={()=> this.props.logout()}>Logout</button> */}
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