// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: "AIzaSyCbNrhldGK1q1Ioar7-hGBKJoOMlPqRZCA",
	authDomain: "expense-calendar-3edea.firebaseapp.com",
	projectId: "expense-calendar-3edea",
	storageBucket: "expense-calendar-3edea.appspot.com",
	messagingSenderId: "488376108034",
	appId: "1:488376108034:web:2405eda8fd18f6150d131b",
	measurementId: "G-RTEN8543CF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const storage = getStorage(app);

export const usersCollectionRef = collection(db, "users");
