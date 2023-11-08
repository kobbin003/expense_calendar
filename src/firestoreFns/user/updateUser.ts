import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { UserType } from "../../Reducer/userSlice";

export const updateUser = async (
	updateData: Partial<UserType>,
	docRef: string
) => {
	try {
		console.log("updateData", updateData);
		const docReference = doc(db, "users", docRef);
		await updateDoc(docReference, { ...updateData });
	} catch (error) {
		console.log("error in updating the user currency choice", error);
	}
};
