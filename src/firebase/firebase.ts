import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestoreをインポート
import { getAuth } from "firebase/auth"; // Firebase Authenticationをインポート

const firebaseConfig = {
  apiKey: "AIzaSyC_p8eT1sa7oC--wL7e4xeB9eB6gV4Iycw",
  authDomain: "work-record-app.firebaseapp.com",
  databaseURL:
    "https://work-record-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "work-record-app",
  storageBucket: "work-record-app.appspot.com",
  messagingSenderId: "762471170468",
  appId: "1:762471170468:web:c29d779c4249eb569fc131",
  measurementId: "G-221JZHLWZN",
};

// Firebaseを初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestoreのインスタンスを取得
const auth = getAuth(app); // Firebase Authenticationのインスタンスを取得

// 必要に応じてFirebaseのサービスを初期化
// const analytics = getAnalytics(app);

export { app, db, auth };
