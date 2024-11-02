import {getAuth} from "firebase/auth"
import { initializeApp } from "firebase/app"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAUguRt5DdB9Zi8Z3j6XnAO22qIbRGMoFA",
  authDomain: "wall-e-6974f.firebaseapp.com",
  projectId: "wall-e-6974f",
  storageBucket: "wall-e-6974f.appspot.com",
  messagingSenderId: "176515011699",
  appId: "1:176515011699:web:b626ed6ee4e9f81a264606"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
export default app;