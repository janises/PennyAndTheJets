import React, {Component} from 'react';
import {connect} from 'react-redux';
import {movePlayer, makeNewObstacle, moveObstacles, saveScore, incrementScore, resetGame, openModal, closeAdModal, adjustBestScore, getBestScore, getUserScores, saveContainerDim} from './../../ducks/reducer';
import Obstacle from './Obstacle';
import GameOver from './GameOver';
import $ from 'jquery';
import {TimelineLite} from 'gsap';

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

    // componentWillMount(){
    //     // this.props.getUserScores();
    //     // var height = $('.game-container').height();
    //     console.log('height', $(document).height());
    // }

    componentDidMount() {
        var containerHeight = $('.game-container').height();
        var containerWidth = $('.game-container').width();
        this.props.saveContainerDim(containerHeight, containerWidth);
        console.log('container-height', containerHeight);
        this.props.getBestScore();
        this.refs.player.focus(); //focus on player when page loads
        this.obstacles = this.startObstacles(); //obstacles start coming from the bottom of the screen when page 
        window.onkeydown = (e)=> this.props.movePlayer(e.keyCode); //move player on keydown
        requestAnimationFrame(()=> this.updateObstaclePositions()); //start game loop

        $(window).resize(()=>{
            let newHeight = $('.game-container').height();
            let newWidth = $('.game-container').width();
            this.props.saveContainerDim(newHeight, newWidth);
            console.log('game js height:',newHeight, 'width:',newWidth);
        })
    }

    // componentWillUpdate(){

    // }

    
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
                        //change color
                        this.colorIndicator('cloud')
                        this.props.incrementScore(100)
                        obstacle.remove = true;
                    } else if(obstacle.type === 'bird') {
                        //change color
                        this.colorIndicator('bird');
                        this.openModalAndClearInterval()
                        obstacle.remove = true;
                    } else if(obstacle.type === 'plane') {
                        // change color
                        this.colorIndicator('plane');
                        this.openModalAndClearInterval()
                        obstacle.remove = true;
                    } else if(obstacle.type === 'parachute'){
                        //change color
                        this.colorIndicator('parachute');
                        this.props.incrementScore(1000)
                        obstacle.remove = true;
                    }
                }
            })
           
        ) : null;


        requestAnimationFrame(()=> this.updateObstaclePositions()); //game loop
    }
    
    
    startObstacles(){
        let {makeNewObstacle, container} = this.props;    
       
            var createBirds = setInterval(()=> {
                makeNewObstacle('bird')
            }, 2100)

            var createClouds = setInterval(()=> {
                makeNewObstacle('cloud')
            }, 1500)

            var createPlanes = setInterval(()=> {
                makeNewObstacle('plane')
            }, 3200)

            var createParachutes = setInterval(()=> {
                makeNewObstacle('parachute')
            }, 6450)

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
        this.props.adjustBestScore();
    }
   
    colorIndicator(obstacle) {
        var tl = new TimelineLite();
        if(obstacle === 'cloud') {
            tl.to('.example-cloud-div', .5, {backgroundColor:'rgba(0, 142, 45, 0.5)'})
            .to('.example-cloud-div', .5, {backgroundColor:'white'});
        } else if(obstacle === 'parachute') {
            tl.to('.example-parachute-div', .5, {backgroundColor:'rgba(0, 142, 45, 0.5)'})
            .to('.example-parachute-div', .5, {backgroundColor:'white'});
        } else if(obstacle === 'bird') {
            tl.to('.example-bird-div', .5, {backgroundColor:'rgba(255, 0, 0, 0.49)'})
            .to('.example-bird-div', .5, {backgroundColor:'white'});
        } else if(obstacle === 'plane') {
            tl.to('.example-plane-div', .5, {backgroundColor:'rgba(255, 0, 0, 0.49)'})
            .to('.example-plane-div', .5, {backgroundColor:'white'});
        }
    }


    render(){
        let {player, obstacles, movePlayer, playerSize} = this.props;

    
    
        
        return(
            <div className='game-page'>
                {/* <div className="game-background"></div> */}
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
                        <div className='player' ref='player' tabIndex='0' onKeyDown={(e)=> movePlayer(e.keyCode)} style={player}></div>
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

                    <div className="arrow-buttons">
                        <div className="left-button arrow-btn" onClick={()=> this.props.movePlayer(37)}></div>
                        <div className="right-button arrow-btn" onClick={()=> this.props.movePlayer(39)}></div>
                    </div>

                <div className="game-scores">
                    <div className="score-cheer-penguins">
                    <h3 className="best-score-h3">YOUR HIGH SCORE</h3>
                    <h4 className="best-score">{this.props.bestScore}</h4>
                    <div className="cheer-penguins">
                        <div className="go-penguin"></div>
                        <div className="go-penguin"></div>
                        <div className="go-penguin"></div>
                    </div>

                    </div>
                   

                    {
                        this.props.isAdModalOpen ? 
                        (
                            <div className="pop-up">
                            <div className="pop-up-header">
                                <p>DevMountain</p>
                                <button onClick={()=> this.props.closeAdModal()}>x</button>
                            </div>
                            <div className="fake-ad">
                                <p>LEARN TO CODE IN 12 WEEKS!</p>
                                
                                <div className="dm-ad"></div>
                            </div>
                        
                            </div>

                        ) : null
                    }
                    
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {player, score, container, obstacles, obstacleIndex, isModalOpen, playerSize, highScores, bestScore, isAdModalOpen} = state
    return {
        player,
        score,
        container,
        obstacles,
        obstacleIndex,
        isModalOpen,
        playerSize,
        bestScore,
        isAdModalOpen
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
    closeAdModal,
    adjustBestScore,
    getBestScore,
    getUserScores,
    saveContainerDim
}

export default connect(mapStateToProps, outputActions)(Game);