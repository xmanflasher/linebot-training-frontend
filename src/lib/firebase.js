// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBwQWLShC3JQlzxpSlMXZ08u85L483obzg",
  authDomain: "prodbtrainer.firebaseapp.com",
  projectId: "prodbtrainer",
  storageBucket: "prodbtrainer.firebasestorage.app",
  messagingSenderId: "804236428423",
  appId: "1:804236428423:web:d434cf9685be547d39e422",
  measurementId: "G-R2KVD00KYT"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);

export { db };
