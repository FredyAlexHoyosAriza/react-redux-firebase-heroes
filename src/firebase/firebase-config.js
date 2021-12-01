// importaciones de compatibilidad traidas de:
// https://firebase.google.com/docs/web/modular-upgrade
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Configuracion traida del proyecto creado en firebase:
// https://console.firebase.google.com/project/react-heroes-auth/overview?hl=es
// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyB3TgSPsBRw7FQ2jmjAPasOAU14bnoQSR0",
    authDomain: "react-heroes-auth.firebaseapp.com",
    projectId: "react-heroes-auth",
    storageBucket: "react-heroes-auth.appspot.com",
    messagingSenderId: "943072393696",
    appId: "1:943072393696:web:af463249de653598c21385"
};
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Puesto que no usaremos initializeApp que se importa desde firebase/app sino
// firebase que se importa desde firebase/compat/app donde el compat indica
// compatibilidad, entonces, la linea en el comentario anterior se reemplaza con:
firebase.initializeApp(firebaseConfig); // Ahora nuestro firebase esta operativo

// Ahora creamos nuestro base de datos usando el filestore de firebase
const db = firebase.firestore();
// Creamos un nuevo objeto de la clase GoogleAuthProvider que nos entrega firebase
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Ahora tanto db como googleAuthProvider son exportados para que puedan ser
// usados en otros componentes
export { firebase, db, googleAuthProvider };

