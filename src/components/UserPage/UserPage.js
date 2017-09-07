import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
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

    validateUsername(){
        if(this.props.newUsername.length > 0 && this.props.newUsername.length <= 20) {
            this.props.updateUsername(this.props.newUsername)
        } else if (this.props.newUsername.length === 0) {
            alert("Username must be at least one character.")
        } else if(this.props.newUsername.length > 20) {
            alert('Username must be fewer than 20 characters.')
        }
        
    }

    render(){
        let {userScores, userPicture, username} = this.props;
        let scores;
        userScores.length > 0 ? (
           scores = userScores.map((score, key)=> {
                return <li className="score" key={key}> { score }</li>
            })):
            scores = <li className="score">No Scores Yet!</li>;
         
        
        return(
            <div className='user-page-container'>

                { this.props.userId ? (
                    <div className='user-page'>
                        <div className="user-scores">
                            <h2>{`${username.toUpperCase()}'S HIGH SCORES`}</h2>
                            <ul>
                                {scores}
                            </ul>
                        </div>  {/* end of .user-scores*/}
                
                    
                        <img className="user-picture" src={userPicture} alt={`${username}`}/>
                    
                {
                    this.props.editing ? (
                        <div className="edit-username">
                            <form name="edit-username-form" onSubmit={()=>this.validateUsername()}>
                                <input className="username-edit-input" placeholder={this.props.username} onChange={(e)=> this.props.handleInput(e.target.value)}/> 
                                <input type='submit' value='Save'/>
                            </form>
                            {/* <button onClick={(e)=>this.props.updateUsername(this.props.newUsername)}>Save</button> */}
                        </div> /*end of .edit-username */
                        
                    ) : (
                        <div className="display-username">
                            <span className="username">{this.props.username}</span> <button onClick={()=> this.props.editUsername()}>Edit </button>
                        </div> /*end of .display-username*/
                        
                    )
                }

                        <br/>
                        <button className="delete-account" onClick={()=> this.props.deleteUser(this.props.match.params.id)}>Delete Account</button>
                    </div> /* end of .user-page*/
                    
                ) : ( //if there is no user logged in
                    <div className="not-logged-in-user-page">
                        <h1>You must be logged in to see your user page</h1>
                        <a className='login' href = 'http://localhost:8000/auth'><button className='login-button btn'>LOGIN</button></a>
                    </div> /* end of .not-logged-in-user-page*/
                    )
                }
                
            </div> /* end of .user-page-container */
        )
    }
}

function mapStateToProps(state){
    let {username, userScores, editing, newUsername, userId, userPicture} = state;
    return {
        username,
        userScores,
        userPicture,
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