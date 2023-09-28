import { getDocs, query, where } from "firebase/firestore";
import { usersCollectionRef } from "../firebase/firebaseConfig";

export const getUser = async (email: string) => {
	try {
		const q = query(usersCollectionRef, where("email", "==", email));
		const queryDocsSnapShot = await getDocs(q);
		return queryDocsSnapShot;
	} catch (error) {
		console.error("Error finding documents:", error);
	}
};
