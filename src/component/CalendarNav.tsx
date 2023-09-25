import { addMonths, subMonths } from "date-fns";
import { getDateTimeComponents } from "../utils/date/getDateTimeComponents";
import { monthIndexConverter } from "../utils/date/monthIndexConverter";

type Props = {
	dateSelected: Date;
	setDateSelected: React.Dispatch<React.SetStateAction<Date>>;
};

const CalendarNav = ({ dateSelected, setDateSelected }: Props) => {
	const today = getDateTimeComponents(dateSelected);
	const handleClickGoToPrevMonth = () => {
		const prevMonth = subMonths(dateSelected, 1);
		setDateSelected(prevMonth);
	};
	const handleClickGoToNextMonth = () => {
		const prevMonth = addMonths(dateSelected, 1);
		setDateSelected(prevMonth);
	};
	return (
		<div className="flex">
			<button onClick={handleClickGoToPrevMonth}>left</button>
			<p>
				{today.day},&nbsp;{monthIndexConverter(today.month)}&nbsp;{today.year}
			</p>

			<button onClick={handleClickGoToNextMonth}>right</button>
		</div>
	);
};

export default CalendarNav;
