import { QueryDocumentSnapshot } from "firebase/firestore";
import { format } from "date-fns";
import { DaysExpenseList } from "./DaysExpenseList";
import { ExpenseType } from "../../types/expense";

type Props = {
	expenses: QueryDocumentSnapshot[];
};

const DaysExpenseLists = ({ expenses }: Props) => {
	return (
		<ul className="list-none ">
			{expenses.length > 0 ? (
				expenses.map((item) => {
					const expense = item.data() as ExpenseType;
					const time = format(item.data().expenseDate.toDate(), "hh: mm b");
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
	);
};

export default DaysExpenseLists;
