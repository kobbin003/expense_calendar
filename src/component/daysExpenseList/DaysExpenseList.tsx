import { QueryDocumentSnapshot } from "firebase/firestore";
import { format } from "date-fns";

type Props = {
	expenses: QueryDocumentSnapshot[];
};

const DaysExpenseList = ({ expenses }: Props) => {
	/** fetch all the expenses for current day */
	return (
		<div>
			<ul className="list-none">
				{expenses.length > 0 ? (
					expenses.map((item) => {
						const expense = item.data();
						const time = format(
							expense.expenseDate.toDate(),
							"hh: mm b"
							// "hh'hr':mm'min':ss'sec' b"
						);
						return (
							<li
								key={item.id}
								className="border-b-2 w-max"
							>
								you spent {expense.amount} on {expense.description} at {time}
							</li>
						);
					})
				) : (
					<p>No expenses made on this day</p>
				)}
			</ul>
		</div>
	);
};

export default DaysExpenseList;
