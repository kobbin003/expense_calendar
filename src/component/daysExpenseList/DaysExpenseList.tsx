import { useFormatCurrency } from "../../hook/useFormatCurrency";
import { ExpenseType } from "../../types/expense";

type Props = {
	expense: ExpenseType;
	time: string;
};

export const DaysExpenseList = ({ expense, time }: Props) => {
	const expenseAmountWithCurrency = useFormatCurrency(expense.amount);
	return (
		<li className="border-b-2 w-max">
			you spent {expenseAmountWithCurrency} on {expense.description} at {time}
		</li>
	);
};
