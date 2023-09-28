import { getDateTimeComponents } from "./getDateTimeComponents";

export const dateToParamsConverter = (date: Date) => {
	const dateComps = getDateTimeComponents(date);
	return `${dateComps.day}${dateComps.month}${dateComps.year}`;
};
