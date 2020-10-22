import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

const Root = () =>(
  <Router>
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/' component={App}/>
    </Switch>
  </Router>
)
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
