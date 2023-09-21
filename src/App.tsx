import "./App.css";
import "./utils/date/getMonthInfo";
import MyCalendar from "./component/MyCalendar";

function App() {
	return (
		<>
			<MyCalendar
				year={2023}
				month={9}
			/>
		</>
	);
}

export default App;
