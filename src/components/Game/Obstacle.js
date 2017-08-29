import React, {Component} from 'react';
import {connect} from 'react-redux';
import {collisionDetection} from './../../ducks/reducer';


class Obstacle extends Component {
    constructor(){
        super();
       this.state= {
           style: {
               height: 30,
               width: 30,
               position: 'absolute'
           }
       }
    }

    componentDidUpdate(){
    }

    render(){
        let newStyle = Object.assign({}, this.state.style, {top: this.props.top, left: this.props.left})
        return(
            <div className={this.props.type} style={newStyle}> </div>
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

let outputActions = {
    collisionDetection,
}

export default connect(mapStateToProps, outputActions)(Obstacle);