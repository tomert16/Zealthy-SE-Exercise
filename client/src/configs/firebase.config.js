import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

//Project's firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxXJCuEHJ11KBzSQjLComJvFjGN-EoOh8",
    authDomain: "zealthy-help-desk.firebaseapp.com",
    projectId: "zealthy-help-desk",
    storageBucket: "zealthy-help-desk.appspot.com",
    messagingSenderId: "483151450962",
    appId: "1:483151450962:web:f073230af969dfb79de08b"
  };

  //initialize Firebase
  const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);