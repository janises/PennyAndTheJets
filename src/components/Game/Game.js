import React, {Component} from 'react';
import {connect} from 'react-redux';
import {movePlayer, collisionDetection, makeNewObstacle, moveObstacles, saveScore, incrementScore, filterObstacles} from './../../ducks/reducer';
import Obstacle from './Obstacle';

class Game extends Component {
    constructor() {
        super();
        this.state={
            score: 0
        }
        // this.startScore = this.startScore.bind(this);
    }

    componentDidMount() {
        this.refs.player.focus();
        this.startObstacles();
        // this.startScore();
        window.onkeydown = (e)=> this.props.movePlayer(e);
        requestAnimationFrame(()=> this.updateObstaclePositions());
    }

    startScore(){
        let score;
        this.props.obstacles.length > 0 ? (
             score = setInterval(()=> {
                this.props.incrementScore(1)
            }, 500)
            ) : clearInterval(score)
                // this.props.saveScore(score)

        
    }



    updateObstaclePositions() {
        
        this.props.obstacles.map(obstacle=> {
            this.props.moveObstacles(obstacle); 
    
        })
        

        this.props.obstacles.length > 0 ? (
            this.props.incrementScore(1)
        ) : null;

        this.props.obstacles.map(obstacle => {
            if(obstacle.score){
                if(obstacle.type === 'cloud') {
                    this.props.incrementScore(100)
                    obstacle.remove = true;
                } else if(obstacle.type === 'bird') {
                    this.props.incrementScore(-100)
                    obstacle.remove = true;
                } else if(obstacle.type === 'plane') {
                    this.props.incrementScore(-500)
                    obstacle.remove = true;
                } else if(obstacle.type === 'parachute'){
                    this.props.incrementScore(1000)
                    obstacle.remove = true;
                    //reset everything and redirect to score page
                }
            }
        })
       
        requestAnimationFrame(()=> this.updateObstaclePositions());
    }
    
    startObstacles(){
        let {obstacles, makeNewObstacle, obstacleIndex} = this.props;
        if(obstacles.length <= 16 && obstacleIndex <= 16) {
            for(let i = 1; i <= 16; i++){
                setTimeout(()=> {
                    if(i <= 8 && i % 2 === 0) {
                        makeNewObstacle('bird');
                    } else if(i <= 15 && i % 2 !== 0) {
                        makeNewObstacle('cloud');
                    } else if(i > 8 && i < 16 && i % 2 === 0) {
                        makeNewObstacle('plane');
                    } else if (i === 16) {
                        makeNewObstacle('parachute');
 
                    }

                }, i * 500)
                   
                
            }
            
        } else {
            console.log('none')
        }
    }

   

    render(){
        let {player} = this.props;
        
        return(
            <div className='game-page'>
                <div>Score: {this.props.score}</div>
                <div className="game-container" style={this.props.container}>
                    <div className='player' ref='player' tabIndex='0' onKeyDown={(e)=> this.props.movePlayer(e)} style={player}></div>
                    { this.props.obstacles.length > 0 ? (
                        this.props.obstacles.map((obstacle) =>{
                            if(obstacle.top <= 50 && (obstacle.left+30 > player.left && obstacle.left < player.left + 50)) {
                                obstacle.score = true;
                            } else {
                                return <Obstacle left={obstacle.left} top={obstacle.top} type={obstacle.type} />
                            }
                            

                            
                           
                    })) : null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {player, score, container, obstacles, obstacleIndex} = state
    return {
        player,
        score,
        container,
        obstacles,
        obstacleIndex
    }
}

let outputActions = {
    movePlayer,
    collisionDetection,
    makeNewObstacle,
    moveObstacles,
    saveScore,
    incrementScore,
    filterObstacles
}

export default connect(mapStateToProps, outputActions)(Game);