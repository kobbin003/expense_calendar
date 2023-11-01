import { addMonths, subMonths } from "date-fns";
import { getDateTimeComponents } from "../../utils/date/getDateTimeComponents";
import { monthIndexConverter } from "../../utils/date/monthIndexConverter";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AddExpense from "../addExpense/AddExpense";
import MonthsExpense from "./MonthsExpense";

type Props = {
	dateSelected: Date;
	setDateSelected: React.Dispatch<React.SetStateAction<Date>>;
};

const CalendarNav = ({ dateSelected, setDateSelected }: Props) => {
	const today = getDateTimeComponents(dateSelected);
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
					className="bg-gray-200/80 hover:bg-gray-200 border-none p-2 rounded-sm h-max w-max"
				>
					<img
						src="/src/assets/navLeft.svg"
						alt=""
						className="h-3 w-3 min-h-[12px] min-w-[12px]"
					/>
				</button>
				<div className="stats shadow text-xs rounded-md">
					<div className="stat flex ">
						<div>
							<div className="stat-title">Monthly expense</div>
							<div className="stat-value text-base sm:text-lg md:text-xl min-w-[150px] sm:min-w-[200px]">
								{monthIndexConverter(today.month)}&nbsp;{today.year}
							</div>

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
					className="bg-gray-200/80 hover:bg-gray-200 border-none p-2 rounded-sm h-max w-max"
				>
					<img
						src="/src/assets/navRight.svg"
						alt=""
						className="h-3 w-3 min-h-[12px] min-w-[12px]"
					/>
				</button>
			</div>
		</div>
	);
};

export default CalendarNav;
