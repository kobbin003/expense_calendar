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
// type UpdateParam = {
// 	field: "currency" | "photoURL";
// 	value: string;
// };

// export const updateUser = async (updateData: UpdateParam, docRef: string) => {
// 	try {
// 		const docReference = doc(db, "users", docRef);
// 		await updateDoc(docReference, { [updateData.field]: updateData.value });
// 	} catch (error) {
// 		console.log("error in updating the user currency choice", error);
// 	}
// };
