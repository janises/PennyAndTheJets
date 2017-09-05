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
    highScores: [],
    isModalOpen: false,
    username: '',
    userId: '',
    newUsername: '',
    userScores: [],
    editing: false,
    isGameOver: false
}

const MOVE_PLAYER = 'MOVE_PLAYER',
      MOVE_OBSTACLES = 'MOVE_OBSTACLES',
      MAKE_NEW_OBSTACLE = 'MAKE_NEW_OBSTACLE',
      SAVE_SCORE = 'SAVE_SCORE',
      INCREMENT_SCORE = 'INCREMENT_SCORE',
      RESET_GAME = 'RESET_GAME',
      GET_HIGH_SCORES = 'GET_HIGH_SCORES',
      GET_USER_SCORES = 'GET_USER_SCORES',
      CLOSE_MODAL = 'CLOSE_MODAL',
      OPEN_MODAL = 'OPEN_MODAL',
      DELETE_USER = 'DELETE_USER',
      UPDATE_USERNAME = 'UPDATE_USERNAME',
      UPDATE_EMAIL = 'UPDATE_EMAIL',
      HANDLE_INPUT = 'HANDLE_INPUT',
      GET_USERNAME = 'GET_USERNAME',
      EDIT_USERNAME = 'EDIT_USERNAME',
      LOGOUT = 'LOGOUT';

export function logout(){
    return{
        type: LOGOUT,
        payload: axios.get('/auth/logout')
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

export function closeModal(){
    return {
        type: CLOSE_MODAL,
        payload: false
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
            break;
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
            if(movedObstacles.length < 1) {
                return Object.assign({}, state, {obstacles: movedObstacles, isModalOpen: true})
            } else {
                return Object.assign({},state, {obstacles: movedObstacles} )  
            }
            break;
        case SAVE_SCORE + '_FULFILLED':
                console.log(action.payload)
                return Object.assign({}, state, {highScores:action.payload, editing: false})
                break;
        case SAVE_SCORE + '_REJECTED':
            console.log('error saving score')
            break;
        case INCREMENT_SCORE:
        if(score < 0) {
            return Object.assign({}, state, {score: 0})
        } else {
            return Object.assign({}, state, {score: score + action.payload})
        }
            break;  
        // case RESET_GAME:
        //     return Object.assign({}, action.payload)  
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
        case GET_USERNAME + "_FULFILLED":
        console.log('reducer username 222', action.payload.data)
            return Object.assign({}, state, {username: action.payload.data.username, userId: action.payload.data.id})
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
        console.log('scores', action.payload)
            return Object.assign({}, state, {highScores: action.payload.data})
            break;
        case GET_HIGH_SCORES + "_REJECTED":
            console.log("error getting high scores")
            break;
        case CLOSE_MODAL:
            return Object.assign({}, state, {isModalOpen: action.payload})
            break;
        case OPEN_MODAL:
            return Object.assign({}, state, {isModalOpen: action.payload})
            break;
        case HANDLE_INPUT:
            return Object.assign({}, state, {editing: true, newUsername: action.payload})
            break;
        case LOGOUT + "_FULFILLED":
            return Object.assign({}, state, {username: '', userId: '', userScores: []})

        default:
            break;
    }
    return state;
}

export default reducer;