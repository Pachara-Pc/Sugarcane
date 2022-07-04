// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getDatabase} from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "-------",
  authDomain: "sugarcanearduino.firebaseapp.com",
  databaseURL: "https://sugarcanearduino-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sugarcanearduino",
  storageBucket: "sugarcanearduino.appspot.com",
  messagingSenderId: "956567076943",
  appId: "1:956567076943:web:117b4533673f9d902eaa3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app