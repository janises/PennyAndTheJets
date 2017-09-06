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
                    (<div>Scores: {this.props.highScores.map((scores)=> {
                    return <li> Player: {scores.player} --- Score : {scores.score}</li>
                    })} 

                </div>) : 
                null
                }
                
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