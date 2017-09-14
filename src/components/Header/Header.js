import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUsernameAndId, logout, getBestScore} from './../../ducks/reducer';

class Header extends Component {
    componentWillMount() {
        this.props.getUsernameAndId();
        
        if(this.props.userId){
            this.props.getBestScore();
        }
    }

    render(){
   
        return(
            <div className='header-container'>
                <ul className='nav'>
                    <Link to="/">
                        <li>HOME</li>
                    </Link>
                    <Link to='/game'>
                        <li>GAME</li>
                    </Link>
                    <Link to="/highscores">
                        <li>HIGH SCORES</li>
                    </Link>
                    {this.props.userId && this.props.username? (
                        <Link to={`/user/${this.props.userId}`}>
                        <li>{this.props.username.toUpperCase()}</li>
                    </Link>
                    ): null}
                    
                    {this.props.userId && this.props.username? 
                    <li><a href = 'http://localhost:8000/auth/logout'>LOGOUT</a></li>
                    : 
                    
                    <li><a href='http://localhost:8000/auth'>LOGIN</a></li>}
                    

                    {/* <button onClick={()=> this.props.logout()}>Logout</button> */}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {userId, username, userScores} = state;
    return {
        userId,
        username,
        userScores
    }
}

let outputActions = {
    getUsernameAndId,
    logout,
    getBestScore
}

export default connect(mapStateToProps, outputActions)(Header);