import { useFormatCurrency } from "../../hook/useFormatCurrency";
import { ExpenseType } from "../../types/expense";

type Props = {
	expense: ExpenseType;
	time: string;
};

export const DaysExpenseList = ({ expense, time }: Props) => {
	const expenseAmountWithCurrency = useFormatCurrency(expense.amount);
	return (
		<li className="border-b-2 w-max p-1 mb-2 text-sm sm:text-base text-gray-500">
			you spent{" "}
			<span className="italic font-medium text-black">
				{expenseAmountWithCurrency}
			</span>{" "}
			on <span className="font-medium text-black">{expense.description}</span>{" "}
			at <span className="font-medium text-black">{time}</span>
		</li>
	);
};
