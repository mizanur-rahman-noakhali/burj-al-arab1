import  firebase from 'firebase/compat/app';
import React, { useContext } from 'react';
import 'firebase/compat/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';



const Login = () => {
  const [loggedInUser,setLoggedInUser]=useContext(UserContext);

  const history=useHistory();
  const location=useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  

  if(firebase.apps.length === 0 ){
    firebase.initializeApp(firebaseConfig);
  }


  const  handleSignIn = () => {
     var provider= new firebase.auth.GoogleAuthProvider();
     firebase.auth()
  .signInWithPopup(provider)
  .then((result) =>{
    const {displayName,email} = result.user;
    const singInUser={name:displayName,email}
    setLoggedInUser(singInUser);
    history.replace(from);
    
  })   
  .catch(error => {
    console.log(error);
    console.log(error.massage)
  })

    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleSignIn}>sign in </button>
        </div>
    );
};

export default Login;