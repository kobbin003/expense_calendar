import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSubscribeExpense } from "../../hook/useSubscribeExpense";
import ExpenseVsWeekDays from "./components/ExpenseVsWeekDays";

const Stats = () => {
	const { uid, firestoreUserDocId } = useSelector(
		(state: RootState) => state.user
	);

	const { allExpenses } = useSubscribeExpense(firestoreUserDocId || "");

	return (
		<div>
			<Link to={`/in/${uid}`}>Calendar</Link>
			<h1>Stats</h1>
			{allExpenses && <ExpenseVsWeekDays allExpenses={allExpenses} />}
		</div>
	);
};

export default Stats;
