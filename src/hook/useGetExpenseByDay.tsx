import {
	DocumentData,
	QuerySnapshot,
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export const useGetExpenseByDay = (day: string, userDocRef: string) => {
	const [data, setData] = useState<QuerySnapshot<
		DocumentData,
		DocumentData
	> | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);
	const expenseCollectionRef = collection(db, "users", userDocRef, "expenses");

	useEffect(() => {
		setIsLoading(true);
		const fetch = async () => {
			try {
				const q = query(expenseCollectionRef, where("expenseDay", "==", day));
				const queryDocsSnapShot = await getDocs(q);
				if (queryDocsSnapShot) {
					setIsLoading(false);
					setData(queryDocsSnapShot);
					return queryDocsSnapShot;
				}
			} catch (error) {
				console.error("Error finding documents:", error);
				setError(error);
			}
		};
		fetch();
	}, [day, userDocRef]);
	return { data, error, isLoading };
};
