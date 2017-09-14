import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserScores} from './../../ducks/reducer';

class Instructions extends Component {
    componentDidMount(){
        this.props.getUserScores();
    }

    render(){
        return(
            <div className='instructions-container'>

                <div className="instructions-bg"></div>

                <div className="instructions">
                    <h1>Use arrow keys to move</h1>
                    <h2>Avoid the planes and birds</h2>
                    <h3>Clouds and parachutes are bonus points</h3>
                    <div className="arrows">
                        <div className="arrowkeys">
                            <div className="left-arrow arrow"></div>
                            <div className="right-arrow arrow"></div>

                        </div>
                        
                    </div>
                    <Link to="/game">
                        <button>PLAY</button>
                    </Link>
                </div>  {/* end of .instructions */}

                <div className='game-preview'>
                  
                   
                    <div className="player instructions-peng"></div>
                </div>  {/* end of .game-preview */}

            </div> //end of .instructions-container//
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {getUserScores})(Instructions);