// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "divulge-blog.firebaseapp.com",
  projectId: "divulge-blog",
  storageBucket: "divulge-blog.appspot.com",
  messagingSenderId: "727270245085",
  appId: "1:727270245085:web:a769352fea229c2da99134"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

