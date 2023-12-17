import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC0iR2c4apKBxOH7COpRlTH_N5x_LiSRto",
    authDomain: "fctrestaurantapp.firebaseapp.com",
    projectId: "fctrestaurantapp",
    storageBucket: "fctrestaurantapp.appspot.com",
    messagingSenderId: "533021490373",
    appId: "1:533021490373:web:aa0a312352689f895b04ac"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GithubAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };