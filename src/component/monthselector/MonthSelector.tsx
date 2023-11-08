import { ChangeEvent, FormEvent, useContext, useState } from "react";
import monthsList from "../../data/monthList.json";
import { DateContext } from "../../context/DateContext";
import { getMonth, getYear, parse } from "date-fns";
type Props = {};

const MonthSelector = ({}: Props) => {
	const { months } = monthsList;

	const { dateSelected, setDateSelected } = useContext(DateContext);

	const selectedMonthIndex = getMonth(dateSelected);

	const selectedYear = getYear(dateSelected);

	const [inputdate, setInputDate] = useState({
		month: months[selectedMonthIndex],
		year: Number(selectedYear),
	});

	const onChangeDateSelection = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const value = e.target.value;
		const name = e.target.name;
		setInputDate((prev) => ({ ...prev, [name]: value }));
	};

	const confirmDateSelection = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const choosenDate: Date = parse(
			`01/${inputdate.month}/${inputdate.year}`,
			"dd/MMMM/yyyy",
			new Date()
		);
		setDateSelected(choosenDate);
	};

	return (
		<div className="absolute text-sm font-light bg-red-400">
			<p>select a month</p>
			<form onSubmit={confirmDateSelection}>
				<select
					value={inputdate.month}
					name="month"
					onChange={onChangeDateSelection}
				>
					{months.map((month) => (
						<option
							value={month}
							key={month}
						>
							{month}
						</option>
					))}
				</select>
				<input
					type="number"
					name="year"
					min={2020}
					className="border w-min"
					value={inputdate.year}
					onChange={onChangeDateSelection}
				/>
				<div>
					<button type="submit">Select</button>
				</div>
			</form>
		</div>
	);
};

export default MonthSelector;
