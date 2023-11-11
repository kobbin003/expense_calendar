import { addMonths, subMonths } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AddExpense from "../addExpense/AddExpense";
import MonthsExpense from "../monthExpense/MonthsExpense";
import { useContext } from "react";
import { DateContext } from "../../context/DateContext";
import MonthDisplay from "../monthDisplay/MonthDisplay";

const CalendarNav = () => {
	const { dateSelected, setDateSelected } = useContext(DateContext);

	const { firestoreUserDocId } = useSelector((state: RootState) => state.user);

	const handleClickGoToPrevMonth = () => {
		const prevMonth = subMonths(dateSelected, 1);
		setDateSelected(prevMonth);
	};

	const handleClickGoToNextMonth = () => {
		const prevMonth = addMonths(dateSelected, 1);
		setDateSelected(prevMonth);
	};

	return (
		<div className="pt-9 sm:pt-0 w-full flex gap-3 justify-center items-end px-2 py-2 mb-1">
			<div className="flex justify-center items-center ">
				<button
					onClick={handleClickGoToPrevMonth}
					className="scale-125 hover:scale-150 border-none p-2 rounded-sm h-max w-max"
				>
					<img
						src="/src/assets/left.svg"
						alt=""
						className="h-3 w-3 min-h-[12px] min-w-[12px]"
					/>
				</button>
				<div className="stats shadow text-xs rounded-md">
					<div className="stat flex ">
						<div>
							<div className="stat-title">Monthly expense</div>
							<MonthDisplay />
							{firestoreUserDocId && (
								<MonthsExpense
									dateSelected={dateSelected}
									firestoreUserDocId={firestoreUserDocId}
								/>
							)}
						</div>
						<div className="stat-actions">
							<AddExpense />
						</div>
					</div>
				</div>
				<button
					onClick={handleClickGoToNextMonth}
					className="border-none p-2 rounded-sm h-max w-max scale-125 hover:scale-150"
				>
					<img
						src="/src/assets/right.svg"
						alt=""
						className="h-3 w-3 min-h-[12px] min-w-[12px]"
					/>
				</button>
			</div>
		</div>
	);
};

export default CalendarNav;
