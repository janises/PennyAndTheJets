import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './Header/Header';
// import Landing from './Landing/Landing';
import Game from './Game/Game';
import Login from './Login/Login';
import Instructions from './Instructions/Instructions';
import Scores from './Scores/Scores';
import PageNotFound from './PageNotFound/PageNotFound';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Switch>
          
          <Route component={Login} exact path="/"/>
          <Route component={Game} path='/game'/>
          <Route component={Instructions} path='/instructions'/>
          <Route component={Scores} path='/scores'/>
          <Route component={PageNotFound} path='/pagenotfound'/>
        </Switch>

      </div>
    );
  }
}

export default App;
