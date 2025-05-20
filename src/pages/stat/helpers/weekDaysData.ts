import {
	isFriday,
	isMonday,
	isSaturday,
	isSunday,
	isThursday,
	isTuesday,
	isWednesday,
} from "date-fns";
import { weekdays } from "../../../data/weekDaysList.json";
import { Expense } from "../../../hook/useSubscribeExpense";

export const weekDaysData = (allExpenses: Expense[] | null) => {
	const expenses: { [key: string]: number | undefined } = {
		Monday: allExpenses
			?.filter((expense) => isMonday(expense.data.expenseDate.toDate()))
			.reduce((acc, { data }) => acc + data.amount, 0),
		Tuesday: allExpenses
			?.filter((expense) => isTuesday(expense.data.expenseDate.toDate()))
			.reduce((acc, { data }) => acc + data.amount, 0),
		Wednesday: allExpenses
			?.filter((expense) => isWednesday(expense.data.expenseDate.toDate()))
			.reduce((acc, { data }) => acc + data.amount, 0),
		Thursday: allExpenses
			?.filter((expense) => isThursday(expense.data.expenseDate.toDate()))
			.reduce((acc, { data }) => acc + data.amount, 0),
		Friday: allExpenses
			?.filter((expense) => isFriday(expense.data.expenseDate.toDate()))
			.reduce((acc, { data }) => acc + data.amount, 0),
		Saturday: allExpenses
			?.filter((expense) => isSaturday(expense.data.expenseDate.toDate()))
			.reduce((acc, { data }) => acc + data.amount, 0),

		Sunday: allExpenses
			?.filter((expense) => isSunday(expense.data.expenseDate.toDate()))
			.reduce((acc, { data }) => acc + data.amount, 0),
	};

	const weekDaysData = weekdays.map((day) => ({ day, amount: expenses[day] }));
	return weekDaysData;
};
