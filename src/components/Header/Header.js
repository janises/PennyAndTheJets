
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getUsernameAndId, logout} from './../../ducks/reducer';
import gameLogo from './../../img/game-logo.png';
import {TweenLite} from 'gsap';
import {connect} from 'react-redux';
require('dotenv').config();

class Header extends Component {
    constructor(){
        super();
        this.state={
            isMenuOpen: false
        }
    }

    componentWillMount() {
        this.props.getUsernameAndId();
    }

    openMenu(){
        this.state.isMenuOpen ? (
            this.setState({isMenuOpen: false}),
            TweenLite.to('.span1', .5, {'rotation': 0, transformOrigin: 'left'}),
            TweenLite.to('.span2', .5, {'rotation': 0, transformOrigin: 'left'})

        ) : (
            this.setState({isMenuOpen: true}),
            TweenLite.to('.span1', .5, {'rotation': 45, transformOrigin: 'left'}),
            TweenLite.to('.span2', .5, {'rotation': -45, transformOrigin: 'left'})
        )
    }

    render(){
   
        return(
            <div className='header-container'>
                <Link to="/">
                    <img src={gameLogo} alt="game-logo" className="logo"/>
                </Link>

                <ul className='nav'>
                    <Link to="/">
                        <li>HOME</li>
                    </Link>
                    <Link to='/instructions'>
                        <li>GAME</li>
                    </Link>
                    <Link to="/highscores">
                        <li>HIGH SCORES</li>
                    </Link>
                    {this.props.userId && this.props.username
                    ? 
                    (
                        <Link to={`/user/${this.props.userId}`}>
                            <li>{this.props.username.toUpperCase()}</li>
                        </Link>
                    ): 
                        <Link to={`/user/0`}>
                            <li>USER</li>
                        </Link>
                    }
                    
                    {this.props.userId && this.props.username
                    ? 
                    <li><a href = {process.env.REACT_APP_LOGOUT}>LOGOUT</a></li>
                    : 
                    <li><a href={process.env.REACT_APP_LOGIN}>LOGIN</a></li>
                    }
                </ul>

                <div className="menu" onClick={()=>this.openMenu()}>
                    <span className="span1 span"></span>
                    <span className="span2 span"></span>
                </div>

                {
                    this.state.isMenuOpen ? (
                        <div className="side-menu">
                            <ul className='side-nav'>
                                <Link to="/">
                                    <li>HOME</li>
                                </Link>
                                <Link to='/instructions'>
                                    <li>GAME</li>
                                </Link>
                                <Link to="/highscores">
                                    <li>HIGH SCORES</li>
                                </Link>
                                {this.props.userId && this.props.username 
                                ? (
                                    <Link to={`/user/${this.props.userId}`}>
                                        <li>{this.props.username.toUpperCase()}</li>
                                    </Link>
                                ): 
                                    <Link to={`/user/0`}>
                                        <li>USER</li>
                                    </Link>
                                }
                                
                                {this.props.userId && this.props.username ? 
                                <li><a href = {process.env.REACT_APP_LOGOUT}>LOGOUT</a></li>
                                : 
                                <li><a href={process.env.REACT_APP_LOGIN}>LOGIN</a></li>
                                }
                            </ul>
                        </div>
                    ) : null
                }
                

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
    logout
}

export default connect(mapStateToProps, outputActions)(Header);