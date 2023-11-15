import {
	DocumentData,
	collection,
	onSnapshot,
	query,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
export type Expense = {
	id: string;
	data: DocumentData;
};
export const useSubscribeExpense = (userDocId: string) => {
	const [allExpenses, setAllExpenses] = useState<Expense[] | null>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (userDocId) {
			const userExpenseCollectionRef = collection(
				db,
				"users",
				userDocId,
				"expenses"
			);

			const q = query(userExpenseCollectionRef);
			// const queryDocsSnapShot = await getDocs(q);

			const unsubscribe = onSnapshot(q, (querySnapShot) => {
				setIsLoading(true);
				const expenses = querySnapShot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}));

				if (expenses) {
					setIsLoading(false);
					setAllExpenses(expenses);
				}
			});

			return () => unsubscribe();
		}
	}, [userDocId]);

	return { allExpenses, isLoading };
};
