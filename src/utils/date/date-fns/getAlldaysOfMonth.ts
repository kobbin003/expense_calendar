import { eachDayOfInterval, endOfMonth, startOfMonth } from "date-fns";

export function getAlldaysOfMonth(dateSelected: Date) {
	const startDate = startOfMonth(dateSelected); // Get the first day of the current month
	const endDate = endOfMonth(dateSelected);
	// Get all the days of the current month as an array
	const allDaysOfMonth = eachDayOfInterval({
		start: startDate,
		end: endDate,
	});

	return allDaysOfMonth;
	// Now, allDaysOfMonth will contain an array of Date objects representing all the days of the current month
}
