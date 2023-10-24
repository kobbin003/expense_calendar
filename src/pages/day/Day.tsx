import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useGetExpenseByDay } from "../../hook/useGetExpenseByDay";
import { useFormatCurrency } from "../../hook/useFormatCurrency";
import DaysExpenseLists from "../../component/daysExpenseList/DaysExpenseLists";

type Props = {};

const Day = ({}: Props) => {
	const { firestoreUserDocId } = useSelector((state: RootState) => state.user);

	const { user, day } = useParams();

	const [expenses, setExpenses] = useState<QueryDocumentSnapshot[] | []>([]);

	const [totalExpenseForDay, setTotalExpenseForDay] = useState(0);

	const { data, error, isLoading } = useGetExpenseByDay(
		day || "",
		firestoreUserDocId || ""
	);

	const totalExpenseForDayWithCurrency = useFormatCurrency(totalExpenseForDay);

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
			<Link to={`/in/${user}`}>Calendar</Link>

			<div className="flex justify-between w-max">
				<p>Total:{totalExpenseForDayWithCurrency}</p>
			</div>
			<DaysExpenseLists expenses={expenses} />
		</div>
	);
};

export default Day;
