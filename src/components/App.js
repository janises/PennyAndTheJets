import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './Header/Header';
// import Landing from './Landing/Landing';
import Game from './Game/Game';
import Login from './Login/Login';
import Instructions from './Instructions/Instructions';
import Scores from './Scores/Scores';
import PageNotFound from './PageNotFound/PageNotFound';
import UserPage from './UserPage/UserPage';


class App extends Component {

  componentDidMount(){

  }

  render() {

    return (
      

      <div className="App">
        <Header/>
        <Switch>
          
          <Route component={Login} exact path="/"/>
          <Route component={Game} path='/game'/>
          <Route component={Instructions} path='/instructions'/>
          <Route component={Scores} path='/highscores'/>
          <Route component={UserPage} path='/user/:id'/>
          <Route component={PageNotFound} path='/pagenotfound'/>
        </Switch>

      </div>
    );
  }
}


export default App;
