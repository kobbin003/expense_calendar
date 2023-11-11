import { ChangeEvent, FormEvent, useContext, useState } from "react";
import monthsList from "../../data/monthList.json";
import { DateContext } from "../../context/DateContext";
import { getMonth, getYear, parse } from "date-fns";

type Props = {
	setShowMonthSelector: React.Dispatch<React.SetStateAction<boolean>>;
};

const MonthSelector = ({ setShowMonthSelector }: Props) => {
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

	const handleCloseMonthSelector = () => {
		setShowMonthSelector(false);
	};

	const confirmDateSelection = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShowMonthSelector(false);
		const choosenDate: Date = parse(
			`01/${inputdate.month}/${inputdate.year}`,
			"dd/MMMM/yyyy",
			new Date()
		);
		setDateSelected(choosenDate);
	};

	return (
		<div className="flex flex-col gap-2 absolute text-sm font-light bg-white border border-gray-300 shadow-md p-2 rounded-md">
			<button
				onClick={handleCloseMonthSelector}
				className="absolute bg-gray-100 right-2 rounded-full w-5 h-5"
			>
				<span className="block scale-y-95">x</span>
			</button>
			<p>select a month</p>
			<form
				onSubmit={confirmDateSelection}
				className="form-control gap-2"
			>
				<div className="flex flex-row gap-2">
					<select
						value={inputdate.month}
						name="month"
						onChange={onChangeDateSelection}
						className="input input-bordered p-0 px-1"
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
						className="input input-bordered w-20 p-0 px-2"
						value={inputdate.year}
						onChange={onChangeDateSelection}
					/>
				</div>
				<div>
					<button
						type="submit"
						className="btn btn-neutral"
					>
						Select
					</button>
				</div>
			</form>
		</div>
	);
};

export default MonthSelector;
