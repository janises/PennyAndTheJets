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
                {/* <div className="scores-bg"></div> */}
                <div className="parachute-penguin"></div>
                {this.props.highScores.length > 0 ? 
                    (<div className='high-scores'>
                        <h1>HIGH SCORES</h1>
                        
                    {this.props.highScores.map((scores, index)=> {
                        return <li key={index}> Player: {scores.player} --- Score : {scores.score}</li>
                    })} 

                </div>) : 
                (<div> <h1>RETRIEVING HIGH SCORES</h1></div> )
                }
                
            </div> //end of .scores-container
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