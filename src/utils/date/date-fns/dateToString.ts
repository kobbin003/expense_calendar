import { format } from "date-fns";

export const dateToString = (date: Date) => {
	return format(date, "yyyyMMdd");
};
