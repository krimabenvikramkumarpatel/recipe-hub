import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALItEW_AXXbYdGAftK80NCOdRHf3-kERA",
  authDomain: "recipe-hub-c9411.firebaseapp.com",
  projectId: "recipe-hub-c9411",
  storageBucket: "recipe-hub-c9411.firebasestorage.app",
  messagingSenderId: "883742289651",
  appId: "1:883742289651:web:c35fdbed2dbff43983d186"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);