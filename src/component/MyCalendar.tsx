import { FC } from "react";
import { mutedItemBeforeFn } from "../utils/mutedItemsBeforeFn";
import { mutedItemsAfterFn } from "../utils/mutedItemsAfterFn";
import { getAlldaysOfMonth } from "../utils/date/date-fns/getAlldaysOfMonth";
import CalendarDay from "./CalendarDay";
import { getMonthInfo } from "../utils/date/date-fns/getMonthInfo";
import { subMonths } from "date-fns";

export const weekDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

type CalendarType = {
	dateSelected: Date;
};

const MyCalendar: FC<CalendarType> = ({ dateSelected }) => {
	const { dayOfWeekOfstartDate, dayOfWeekOfendDate } =
		getMonthInfo(dateSelected);

	const allDaysOfMonth = getAlldaysOfMonth(dateSelected);

	const previousMonthDate = subMonths(dateSelected, 1);

	const { numberOfDaysInMonth: numberOfDaysInPrevMonth } =
		getMonthInfo(previousMonthDate);

	const mutedItemsBefore = mutedItemBeforeFn(
		numberOfDaysInPrevMonth,
		dayOfWeekOfstartDate
	);

	const mutedItemsAfter = mutedItemsAfterFn(dayOfWeekOfendDate);

	return (
		<div className="grid grid-cols-7 auto-rows-fr  bg-yellow-400 w-screen h-screen">
			{weekDays.map((item, index) => (
				<CalendarDay
					content={item}
					key={item + index}
				/>
			))}

			{mutedItemsBefore.map((item, index) => {
				return (
					<CalendarDay
						content={item}
						key={item + index}
					/>
				);
			})}
			{allDaysOfMonth.map((day) => {
				return (
					<CalendarDay
						content={day.getDate()}
						key={day.toUTCString()}
					/>
				);
			})}
			{mutedItemsAfter.map((item, index) => {
				return (
					<CalendarDay
						content={item}
						key={item + index}
					/>
				);
			})}
		</div>
	);
};

export default MyCalendar;
