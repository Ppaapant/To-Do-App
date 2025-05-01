import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { initializeFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAbFPyQ982KBl3ZhenFnXmKSG4vatF1Cw",
  authDomain: "to-do-5264a.firebaseapp.com",
  projectId: "to-do-5264a",
  storageBucket: "to-do-5264a.appspot.com",
  messagingSenderId: "753560073642",
  appId: "1:753560073642:web:06efbc21478a369e9ce7d3",
  measurementId: "G-7G5WX2MP9K",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

const db: Firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const auth: Auth = getAuth(app);

export { db, auth };
