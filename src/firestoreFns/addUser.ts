import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { UserType } from "../Reducer/userSlice";

export const usersCollectionRef = collection(db, "users");

export async function addUser(prop: UserType) {
	try {
		const docRef = await addDoc(usersCollectionRef, {
			...prop,
		});
		console.log("Document written with ID: ", docRef.id);
	} catch (error) {
		console.error("Error adding document: ", error);
	}
}
