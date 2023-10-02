import { getDocs } from "firebase/firestore";
import { usersCollectionRef } from "../firebase/firebaseConfig";

export async function getAllUsers() {
	try {
		const allDocsSnap = await getDocs(usersCollectionRef);
		return allDocsSnap;
	} catch (error) {
		console.error("Error getting all documents: ", error);
	}
}
