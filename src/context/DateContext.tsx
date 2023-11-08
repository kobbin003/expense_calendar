import { createContext } from "react";

type DateContext = {
	dateSelected: Date;
	setDateSelected: React.Dispatch<React.SetStateAction<Date>>;
};

export const DateContext = createContext<DateContext>({
	dateSelected: new Date(),
	setDateSelected: () => {},
});
