import { format } from "date-fns";
import { useContext, useEffect, useRef, useState } from "react";
import MonthSelector from "../monthselector/MonthSelector";
import { DateContext } from "../../context/DateContext";
import { useClickedOut } from "../../hook/useClickedOut";

type Props = {};

const MonthDisplay = ({}: Props) => {
	const { dateSelected, setDateSelected } = useContext(DateContext);

	// const today = getDateTimeComponents(dateSelected);
	const date = format(dateSelected, "MMMM yyyy");

	const [showMonthSelector, setShowMonthSelector] = useState(false);

	const toggleMonthSelector = () => {
		setShowMonthSelector((prev) => !prev);
	};

	const monthDisplayRef = useRef<HTMLDivElement>(null);

	useClickedOut(monthDisplayRef, () => {
		setShowMonthSelector(false);
	});

	// set dateSelected to current date while navigating back to root from other route
	useEffect(() => {
		const now = new Date();
		const nowString = format(now, "MM/yyyy");
		const dateSelectedString = format(dateSelected, "MM/yyy");
		if (nowString !== dateSelectedString) {
			setDateSelected(new Date());
		}
	}, []);

	return (
		<div className="stat-value text-base sm:text-lg md:text-xl min-w-[150px] sm:min-w-[200px]">
			<div ref={monthDisplayRef}>
				<button onClick={toggleMonthSelector}>{date}</button>
				{showMonthSelector && (
					<MonthSelector setShowMonthSelector={setShowMonthSelector} />
				)}
			</div>
		</div>
	);
};

export default MonthDisplay;
