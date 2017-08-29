const initialState = {
    container: {
        height: 400,
        width: 600
    },
    player: {
        top: 0,
        left: 200
    },
    score: 0,
    obstacles: [{type: 'cloud', key: 17, top: 400, left: 100, remove: false}],
    obstacleSpeed: 20,
    obstacleIndex: 0
}

const MOVE_PLAYER = 'MOVE_PLAYER',
      COLLISION_DETECTION = 'COLLISION_DETECTION',
      MOVE_OBSTACLES = 'MOVE_OBSTACLES',
      MAKE_NEW_OBSTACLE = 'MAKE_NEW_OBSTACLE',
      SAVE_SCORE = 'SAVE_SCORE',
      INCREMENT_SCORE = 'INCREMENT_SCORE',
      FILTER_OBSTACLES = 'FILTER_OBSTACLES';

export function filterObstacles(obstacles){
    return {
        type: FILTER_OBSTACLES,
        payload: obstacles
    }
}

export function incrementScore(amount){
    return{
        type: INCREMENT_SCORE,
        payload: amount
    }
}

export function saveScore(score){
    return {
        type: SAVE_SCORE,
        payload: score
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

export function collisionDetection(type){
    return {
        type: COLLISION_DETECTION,
        payload: type
    }
}


function reducer(state = initialState, action) {
    let {player, container, score, obstacles, obstacleIndex} = state;
    switch(action.type) {
        case MOVE_PLAYER:
            if(action.payload === 39) {
                if(player.left <= container.width-60) {
                    return Object.assign({}, state, {player:{top: 0, left: player.left + 10}})
                }   
            } else if(action.payload === 37) {
                if(player.left >= 10) {
                    return Object.assign({}, state, {player: {top: 0, left: player.left - 10}})
                } 

            }
            break;
        case COLLISION_DETECTION:
            switch(action.payload) {
                case 'bird':
                    return Object.assign({}, state, {score: score - 100})
                case 'cloud':
                    return Object.assign({}, state, {score: score + 100});
                case 'plane':
                    return Object.assign({}, state, {score: score - 500});
                case 'parachute':
        
                    return Object.assign({}, state, {score: score + 1000});
                default:
                    return Object.assign({}, state);
            }
        case MAKE_NEW_OBSTACLE:
            let newObstacle = {type: action.payload, key: obstacleIndex, remove: false, top: container.height, left: Math.floor(Math.random()* container.width)};
            // console.log(obstacles);
            return Object.assign({}, state, {obstacleIndex: obstacleIndex + 1, obstacles: obstacles.concat([newObstacle])});
        case MOVE_OBSTACLES:
            let movedObstacles = obstacles.filter(obstacle => !obstacle.remove).map(obstacle => {
                if(obstacle.key === +action.payload.key) {
                    if(obstacle.top > 0) {
                        obstacle.top -= 1;
                    } else if (obstacle.top === 0 || (obstacle.top === 50 && obstacle.left < player.left + 50 && obstacle.left > player.left) ) {
                        obstacle.remove = true
                    }
                    if(obstacle.remove) {
                        obstacle.remove = true;
                    }
                }
                // console.log(obstacle)
                return obstacle;
            })
            return Object.assign({},state, {obstacles: movedObstacles} )    
        case SAVE_SCORE:
                console.log(action.payload)
                return Object.assign({}, state, {score: action.payload})
        case INCREMENT_SCORE:
            return Object.assign({}, state, {score: score + action.payload})    
        
        case FILTER_OBSTACLES:
            
            return Object.assign({}, state, {obstacles: action.payload})    
        default:
            break;
    }
    return state;
}

export default reducer;