import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore"; 


const firebaseConfig = {
    apiKey: "AIzaSyAAbFPyQ982KBl3ZhenFnXmKSG4vatF1Cw",
    authDomain: "to-do-5264a.firebaseapp.com",
    projectId: "to-do-5264a",
    storageBucket: "to-do-5264a.appspot.com", 
    messagingSenderId: "753560073642",
    appId: "1:753560073642:web:06efbc21478a369e9ce7d3",
    measurementId: "G-7G5WX2MP9K"
  };
  
  
  const app = initializeApp(firebaseConfig);
  
  const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false, 
  });

export { db };
export const auth = getAuth(app);