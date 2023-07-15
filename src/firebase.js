// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkd6TnlAIbyRxLfSf57iVQc9Bsnuawg_0",
  authDomain: "netflix-clone-30143.firebaseapp.com",
  projectId: "netflix-clone-30143",
  storageBucket: "netflix-clone-30143.appspot.com",
  messagingSenderId: "479913252767",
  appId: "1:479913252767:web:2bec481e42c9eb47c78faa",
  measurementId: "G-C72TDZVZJ2"
};


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  export { auth }
  export default db;
  