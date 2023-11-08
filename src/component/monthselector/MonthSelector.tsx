import { useState } from "react";
import monthsList from "../../data/monthList.json";
type Props = {};

const MonthSelector = ({}: Props) => {
	const [date, setDate] = useState({ month: "", year: "" });
	const { months } = monthsList;
	console.log("month list", months);
	return (
		<div className="absolute text-sm font-light bg-blue-300 max-w-[300px]">
			<p>select a month</p>
			<div>
				<select>
					{months.map((month) => (
						<option>{month}</option>
					))}
				</select>
				<input
					type="number"
					min={2020}
					className="border w-min"
				/>
			</div>
		</div>
	);
};

export default MonthSelector;
