import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCyRCoMhpwQ0G-wEX5n_90r25bSGzi4bSQ",
    authDomain: "react-slack-clone-71f90.firebaseapp.com",
    databaseURL: "https://react-slack-clone-71f90.firebaseio.com",
    projectId: "react-slack-clone-71f90",
    storageBucket: "react-slack-clone-71f90.appspot.com",
    messagingSenderId: "366639559950",
    appId: "1:366639559950:web:4030c5d539e58d8123935f",
    measurementId: "G-H875KZF5DZ"
  };
  firebase.initializeApp(firebaseConfig)

export default firebase
