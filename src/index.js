import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import firebase from './firebase'
import {createStore} from 'redux'
import {Provider,connect} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {setUser} from './actions'

import {BrowserRouter as Router,Switch,Route,withRouter} from 'react-router-dom'
import rootReducer from './reducer';

const store = createStore(rootReducer,composeWithDevTools())

const Root = ({history,setUser}) =>{
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
      console.log(user)
      setUser(user)
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
const RootWithRouter = withRouter(connect(null,{setUser})(Root))

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
        <RootWithRouter />
    </Router>
  </Provider>
  // </React.StrictMode>,
  ,document.getElementById('root')
);

serviceWorker.unregister();
