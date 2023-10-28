import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { lastDayOfMonth, startOfMonth } from "date-fns";
import { dateToyyyyMMdd } from "../../utils/date/date-fns/dateToyyyyMMdd";

export const getExpensesByMonth = async (
	targetDate: Date,
	userDocId: string
) => {
	const startDate = startOfMonth(targetDate);
	const lastDate = lastDayOfMonth(targetDate);
	const startDateyyyyMMdd = dateToyyyyMMdd(startDate);
	const lastDateyyyyMMdd = dateToyyyyMMdd(lastDate);
	const expenseCollectionRef = collection(db, "users", userDocId, "expenses");
	try {
		const q = query(
			expenseCollectionRef,
			where("expenseDay", ">=", startDateyyyyMMdd),
			where("expenseDay", "<=", lastDateyyyyMMdd)
		);
		const queryDocsSnapShot = await getDocs(q);
		if (queryDocsSnapShot) {
			return queryDocsSnapShot;
		}
	} catch (error) {
		console.error("Error finding documents:", error);
	}
};
