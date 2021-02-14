import firebase from "firebase/app";
import 'firebase/firestore';

// npm i firebase (ya instala todo, firestore incluido)
const firebaseConfig = {
    apiKey: "AIzaSyBLThY2_cmXxc5V1cDiQ4FO30ZKyfR5nb0",
    authDomain: "sql-demos-61eb5.firebaseapp.com",
    projectId: "sql-demos-61eb5",
    storageBucket: "sql-demos-61eb5.appspot.com",
    messagingSenderId: "371534913965",
    appId: "1:371534913965:web:133e6d79d96428469b0124"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log('firebase configurado');

//Agregado a mano para tener una sola referencia
export default firebase.firestore();