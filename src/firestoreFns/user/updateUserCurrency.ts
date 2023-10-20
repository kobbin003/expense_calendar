import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const updateUserCurrency = async (currency: string, docRef: string) => {
	try {
		const docReference = doc(db, "users", docRef);
		await updateDoc(docReference, { currency });
	} catch (error) {
		console.log("error in updating the user currency choice", error);
	}
};
