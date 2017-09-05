import React, {Component} from 'react';
import {connect} from 'react-redux';
import {movePlayer, makeNewObstacle, moveObstacles, saveScore, incrementScore, resetGame, openModal, closeModal} from './../../ducks/reducer';
import Obstacle from './Obstacle';
import GameOver from './GameOver';

class Game extends Component {
    constructor() {
        super();
        this.state={
            playerSize: {
                height: 40,
                width: 40
            }
          
        }
        this.playAgain = this.playAgain.bind(this);
    }

    componentDidMount() {
        this.refs.player.focus(); //focus on player when page loads
        this.obstacles = this.startObstacles(); //obstacles start coming from the bottom of the screen when page loads
        // if(this.props.isModalOpen) {
        //     clearInterval(this.obstacles)
        // }
        window.onkeydown = (e)=> this.props.movePlayer(e); //move player on keydown
        requestAnimationFrame(()=> this.updateObstaclePositions()); //start game loop
    }


   

    updateObstaclePositions() {
        
        this.props.obstacles.map(obstacle=> {
            this.props.moveObstacles(obstacle); 
    
        })
        

        !this.props.isModalOpen ? (
            this.props.incrementScore(1)
        ) : null;

        this.props.obstacles.map(obstacle => {
            if(obstacle.score){
                if(obstacle.type === 'cloud') {
                    this.props.incrementScore(100)
                    obstacle.remove = true;
                } else if(obstacle.type === 'bird') {
                    this.props.openModal()
                    obstacle.remove = true;
                } else if(obstacle.type === 'plane') {
                    this.props.openModal()
                    obstacle.remove = true;
                } else if(obstacle.type === 'parachute'){
                    this.props.incrementScore(1000)
                    obstacle.remove = true;
                    //save score, send to db
                    // this.props.resetGame();
                    //reset everything and redirect to score page
                }
            }
        })
       
        requestAnimationFrame(()=> this.updateObstaclePositions()); //game loop
    }
    
    startObstacles(){
        let {obstacles, makeNewObstacle, obstacleIndex, isModalOpen} = this.props;
        for(let i = 0; i <= 16; i++) {
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
            }, i * 1000)
        }      
        

    }

   
    playAgain(){
        this.props.saveScore(this.props.score)
        // this.props.closeModal();
        
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
                        this.props.isModalOpen ?  <GameOver close={this.playAgain}/> : null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {player, score, container, obstacles, obstacleIndex, isModalOpen} = state
    return {
        player,
        score,
        container,
        obstacles,
        obstacleIndex,
        isModalOpen
    }
}

let outputActions = {
    movePlayer,
    makeNewObstacle,
    moveObstacles,
    saveScore,
    incrementScore,
    resetGame,
    openModal, 
    closeModal
}

export default connect(mapStateToProps, outputActions)(Game);