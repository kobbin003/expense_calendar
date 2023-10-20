import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const getExpenseByDay = async (day: string, userDocRef: string) => {
	const expenseCollectionRef = collection(db, "users", userDocRef, "expenses");
	try {
		const q = query(expenseCollectionRef, where("expenseDay", "==", day));
		const queryDocsSnapShot = await getDocs(q);
		if (queryDocsSnapShot) {
			return queryDocsSnapShot;
		}
	} catch (error) {
		console.error("Error finding documents:", error);
	}
};
