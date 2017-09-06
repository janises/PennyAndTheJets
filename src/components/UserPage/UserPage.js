import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUsername, deleteUser, saveScore, getUserScores, getUsernameAndId, editUsername, handleInput} from './../../ducks/reducer';

 
class UserPage extends Component {
    constructor(props){
        super(props);
        
    }

    componentWillMount(){
        this.props.getUsernameAndId();
        this.props.getUserScores();
    }

    render(){
        let {userScores} = this.props;
        let scores;
        userScores.length > 0 ? (
           scores = userScores.map((score, key)=> {
                return <li key={key}> { score }</li>
            })):
            scores = <li>No Scores Yet!</li>;
        
        
        return(
            <div className='user-page-container'>

                {this.props.userId ? (
                    <div className='user-page'>
                    <div className="user-scores">
                    <h2>{`${this.props.username}'s Scores`}</h2>
                    <ul>
                        {scores}
                    </ul>
                </div>
                
                {
                    this.props.editing ? (
                        <div>
                        <input className="username-edit-input" placeholder={this.props.username} onChange={(e)=> this.props.handleInput(e.target.value)}/> <button onClick={(e)=>this.props.updateUsername(this.props.newUsername)}>Save</button>
                        </div>
                        
                    ) : (
                        <div>
                            <span className="username">{this.props.username}</span> <button onClick={()=> this.props.editUsername()}>Edit </button>
                        </div>
                        
                    )
                }


                <br/>
                <button onClick={()=> this.props.deleteUser(this.props.match.params.id)}>Delete Account</button>
                    </div>
                ): (
                    <div className="not-logged-in-user-page">
                        <h1>You must be logged in to see your user page</h1>
                        <a className='login' href = 'http://localhost:8000/auth'><button className='login-button btn'>LOGIN</button></a>
                    </div>
                )
                }
                
            </div>
        )
    }
}

function mapStateToProps(state){
    let {username, userScores, editing, newUsername, userId} = state;
    return {
        username,
        userScores,
        editing,
        newUsername,
        userId
    }
}

let outputActions ={
    updateUsername,
    deleteUser,
    saveScore,
    getUserScores,
    getUsernameAndId,
    editUsername,
    handleInput
}

export default connect(mapStateToProps, outputActions)(UserPage);