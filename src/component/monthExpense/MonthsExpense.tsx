import { useFormatCurrency } from "../../hook/useFormatCurrency";
import { useGetExpenseByMonth } from "../../hook/useGetExpenseByMonth";
import Loader from "../loader/Loader";

type Props = { dateSelected: Date; firestoreUserDocId: string };

const MonthsExpense = ({ dateSelected, firestoreUserDocId }: Props) => {
	const { data, isLoading } = useGetExpenseByMonth(
		dateSelected,
		firestoreUserDocId || ""
	);

	const monthsExpense = useFormatCurrency(data);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="stat-desc text-base sm:text-lg md:text-xl">
			{monthsExpense}
		</div>
	);
};

export default MonthsExpense;
