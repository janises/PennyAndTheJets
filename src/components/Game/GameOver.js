import React, {Component} from 'react';
import {connect} from 'react-redux';
import {closeModal, getHighScores} from './../../ducks/reducer';
import {Link} from 'react-router-dom';
 
class GameOver extends Component {
    render(){

        return(
            <div className="game-over-container">
                <div className="game-over-modal">
                    <h1>GAME OVER</h1>
                    {/* <button onClick={()=> this.props.close()}>Play Again</button> */}
                    <Link to ='/highscores'> <button>High Scores</button></Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    let {isModalOpen} = state;

    return {
        isModalOpen
    }
}

let outputActions = {
    closeModal,
    getHighScores
}

export default connect(mapStateToProps, outputActions)(GameOver);