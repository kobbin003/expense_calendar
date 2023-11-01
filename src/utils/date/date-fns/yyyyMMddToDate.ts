import { parse } from "date-fns";

export const yyyyMMddToDate = (dateString: string, format = "yyyyMMdd") => {
	return parse(dateString, format, new Date());
};
