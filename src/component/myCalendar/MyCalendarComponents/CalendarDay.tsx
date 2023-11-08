import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { useFormatCurrency } from "../../../hook/useFormatCurrency";
import { dateToyyyyMMdd } from "../../../utils/date/date-fns/dateToyyyyMMdd";
import { isSameDay } from "date-fns";
import { useGetExpenseListByDate } from "../../../hook/useGetExpenseListByDate";

type Props = {
	date: Date;
};

const CalendarDay = ({ date }: Props) => {
	const { uid, firestoreUserDocId } = useSelector(
		(state: RootState) => state.user
	);
	const day = dateToyyyyMMdd(date);

	const now = new Date();

	const dateIsToday = isSameDay(date, now);

	const [totalExpenseForDay, setTotalExpenseForDay] = useState(0);

	const { data, isLoading } = useGetExpenseListByDate(
		day,
		firestoreUserDocId || ""
	);

	const amount = useFormatCurrency(totalExpenseForDay);

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
			to={`/in/${uid}/day/${day}`}
			className={`border border-gray-200 shadow-lg hover:scale-105 hover:bg-gray-200 p-2 ${
				dateIsToday ? "bg-gray-300" : "text-gray-800"
			} flex flex-col md:flex-row justify-between`}
		>
			<p
				className={`${
					dateIsToday ? "text-base sm:text-xl" : "text-sm sm:text-base"
				}`}
			>
				{date.getDate()}
			</p>

			<div className="flex flex-col justify-end ">
				{isLoading ? (
					<span className="loading loading-dots loading-xs"></span>
				) : (
					<span className=" text-xs md:text-sm italic">{amount}</span>
				)}
			</div>
		</Link>
	);
};

export default CalendarDay;
