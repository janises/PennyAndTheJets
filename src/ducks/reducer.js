import axios from 'axios'; 

const initialState = {
    container: {
        height: 400,
        width: 600
    },
    player: {
        top: 10,
        left: 200
    },
    score: 0,
    obstacles: [{type: 'cloud', key: 0, top: 400, left: Math.floor(Math.random() * 400), remove: false, style:{height: 50, width: 70, position: 'absolute'}}],
    obstacleSpeed: 3,
    obstacleIndex: 1,
    highScores: []
}

const MOVE_PLAYER = 'MOVE_PLAYER',
      MOVE_OBSTACLES = 'MOVE_OBSTACLES',
      MAKE_NEW_OBSTACLE = 'MAKE_NEW_OBSTACLE',
      SAVE_SCORE = 'SAVE_SCORE',
      INCREMENT_SCORE = 'INCREMENT_SCORE',
      RESET_GAME = 'RESET_GAME',
      GET_HIGH_SCORES = 'GET_HIGH_SCORES';

export function getHighScores(){
    return {
        type: GET_HIGH_SCORES,
        payload: axios.get('/highscores').then(response => {
            return response
        })
    }
}

export function resetGame(){
    return{
        type: RESET_GAME,
        payload: initialState
    }
}      

export function incrementScore(amount){
    return{
        type: INCREMENT_SCORE,
        payload: amount
    }
}

export function saveScore(score){ //save to db
    return {
        type: SAVE_SCORE,
        // payload: axios.post('/savescore').then(response=> {}

    }
}

export function makeNewObstacle(type){
    return {
        type: MAKE_NEW_OBSTACLE,
        payload: type
    }
}

export function moveObstacles(obstacle){
    return {
        type: MOVE_OBSTACLES,
        payload: obstacle
    }
}

export function movePlayer(e) {
    return {
        type: MOVE_PLAYER,
        payload: e.keyCode 
    }
}



function reducer(state = initialState, action) {
    let {player, container, score, obstacles, obstacleIndex} = state;
    switch(action.type) {
        case MOVE_PLAYER:
            if(action.payload === 39) {
                if(player.left <= container.width-60) {
                    return Object.assign({}, state, {player:{top: 10, left: player.left += 5}})
                }   
            } else if(action.payload === 37) {
                if(player.left >= 10) {
                    return Object.assign({}, state, {player: {top: 10, left: player.left -= 5}})
                } 

            }
            break;
           
        case MAKE_NEW_OBSTACLE:
            let newObstacle;
            if(action.payload === 'cloud') {
                newObstacle = {type: action.payload, key: obstacleIndex, remove: false, top: container.height-50, left: Math.floor(Math.random()* container.width - 30), style:{height: 50, width: 70, position:'absolute'}};
            } else if (action.payload === 'plane') {
                newObstacle = {type: action.payload, key: obstacleIndex, remove: false, top: container.height-50, left: Math.floor(Math.random()* container.width - 30), style:{height: 50, width: 80, position:'absolute'}};
            } else if (action.payload === 'bird') {
                newObstacle = {type: action.payload, key: obstacleIndex, remove: false, top: container.height-50, left: Math.floor(Math.random()* container.width - 30), style:{height: 50, width: 40, position:'absolute'}};
            } else if(action.payload === 'parachute') {
                newObstacle = {type: action.payload, key: obstacleIndex, remove: false, top: container.height-50, left: Math.floor(Math.random()* container.width - 30), style:{height: 50, width: 50, position:'absolute'}};
            }
            console.log(newObstacle)
            return Object.assign({}, state, {obstacleIndex: obstacleIndex + 1, obstacles: obstacles.concat([newObstacle])});
        case MOVE_OBSTACLES:
        let {obstacleSpeed} = state;
            let movedObstacles = obstacles.filter(obstacle => !obstacle.remove).map(obstacle => {
                if(obstacle.key === +action.payload.key) {
                    if(obstacle.top >= obstacleSpeed) {
                        obstacle.top -= obstacleSpeed;
                    } else if (obstacle.top < obstacleSpeed || (obstacle.top === 50 && obstacle.left < player.left + 50 && obstacle.left > player.left) ) {
                        obstacle.remove = true
                    }
                    if(obstacle.remove) {
                        obstacle.remove = true;
                    }
                }
                return obstacle;
            })
            return Object.assign({},state, {obstacles: movedObstacles} )    
        // case SAVE_SCORE:
        //         console.log(action.payload)
        //         return Object.assign({}, state, {score: action.payload})
        case INCREMENT_SCORE:
            return Object.assign({}, state, {score: score + action.payload})    
        // case RESET_GAME:
        //     return Object.assign({}, action.payload)  
        // case GET_HIGH_SCORES:
        //     return Object.assign({}, state, {highScores: action.payload})
        default:
            break;
    }
    return state;
}

export default reducer;