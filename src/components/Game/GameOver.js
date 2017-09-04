import React, {Component} from 'react';

export default class GameOver extends Component {
    render(){
        // if(this.props.isOpen === false) return null;
        return(
            <div className="game-over-container">
                <div className="game-over-modal">
                    <h1>GAME OVER</h1>
                    <button>Play Again</button>
                    <button> High Scores</button>
                </div>
            </div>
        )
    }
}