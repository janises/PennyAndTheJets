import React, {Component} from 'react';
import {connect} from 'react-redux';



class Obstacle extends Component {

    render(){
        let {type, top, left, obstacleStyle} = this.props;
        let newStyle = Object.assign({}, obstacleStyle, {top, left})

        return(
            <div className={type} style={newStyle}> </div>
        )
    }
}

function mapStateToProps(state) {
    let {player, container, obstacles} = state
    return {
        player,
        container,
        obstacles
    }
}



export default connect(mapStateToProps)(Obstacle);