import { useContext } from "react";
import { mutedItemsCalendarBefore } from "../../utils/mutedItemsCalendarBefore";
import { mutedItemsCalendarAfter } from "../../utils/mutedItemsCalendarAfter";
import { getAlldaysOfMonth } from "../../utils/date/date-fns/getAlldaysOfMonth";
import CalendarDay from "./MyCalendarComponents/CalendarDay";
import { getMonthInfo } from "../../utils/date/date-fns/getMonthInfo";
import { subMonths } from "date-fns";
import CalendarDayHeader from "./MyCalendarComponents/CalendarDayHeader";
import MutedCalendarDay from "./MyCalendarComponents/MutedCalendarDay";
import { DateContext } from "../../context/DateContext";
import { weekdays } from "../../data/weekDaysList.json";

// export const weekDays = [
// 	"Sunday",
// 	"Monday",
// 	"Tuesday",
// 	"Wednesday",
// 	"Thursday",
// 	"Friday",
// 	"Saturday",
// ];

const MyCalendar = () => {
	const { dateSelected } = useContext(DateContext);

	const { dayOfWeekOfstartDate, dayOfWeekOfendDate } =
		getMonthInfo(dateSelected);

	const allDaysOfMonth = getAlldaysOfMonth(dateSelected);

	const previousMonthDate = subMonths(dateSelected, 1);

	const { numberOfDaysInMonth: numberOfDaysInPrevMonth } =
		getMonthInfo(previousMonthDate);

	const mutedItemsBefore = mutedItemsCalendarBefore(
		numberOfDaysInPrevMonth,
		dayOfWeekOfstartDate
	);

	const mutedItemsAfter = mutedItemsCalendarAfter(dayOfWeekOfendDate);

	return (
		<div className="flex flex-col flex-1 h-5/6 ">
			<div className="grid grid-cols-7">
				{weekdays.map((item, index) => (
					<CalendarDayHeader content={item} key={item + index} />
				))}
			</div>
			<div className="flex-1 grid grid-cols-7 auto-rows-auto ">
				{mutedItemsBefore.map((item, index) => {
					return <MutedCalendarDay content={item} key={item + index} />;
				})}

				{allDaysOfMonth.map((day) => {
					return <CalendarDay date={day} key={day.toUTCString()} />;
				})}

				{mutedItemsAfter.map((item, index) => {
					return <MutedCalendarDay content={item} key={item + index} />;
				})}
			</div>
		</div>
	);
};

export default MyCalendar;
