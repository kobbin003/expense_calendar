import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { dateToString } from "../../../utils/date/date-fns/dateToString";
import { useGetExpenseByDay } from "../../../hook/useGetExpenseByDay";
import { useEffect, useState } from "react";

type Props = {
	date: Date;
};

const CalendarDay = ({ date }: Props) => {
	const { uid, firestoreUserDocRef } = useSelector(
		(state: RootState) => state.user
	);

	const param = dateToString(date);

	const now = dateToString(new Date());

	const dateIsToday = now == dateToString(date);

	const [totalExpenseForDay, setTotalExpenseForDay] = useState(0);

	const { data, isLoading } = useGetExpenseByDay(
		param || "",
		firestoreUserDocRef || ""
	);

	useEffect(() => {
		let total = 0;
		data?.forEach((item) => {
			const expense = item.data();
			total += expense.amount;
		});
		setTotalExpenseForDay(total);
	}, [data]);

	return (
		<Link
			to={`/${uid}/${param}`}
			className={`border border-gray-200 shadow-lg hover:scale-105 hover:bg-gray-200 p-2 ${
				dateIsToday ? "bg-gray-200" : "text-gray-800"
			} flex flex-col md:flex-row justify-between`}
		>
			<p className={`${dateIsToday ? " text-3xl sm:text-4xl" : ""}`}>
				{date.getDate()}
			</p>

			<div className="flex flex-col justify-end">
				{isLoading ? (
					<span className="loading loading-dots loading-xs"></span>
				) : (
					<span>{totalExpenseForDay}</span>
				)}
			</div>
		</Link>
	);
};

export default CalendarDay;
