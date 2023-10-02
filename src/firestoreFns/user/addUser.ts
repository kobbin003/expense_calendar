import { addDoc } from "firebase/firestore";
import { usersCollectionRef } from "../../firebase/firebaseConfig";
import { UserType } from "../../Reducer/userSlice";

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
