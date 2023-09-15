import React from "react";
import "./SigninStyle.css";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import logo from "./images/logo-roject.svg";
import { Link } from "react-router-dom";
import closeBtn from "./images/close-button-default.svg"
import googleLogo from './images/googleLogo.svg'


const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

function SigninPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  console.log(user);

  return (
    <>
      {/* <Navbar /> */}
      <div className="background">
        <div className="google-border">
            <div className="move-close-button">
                <Link to='/'>
                <button className="close-button"><img src={closeBtn} alt="close button"/></button>
                </Link>
            </div>
          <img
            className="master-logo"
            width="125"
            src={logo}
            alt="Master Review Logo"
          />
          <h3 className="title">Login with Google Account</h3>
          <p className="paragraph">
            Welcome to join us! Please click on the button below to Sign-in to
            Master Review with your Google Account
          </p>
          {user ? (
            <div>
              <img src={user.photoURL} alt="User" />
              <p>Welcome, {user.displayName}!</p>
              <button onClick={() => auth.signOut()}>Sign out</button>
            </div>
          ) : (
            <div className="move-google-button">
              <button  className="google-button" onClick={signInWithGoogle}><img className='google-logo-img'src={googleLogo} alt="google logo"/>Sign in with Google</button>
            </div>
          )}
        <button className="need-help">Need Help?</button>
        </div>
      </div>
    </>
  );
}

export default SigninPage;
