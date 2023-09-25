export const mutedItemsCalendarBefore = (
	numberOfDaysInPrevMonth: number,
	dayOfWeekOfstartDate: number
) => {
	let mutedItemsBefore = [];
	const start = numberOfDaysInPrevMonth - (dayOfWeekOfstartDate - 1); // dayOfWeekOfstartDate starts from 0
	const end = numberOfDaysInPrevMonth;
	for (let i = start; i <= end; i++) {
		mutedItemsBefore.push(i);
	}
	return mutedItemsBefore;
};
