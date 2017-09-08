import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getHighScores} from './../../ducks/reducer';

class Scores extends Component {
    componentWillMount(){
        this.props.getHighScores();
    }
    render(){
        return(
            <div className="scores-container">
                {this.props.highScores.length > 0 ? 
                    (<div>
                        <h1>HIGH SCORES</h1>
                        
                    {this.props.highScores.map((scores, index)=> {
                        return <li key={index}> Player: {scores.player} --- Score : {scores.score}</li>
                    })} 

                </div>) : 
                null //FETCHING HIGH SCORES OR LOADING
                }
                <div className="parachute-penguin"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {highScores} = state;
    return {
        highScores
    }
}

let outputActions = {
    getHighScores
}

export default connect(mapStateToProps, outputActions)(Scores);