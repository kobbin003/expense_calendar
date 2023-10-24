import { QueryDocumentSnapshot } from "firebase/firestore";
import { format } from "date-fns";
import { DaysExpenseList } from "./DaysExpenseList";
import { ExpenseType } from "../../types/expense";

type Props = {
	expenses: QueryDocumentSnapshot[];
};

const DaysExpenseLists = ({ expenses }: Props) => {
	return (
		<div>
			<ul className="list-none">
				{expenses.length > 0 ? (
					expenses.map((item) => {
						const expense = item.data() as ExpenseType;
						const time = format(
							item.data().expenseDate.toDate(),
							"hh: mm b"
							// "hh'hr':mm'min':ss'sec' b"
						);
						return (
							<DaysExpenseList
								key={item.id}
								expense={expense}
								time={time}
							/>
						);
					})
				) : (
					<p>No expenses made on this day</p>
				)}
			</ul>
		</div>
	);
};

export default DaysExpenseLists;
