import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import firebase from './firebase'

import {BrowserRouter as Router,Switch,Route,withRouter} from 'react-router-dom'

const Root = ({history}) =>{
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
      console.log(user)
      history.push('/')
      }
    })
  },[])
  return(
 
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/' component={App}/>
    </Switch>
 )
}
const RootWithRouter = withRouter(Root)

ReactDOM.render(
  // <React.StrictMode>
   <Router>
    <RootWithRouter />
   </Router>
  // </React.StrictMode>,
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
