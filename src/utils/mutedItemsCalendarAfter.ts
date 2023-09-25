export const mutedItemsCalendarAfter = (dayOfWeekOfendDate: number) => {
	let mutedItemsAfter = [];
	const numOfItemsAfter = 7 - (dayOfWeekOfendDate + 1);
	for (let i = 0; i < numOfItemsAfter; i++) {
		mutedItemsAfter.push(i + 1);
	}
	return mutedItemsAfter;
};
