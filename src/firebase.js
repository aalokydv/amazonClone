import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // Import Firestore
import "firebase/compat/auth"; // Import Auth
// import firebase from firebase;

const firebaseConfig = {
    apiKey: "AIzaSyBg_Ll76_asKL7Na69ibCZWlXSeMwivVo4",
    authDomain: "clone-c5424.firebaseapp.com",
    projectId: "clone-c5424",
    storageBucket: "clone-c5424.appspot.com",
    messagingSenderId: "450299652582",
    appId: "1:450299652582:web:1ce656a58b2953358c8e27",
    measurementId: "G-TQRZPGY5VL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
