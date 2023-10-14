import { Link, useParams } from "react-router-dom";
import DaysExpenseList from "../../component/daysExpenseList/DaysExpenseList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useGetExpenseByDay } from "../../hook/useGetExpenseByDay";

type Props = {};

const Day = ({}: Props) => {
	const { firestoreUserDocRef } = useSelector((state: RootState) => state.user);

	const { user, day } = useParams();

	const [expenses, setExpenses] = useState<QueryDocumentSnapshot[] | []>([]);

	const [totalExpenseForDay, setTotalExpenseForDay] = useState(0);

	const { data, error, isLoading } = useGetExpenseByDay(
		day || "",
		firestoreUserDocRef || ""
	);

	useEffect(() => {
		let total = 0;
		data?.forEach((item) => {
			const expense = item.data();
			total += expense.amount;
		});
		setTotalExpenseForDay(total);
		if (data) {
			setExpenses(data?.docs);
		}
	}, [data]);

	if (isLoading)
		return <span className="loading loading-dots loading-sm"></span>;

	if (error) return <p>could not fetch the expenses.</p>;

	return (
		<div>
			<Link to={`/${user}`}>Calendar</Link>

			<div className="flex justify-between w-max">
				<p>Total: {totalExpenseForDay}</p>
			</div>
			<DaysExpenseList expenses={expenses} />
		</div>
	);
};

export default Day;
