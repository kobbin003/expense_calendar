import { Link } from "react-router-dom";
import { dateToParamsConverter } from "../../../utils/date/dateToParamConverter";
import { isSameDate } from "../../../utils/date/isSameDate";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type Props = {
	date: Date;
};

const CalendarDay = ({ date }: Props) => {
	const { uid } = useSelector((state: RootState) => state.user);
	const param = dateToParamsConverter(date);
	const now = new Date();
	const dateIsToday = isSameDate(now, date);

	return (
		<Link
			to={`/${uid}/${param}`}
			className={`border border-gray-200 shadow-lg hover:scale-105 hover:bg-gray-200 p-2 ${
				dateIsToday ? "bg-gray-200 text-3xl sm:text-4xl" : "text-gray-800"
			}`}
		>
			{date.getDate()}
		</Link>
	);
};

export default CalendarDay;
