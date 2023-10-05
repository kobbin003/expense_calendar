import { parse } from "date-fns";

export const stringToDate = (dateString: string, dateFormat: string) => {
	return parse(dateString, dateFormat, new Date());
	// return parse("20141102", "yyyymmdd", new Date());
};
