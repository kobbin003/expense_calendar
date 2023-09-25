import { endOfMonth, getDay, getDaysInMonth, startOfMonth } from "date-fns";

export const getMonthInfo = (dateSelected: Date) => {
	const startDate = startOfMonth(dateSelected);
	const endDate = endOfMonth(dateSelected);

	const numberOfDaysInMonth = getDaysInMonth(dateSelected);

	// day of week starts from 0, like array's index
	const dayOfWeekOfstartDate = getDay(startDate);
	const dayOfWeekOfendDate = getDay(endDate);
	console.log(
		"getMonthInfo",
		dateSelected,
		dayOfWeekOfstartDate,
		dayOfWeekOfendDate,
		numberOfDaysInMonth
	);
	return {
		dayOfWeekOfstartDate,
		dayOfWeekOfendDate,
		numberOfDaysInMonth,
	};
};
