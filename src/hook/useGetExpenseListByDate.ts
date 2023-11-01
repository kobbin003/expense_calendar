import {
	DocumentData,
	QuerySnapshot,
	collection,
	doc,
	getDocs,
	orderBy,
	query,
	where,
} from "firebase/firestore";

import { useEffect, useState } from "react";

import { db } from "../firebase/firebaseConfig";
import { endOfDay, startOfDay } from "date-fns";
import { yyyyMMddToDate } from "../utils/date/date-fns/yyyyMMddToDate";

export const useGetExpenseListByDate = (
	day: string,
	firestoreUserDocId: string
) => {
	const [data, setData] = useState<QuerySnapshot<
		DocumentData,
		DocumentData
	> | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState<any>(null);

	useEffect(() => {
		if (firestoreUserDocId && day) {
			// format dayString to Date
			const date = yyyyMMddToDate(day);

			const startOfDate = startOfDay(date);
			const endOfDate = endOfDay(date);
			const userDocRef = doc(db, "users", firestoreUserDocId);
			const expenseCollectionRef = collection(userDocRef, "expenses");

			setIsLoading(true);

			const fetch = async () => {
				try {
					const q = query(
						expenseCollectionRef,
						where("expenseDate", ">=", startOfDate),
						where("expenseDate", "<=", endOfDate),
						orderBy("expenseDate", "asc")
					);
					const queryDocsSnapShot = await getDocs(q);
					if (queryDocsSnapShot) {
						setIsLoading(false);
						setData(queryDocsSnapShot);
					}
				} catch (error) {
					console.error("Error finding documents:", error);
					setError(error);
				}
			};
			fetch();
		}
	}, [day, firestoreUserDocId]);
	return { data, error, isLoading };
};
