import {
	DocumentData,
	DocumentReference,
	addDoc,
	collection,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { ExpenseType } from "../firestoreFns/expense/addExpense";

const useAddExpense = (userDocRef: string, expense: ExpenseType) => {
	const [data, setData] = useState<DocumentReference<
		DocumentData,
		DocumentData
	> | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState<any>(null);

	useEffect(() => {
		setIsLoading(true);
		const fetch = async () => {
			try {
				const userExpenseCollectionRef = collection(
					db,
					"users",
					userDocRef,
					"expenses"
				);
				const docRef = await addDoc(userExpenseCollectionRef, {
					...expense,
				});
				if (docRef) {
					setIsLoading(false);
					setData(docRef);
					return docRef;
				}
			} catch (error) {
				console.error("Error finding documents:", error);
				setError(error);
			}
		};
		fetch();
	}, [expense, userDocRef]);
	return { data, error, isLoading };
};

export default useAddExpense;
