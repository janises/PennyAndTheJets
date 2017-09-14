import React, {Component} from 'react';
import {connect} from 'react-redux';
import {movePlayer, makeNewObstacle, moveObstacles, saveScore, incrementScore, resetGame, openModal, closeModal, getHighScores} from './../../ducks/reducer';
import Obstacle from './Obstacle';
import GameOver from './GameOver';
// import $ from 'jquery';

class Game extends Component {
    constructor() {
        super();
        this.state={
            birds: '',
            clouds: '',
            planes: '',
            parachutes: ''
          
        }
        this.startObstacles = this.startObstacles.bind(this);
    }

    componentWillMount(){
        this.props.getHighScores();
    }

    componentDidMount() {
        this.refs.player.focus(); //focus on player when page loads
        this.obstacles = this.startObstacles(); //obstacles start coming from the bottom of the screen when page 
        window.onkeydown = (e)=> this.props.movePlayer(e); //move player on keydown
        requestAnimationFrame(()=> this.updateObstaclePositions()); //start game loop
    }

    componentWillUnmount(){
        this.props.resetGame();
        clearInterval(this.state.birds)
        clearInterval(this.state.clouds)
        clearInterval(this.state.planes)
        clearInterval(this.state.parachutes)
    }

   

    updateObstaclePositions() {
        
        this.props.obstacles.map(obstacle=> {
            this.props.moveObstacles(obstacle); 
    
        })
        
        //if the modal is not open, increment the score and alter points when hitting obstacles
        !this.props.isModalOpen ? (
            this.props.incrementScore(1),
            this.props.obstacles.map(obstacle => {
                if(obstacle.score){
                    if(obstacle.type === 'cloud') {
                        this.props.incrementScore(100)
                        obstacle.remove = true;
                    } else if(obstacle.type === 'bird') {
                        this.openModalAndClearInterval()
                        obstacle.remove = true;
                    } else if(obstacle.type === 'plane') {
                        this.openModalAndClearInterval()
                        obstacle.remove = true;
                    } else if(obstacle.type === 'parachute'){
                        this.props.incrementScore(1000)
                        obstacle.remove = true;
                    }
                }
            })
           
        ) : null;

       
        requestAnimationFrame(()=> this.updateObstaclePositions()); //game loop
    }
    
    
    startObstacles(){
        let {makeNewObstacle} = this.props;    
       
            var createBirds = setInterval(()=> {
                makeNewObstacle('bird')
            }, 1100)

            var createClouds = setInterval(()=> {
                makeNewObstacle('cloud')
            }, 1500)

            var createPlanes = setInterval(()=> {
                makeNewObstacle('plane')
            }, 3200)

            var createParachutes = setInterval(()=> {
                makeNewObstacle('parachute')
            }, 5450)

            this.setState({
                birds: createBirds,
                clouds: createClouds,
                planes: createPlanes,
                parachutes: createParachutes
            })

    }

    openModalAndClearInterval(){
        this.props.openModal()
        clearInterval(this.state.birds)
        clearInterval(this.state.clouds)
        clearInterval(this.state.planes)
        clearInterval(this.state.parachutes)
        this.props.saveScore(this.props.score)
    }
   



    render(){
        let {player, obstacles, movePlayer, playerSize} = this.props;
        let displayPlayers = [],
        displayScores = [];
        // console.log(this.props.highScores)
        this.props.highScores ? (
            displayPlayers = this.props.highScores.map((scores, index)=> {
            return <li key={index}> {scores.player}</li>       
        }),

        displayScores = this.props.highScores.map((scores, index)=> {
            return <li key={index}>{scores.score}</li>
        })
    ) : null;
    
        
        return(
            <div className='game-page'>
                <h1 className="score">Score: {this.props.score}</h1>
                <div className="example-containers">
                    <div className="example-obstacles">
                        <div className="example-cloud-div examples"> 
                            <h4>+100</h4> 
                            <div className="cloud example-cloud"></div> 
                        </div> 
                            <div className="example-parachute-div examples"> 
                                <h4>+1000</h4> 
                                <div className="parachute example-parachute"></div>  
                            </div>
                        <div className="example-bird-div examples">
                            <h4>GAME OVER</h4>
                            <div className="bird example-bird"></div>
                        </div>
                        <div className="example-plane-div examples"> 
                            <h4>GAME OVER</h4>
                            <div className="plane example-plane"></div>
                        </div>
  
                    </div>

                </div>
                

                    <div className="game-container" style={this.props.container}>
                        <div className='player' ref='player' tabIndex='0' onKeyDown={(e)=> movePlayer(e)} style={player}></div>
                        { !this.props.isModalOpen ? (
                            obstacles.map((obstacle) =>{
                                if(obstacle.top + 25 <= playerSize.height && (obstacle.left+ obstacle.style.width + 12 > player.left && obstacle.left + 17 < player.left + playerSize.width)) {
                                    {/* console.log(obstacle) */}
                                    obstacle.score = true;
                                
                                } else {
                                    return <Obstacle left={obstacle.left} top={obstacle.top} type={obstacle.type} obstacleStyle={obstacle.style}/>
                                }
                        })) : null
                        }

                        {
                            this.props.isModalOpen ?  <GameOver playAgain={this.startObstacles}/> : null
                        }
                    </div>

                <div className="game-scores">
                    <ul>
                        {displayPlayers}
                    </ul>
                    {/* <ul>
                        {displayScores}
                    </ul> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {player, score, container, obstacles, obstacleIndex, isModalOpen, playerSize, highScores} = state
    return {
        player,
        score,
        container,
        obstacles,
        obstacleIndex,
        isModalOpen,
        playerSize,
        highScores
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
    closeModal,
    getHighScores
}

export default connect(mapStateToProps, outputActions)(Game);