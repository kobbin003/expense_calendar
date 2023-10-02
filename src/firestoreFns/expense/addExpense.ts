import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export type ExpenseType = {
	expenseDate: Date;
	amount: number;
	description?: string;
};
export const addExpense = async (userDocRef: string, expense: ExpenseType) => {
	const userExpenseCollectionRef = collection(
		db,
		"users",
		userDocRef,
		"expenses"
	);
	try {
		const docRef = await addDoc(userExpenseCollectionRef, {
			expense,
		});
		// const docRef = await addDoc(userExpenseCollectionRef, {
		// 	...expense,
		// });
		console.log("Document written with ID: ", docRef.id);
	} catch (error) {
		console.error("Error adding document: ", error);
	}
};
