import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	PointElement,
	LineElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { weekDaysData } from "../helpers/weekDaysData";
import { Bar } from "react-chartjs-2";
import { Expense } from "../../../hook/useSubscribeExpense";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	Title,
	LineElement
);

type Props = { allExpenses: Expense[] | null };

const ExpenseVsWeekDays = ({ allExpenses }: Props) => {
	const [data, setData] = useState<{ labels: any[]; datasets: any[] }>({
		labels: [],
		datasets: [
			{
				label: "User's expense per weekday",
				data: [],
				backgroundColor: ["#f3ba2f"],
				borderColor: "black",
				borderWidth: 2,
			},
		],
	});

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "bottom" as const,
			},
			title: {
				display: true,
				text: "User spending activity according to weekdays",
			},
		},
	};

	useEffect(() => {
		const weekDaysdata = weekDaysData(allExpenses || null);

		if (weekDaysdata) {
			const labels = weekDaysdata.map((item) => item.day);

			const data = weekDaysdata.map((item) => item.amount);

			setData((prev) => ({
				...prev,
				labels,
				datasets: [{ ...prev.datasets[0], data }],
			}));
		}
	}, [allExpenses]);

	return (
		<div style={{ width: "400px" }}>
			<Bar
				data={data}
				options={options}
			/>
		</div>
	);
};

export default ExpenseVsWeekDays;
