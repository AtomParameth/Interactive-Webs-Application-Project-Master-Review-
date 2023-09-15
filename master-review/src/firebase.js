// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClyIOC1832ZD5qOwn379GgVdiPqi9fRSc",
    authDomain: "login-master-review.firebaseapp.com",
    projectId: "login-master-review",
    storageBucket: "login-master-review.appspot.com",
    messagingSenderId: "282529479640",
    appId: "1:282529479640:web:d2f6d71baacbf327ac10ad",
    measurementId: "G-ED1ZQEKSB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


