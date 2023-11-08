import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { ExpenseType } from "../../types/expense";

export const addExpense = async (userDocId: string, expense: ExpenseType) => {
	const userExpenseCollectionRef = collection(
		db,
		"users",
		userDocId,
		"expenses"
	);
	try {
		const docRef = await addDoc(userExpenseCollectionRef, {
			...expense,
		});

		console.log("Document written with ID: ", docRef);
	} catch (error) {
		console.error("Error adding document: ", error);
	}
};
