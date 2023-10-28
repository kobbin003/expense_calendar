import { format } from "date-fns";

export const dateToyyyyMMdd = (date: Date) => {
	return format(date, "yyyyMMdd");
};
