export const getDateTimeComponents = (dateSelected: Date) => {
	return {
		day: dateSelected.getDate(),
		month: dateSelected.getMonth(),
		year: dateSelected.getFullYear(),
		hr: dateSelected.getHours(),
		min: dateSelected.getMinutes(),
		sec: dateSelected.getSeconds(),
	};
};
