import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useFormatCurrency } from "../../hook/useFormatCurrency";
import DaysExpenseLists from "../../component/daysExpenseList/DaysExpenseLists";
import { useGetExpenseListByDate } from "../../hook/useGetExpenseListByDate";
import Loader from "../../component/loader/Loader";
import { yyyyMMddToDate } from "../../utils/date/date-fns/yyyyMMddToDate";
import { format } from "date-fns";

const Day = () => {
	const { firestoreUserDocId } = useSelector((state: RootState) => state.user);

	const { user, day } = useParams();
	const date = yyyyMMddToDate(day || "");
	const d = format(date, "do").slice(0, -2);
	const dateSuffix = format(date, "do").slice(-2);
	const my = format(date, "MMMM',' yyyy");
	// console.log(d, dateSuffix, my);
	const [expenses, setExpenses] = useState<QueryDocumentSnapshot[] | []>([]);

	const [totalExpenseForDay, setTotalExpenseForDay] = useState(0);

	const { data, error, isLoading } = useGetExpenseListByDate(
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

	if (isLoading) return <Loader />;

	if (error) return <p>could not fetch the expenses.</p>;

	return (
		<div className="flex flex-col p-2">
			<Link to={`/in/${user}`} className="">
				<img
					src="/goBack.svg"
					alt=""
					className="h-7 p-2  hover:scale-105 border border-gray-500/50 rounded-sm shadow"
				/>
			</Link>

			<div className="stats shadow w-max rounded-md my-6 stats-vertical sm:stats-horizontal">
				<div className="stat flex items-center">
					<img src="/calendar.svg" alt="" className="h-6" />
					<div className="stat-desc text-sm sm:text-base text-black drop-shadow-lg">
						<span>{d}</span>
						<span className="text-xs">{dateSuffix}&nbsp;</span>
						<span>{my}</span>
					</div>
				</div>
				<div className="stat flex items-center">
					<div className="stat-title text-base">Total:</div>
					<div className="stat-value text-base sm:text-lg md:text-xl ">
						<span className="italic">{totalExpenseForDayWithCurrency}</span>
					</div>
				</div>
			</div>
			<DaysExpenseLists expenses={expenses} />
		</div>
	);
};

export default Day;
