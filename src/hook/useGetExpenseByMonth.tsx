import { collection, getDocs, query, where } from "firebase/firestore";

import { useEffect, useState } from "react";

import { db } from "../firebase/firebaseConfig";
import { lastDayOfMonth, startOfMonth } from "date-fns";

export const useGetExpenseByMonth = (targetDate: Date, userDocId: string) => {
	const [data, setData] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		const startDate = startOfMonth(targetDate);
		const lastDate = lastDayOfMonth(targetDate);
		if (userDocId) {
			const fetch = async () => {
				// loading started
				setIsLoading(true);
				const expenseCollectionRef = collection(
					db,
					"users",
					userDocId,
					"expenses"
				);
				try {
					const q = query(
						expenseCollectionRef,
						where("expenseDate", ">=", startDate),
						where("expenseDate", "<=", lastDate)
					);
					const queryDocsSnapShot = await getDocs(q);
					if (queryDocsSnapShot) {
						// add up all the items amount
						const expenses = queryDocsSnapShot?.docs.map(
							(expense) => expense.data().amount
						);

						if (expenses && expenses.length > 0) {
							const totalExpense = expenses.reduce((total, amount) => {
								return total + amount;
							}, 0);
							setIsLoading(false);
							setData(totalExpense);
						} else {
							setIsLoading(false);
							setData(0);
						}
					}
				} catch (error) {
					setIsLoading(false);
					setError(error);
					console.error("Error finding documents:", error);
				}
			};

			fetch();
		}
	}, [targetDate, userDocId]);

	return { data, error, isLoading };
};
