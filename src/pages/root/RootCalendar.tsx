import { useState } from "react";
import CalendarNav from "../../component/calendarNav/CalendarNav";
import MyCalendar from "../../component/myCalendar/MyCalendar";

type Props = {};

const RootCalendar = ({}: Props) => {
	const now = new Date();

	const [dateSelected, setDateSelected] = useState<Date>(now);

	return (
		<>
			<CalendarNav
				dateSelected={dateSelected}
				setDateSelected={setDateSelected}
			/>
			<MyCalendar dateSelected={dateSelected} />
		</>
	);
};

export default RootCalendar;
