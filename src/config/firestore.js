import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM6n-dS3qEzKjf4r3QhjG8rkLQbgkuw3s",
  authDomain: "ipso-anime.firebaseapp.com",
  projectId: "ipso-anime",
  storageBucket: "ipso-anime.appspot.com",
  messagingSenderId: "881110590191",
  appId: "1:881110590191:web:b2728274221770b07a711a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };