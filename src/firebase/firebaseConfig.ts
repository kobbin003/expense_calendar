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
	apiKey: "AIzaSyC-GowMxe3fr89nE1W5G6-qd7dwLq5V0Ew",
	authDomain: "expense-calendar-8fc9f.firebaseapp.com",
	projectId: "expense-calendar-8fc9f",
	storageBucket: "expense-calendar-8fc9f.appspot.com",
	messagingSenderId: "1009804816042",
	appId: "1:1009804816042:web:e87a3914252f9ec838aad3",
	measurementId: "G-50D1CWHPRF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const storage = getStorage(app);

export const usersCollectionRef = collection(db, "users");
