import React, {Component} from 'react';
import {connect} from 'react-redux';
import {movePlayer, makeNewObstacle, moveObstacles, saveScore, incrementScore, resetGame} from './../../ducks/reducer';
import Obstacle from './Obstacle';
import GameOver from './GameOver';

class Game extends Component {
    constructor() {
        super();
        this.state={
            playerSize: {
                height: 40,
                width: 40
            },
            isModalOpen: false
          
        }
        
    }

    componentDidMount() {
        this.refs.player.focus(); //focus on player when page loads
        this.startObstacles(); //obstacles start coming from the bottom of the screen when page loads
        window.onkeydown = (e)=> this.props.movePlayer(e); //move player on keydown
        requestAnimationFrame(()=> this.updateObstaclePositions()); //start game loop
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
                    //modal saying you win //else if parachute top ===0, modal saying you lose
                    //save score, send to db
                    // this.props.resetGame();
                    //reset everything and redirect to score page
                }
            }
        })
       
        requestAnimationFrame(()=> this.updateObstaclePositions()); //game loop
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

                }, i * 1500)
                   
                
            }
            
        } 
        setTimeout(()=> {
            console.log('modal')
            this.setState({isModalOpen: true})
        }
        , 30000)
    }

    openModal(){
        this.setState({
            isModalOpen: true
        })
    }

    closeModal(){
        this.setState({
            isModalOpen: false
        })
    }
   

    render(){
        let {player, obstacles, movePlayer} = this.props;
        let {playerSize, obstacleStyle, gameOver} = this.state;
        
        return(
            <div className='game-page'>
                <div>Score: {this.props.score}</div>
                <div className="game-container" style={this.props.container}>
                    <div className='player' ref='player' tabIndex='0' onKeyDown={(e)=> movePlayer(e)} style={player}></div>
                    { obstacles.length > 0 ? (
                        obstacles.map((obstacle) =>{
                            if(obstacle.top <= playerSize.height && (obstacle.left+ obstacle.style.width > player.left && obstacle.left < player.left + playerSize.width)) {
                                obstacle.score = true;
                            } else {
                                return <Obstacle left={obstacle.left} top={obstacle.top} type={obstacle.type} obstacleStyle={obstacle.style}/>
                            }
                            

                            
                           
                    })) : null
                    }
                    {
                        this.state.isModalOpen ? <GameOver openModal={this.openModal} closeModal={this.closeModal}/> : null
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
    makeNewObstacle,
    moveObstacles,
    saveScore,
    incrementScore,
    resetGame
}

export default connect(mapStateToProps, outputActions)(Game);