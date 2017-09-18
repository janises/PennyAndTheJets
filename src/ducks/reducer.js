import axios from 'axios'; 

const initialState = {
    container: {
        height: '',
        width: ''
    },
    player: {
        top: 10,
        left: 200
    },
    playerSize: {
        height: 40,
        width: 40
        
    },
    bird: {
        height: 65,
        width: 50
    },
    cloud: {
        height: 55,
        width: 65
    },
    plane: {
        height: 55,
        width: 70
    },
    parachute: {
        height: 55,
        width: 55
    },
    score: 0,
    dx: 5,
    obstacles: [],
    obstacleSpeed: 3,
    obstacleIndex: 1,
    highScores: [],
    isModalOpen: false,
    username: '',
    userId: '',
    newUsername: '',
    userPicture: '',
    userScores: [],
    bestScore:0,
    editing: false,
    isGameOver: false,
    isAdModalOpen: false
}

const SAVE_CONTAINER_DIM = "SAVE_CONTAINER_DIM",
      MOVE_PLAYER = 'MOVE_PLAYER',
      MOVE_OBSTACLES = 'MOVE_OBSTACLES',
      MAKE_NEW_OBSTACLE = 'MAKE_NEW_OBSTACLE',
      SAVE_SCORE = 'SAVE_SCORE',
      INCREMENT_SCORE = 'INCREMENT_SCORE',
      RESET_GAME = 'RESET_GAME',
      GET_HIGH_SCORES = 'GET_HIGH_SCORES',
      GET_USER_SCORES = 'GET_USER_SCORES',
      ADJUST_BEST_SCORE = 'ADJUST_BEST_SCORE',
      GET_BEST_SCORE= 'GET_BEST_SCORE',
      CLOSE_AD_MODAL = 'CLOSE_AD_MODAL',
      OPEN_MODAL = 'OPEN_MODAL',
      DELETE_USER = 'DELETE_USER',
      UPDATE_USERNAME = 'UPDATE_USERNAME',
      UPDATE_EMAIL = 'UPDATE_EMAIL',
      HANDLE_INPUT = 'HANDLE_INPUT',
      GET_USERNAME = 'GET_USERNAME',
      EDIT_USERNAME = 'EDIT_USERNAME',
      LOGOUT = 'LOGOUT';


export function saveContainerDim(height, width) {
    return {
        type: SAVE_CONTAINER_DIM,
        height,
        width
    }
}   

export function logout(){
    return{
        type: LOGOUT,
        payload: axios.get('/auth/logout').then(response => response)
    }
}

export function handleInput(e){
    return{
        type: HANDLE_INPUT,
        payload: e
    }
}

export function editUsername(){
    return {
        type: EDIT_USERNAME,
        payload: true
    }
}

export function getUsernameAndId(){
    return {
        type: GET_USERNAME,
        payload: axios.get('/username')
        .then(response => {
            return response
        })
    }
}

export function updateEmail(email){
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}      

export function updateUsername(username) {
    return {
        type: UPDATE_USERNAME,
        payload: axios.put('/updateusername', {username})
        .then(response=> {
            return response
        })
    }
}      

export function deleteUser(id){
    return {
        type: DELETE_USER,
        payload: axios.delete('/deleteuser/' + id)
        .then(response=> {
            return response
        })
    }
}

export function openModal(){
    return {
        type: OPEN_MODAL,
        payload: true
    }
}

export function closeAdModal(){
    return {
        type: CLOSE_AD_MODAL,
        payload: false
    }
}

export function getBestScore(){
    return {
        type:GET_BEST_SCORE
    }
}

export function adjustBestScore(){
    return{
        type:ADJUST_BEST_SCORE,
    }
}

export function getUserScores(){
    return {
        type: GET_USER_SCORES,
        payload: axios.get('/userscores').then(response => {
            return response
        })
    }
}

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
        type: RESET_GAME
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
        payload: axios.post('/addscore', {score}).then(response=> {
            return response
        })

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
        payload: e 
    }
}



function reducer(state = initialState, action) {
    let {player, container, score, obstacles, obstacleIndex, bird, plane, parachute, cloud, playerSize, dx, userScores, bestScore} = state;
    switch(action.type) {
        case SAVE_CONTAINER_DIM:
            // console.log('reducer height:', action.height, "width:", action.width);
            return Object.assign({}, state, {container:{height:action.height, width: action.width}});
        break;
        case MOVE_PLAYER:
            if(action.payload === 39) {
                if(player.left <= container.width - (playerSize.width + dx*2)) {
                    return Object.assign({}, state, {player:{top: 10, left: player.left += dx}})
                }   
            } else if(action.payload === 37) {
                if(player.left >= dx) {
                    return Object.assign({}, state, {player: {top: 10, left: player.left -= dx}})
                } 

            }
            break;
           
        case MAKE_NEW_OBSTACLE:
            let newObstacle;
            if(obstacles.length < 10) {
                if(action.payload === 'cloud') {
                    newObstacle = {type: action.payload, key: obstacleIndex, remove: false, top: container.height-cloud.height, left: Math.floor(Math.random()* (container.width - cloud.width*2 + 1)+ cloud.width), style:{height: cloud.height, width: cloud.width, position:'absolute'}};
                } else if (action.payload === 'plane') {
                    newObstacle = {type: action.payload, key: obstacleIndex, remove: false, top: container.height-plane.height, left: Math.floor(Math.random()* ((container.width-plane.width*2) - plane.width*2 + 1) + plane.width), style:{height: plane.height, width: plane.width, position:'absolute'}};
                } else if (action.payload === 'bird') {
                    newObstacle = {type: action.payload, key: obstacleIndex, remove: false, top: container.height-bird.height, left: Math.floor(Math.random()* ((container.width-bird.width) - bird.width*2 + 1)+ bird.width*2), style:{height: bird.height, width: bird.width, position:'absolute'}};
                } else if(action.payload === 'parachute') {
                    newObstacle = {type: action.payload, key: obstacleIndex, remove: false, top: container.height-parachute.height, left: Math.floor(Math.random()* (container.width - parachute.width*2 + 1)+ parachute.width), style:{height: parachute.height, width: parachute.width, position:'absolute'}};
                }
                return Object.assign({}, state, {obstacleIndex: obstacleIndex + 1, obstacles: obstacles.concat([newObstacle])});
            }
           
            // console.log(newObstacle)
            
            break;
        case MOVE_OBSTACLES:
        let {obstacleSpeed} = state;
            let movedObstacles = obstacles.filter(obstacle => !obstacle.remove).map(obstacle => {
                if(obstacle.key === +action.payload.key) {
                    if(obstacle.top >= obstacleSpeed) {
                        if(obstacle.type === 'bird') {
                            obstacle.left -= 1;
                        } else if(obstacle.type === 'plane') {
                            obstacle.left += 1;
                        }
                        obstacle.top -= obstacleSpeed;
                        

                    } else if (obstacle.top < obstacleSpeed || (obstacle.top === (playerSize.height + player.top) && obstacle.left < player.left + playerSize.width && obstacle.left > player.left) ) {
                        obstacle.remove = true
                    }
                    
                }
                return obstacle;
            })
         
            return Object.assign({},state, {obstacles: movedObstacles} )  

            break;
        case SAVE_SCORE + '_FULFILLED':
                console.log('save score 259', action.payload)
                return Object.assign({}, state, {highScores:action.payload})
                break;
        case SAVE_SCORE + '_REJECTED':
            console.log('error saving score')
            break;
        case INCREMENT_SCORE:
            return Object.assign({}, state, {score: score + action.payload})
            break;  
        case RESET_GAME:
        //CHANGE IS ISADMODALOPEN TO TRUE
            return Object.assign({}, state, {score: 0, isModalOpen: false, isAdModalOpen: false, obstacleIndex: 1, obstacles: []})  
        case UPDATE_USERNAME + "_FULFILLED":
            console.log('233 reducer', action.payload.data)
            return Object.assign({}, state, {editing: false, username: action.payload.data})
            break;
        case UPDATE_USERNAME + "_REJECTED":
            console.log('error updating username')
            break;
        case EDIT_USERNAME:
            return Object.assign({}, state, {editing: action.payload})
            break;
        case GET_USERNAME+'_PENDING':
            return Object.assign({}, state, {username: 'User'})
        case GET_USERNAME + "_FULFILLED":
        console.log('reducer username 222', action.payload.data)
            return Object.assign({}, state, {username: action.payload.data.username, userId: action.payload.data.id, userPicture: action.payload.data.image})
            break;
        case GET_USERNAME + "_REJECTED":
            console.log('error getting username')
            break;
        case DELETE_USER + "_FULFILLED":
            return Object.assign({}, state, {username:'', userScores: []})
        case DELETE_USER + "_REJECTED":
            console.log('error deleting user')
        case GET_USER_SCORES + "_FULFILLED":
        console.log('reducer scores 227', action.payload)
            return Object.assign({}, state,{userScores: action.payload.data})
            break;
        case GET_USER_SCORES + "_REJECTED":
            console.log('error getting user scores')
            break;
        case GET_HIGH_SCORES + "_FULFILLED":
        console.log('reducerscores', action.payload)
            return Object.assign({}, state, {highScores: action.payload.data})
            break;
        case GET_HIGH_SCORES + "_REJECTED":
            console.log("error getting high scores")
            break;
        case GET_BEST_SCORE:
            if(userScores.length > 0) {
                console.log(userScores)
                return Object.assign({}, state, {bestScore: userScores[0]});
            } else {
                console.log(userScores)
                return Object.assign({}, state, {bestScore: 0})
            } 
            break;
        case ADJUST_BEST_SCORE:
            if(score > bestScore) {
                return Object.assign({}, state, {bestScore: score})
            };
            break;          
        case CLOSE_AD_MODAL:
            return Object.assign({}, state, {isAdModalOpen: action.payload})
            break;
        case OPEN_MODAL:
            return Object.assign({}, state, {isModalOpen: action.payload})
            break;
        case HANDLE_INPUT:
            return Object.assign({}, state, {editing: true, newUsername: action.payload})
            break;
        case LOGOUT + "_FULFILLED":
            return Object.assign({}, state, {username: '', userId: '', userScores: []})
        case LOGOUT + "_REJECTED":
            console.log('error logging out')
        default:
            break;
    }
    return state;
}

export default reducer;