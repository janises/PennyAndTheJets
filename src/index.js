import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import App from './components/App';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
// import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
, document.getElementById('root'));
// registerServiceWorker();
