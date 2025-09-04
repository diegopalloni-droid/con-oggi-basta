
// FIX: Use Firebase v9 compat imports to address errors from using v8 syntax with a v9+ SDK.
// FIX: The `firebase/compat/app` module requires a default import, not a namespace import, for services to attach correctly.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCN7dTihSTNn7c72aXCwzZAVk8jMzg_1uc",
  authDomain: "ririprova-e3b2e.firebaseapp.com",
  projectId: "ririprova-e3b2e",
  storageBucket: "ririprova-e3b2e.firebasestorage.app",
  messagingSenderId: "669820916198",
  appId: "1:669820916198:web:13ef3eb9c2d53a55ca4627"
};

// Inizializza Firebase solo se non è già stato fatto.
// This ensures that the app is initialized before any other code tries to use Firebase services.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Esporta le istanze dei servizi Firebase
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };