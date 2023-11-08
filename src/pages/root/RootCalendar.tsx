import CalendarNav from "../../component/calendarNav/CalendarNav";
import MyCalendar from "../../component/myCalendar/MyCalendar";

type Props = {};

const RootCalendar = ({}: Props) => {
	return (
		<>
			<CalendarNav />
			<MyCalendar />
		</>
	);
};

export default RootCalendar;
