import { useEffect, useState } from "react";
import "./App.css";
import CalendarNav from "./component/CalendarNav";
import MyCalendar from "./component/MyCalendar";
import Header from "./component/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { getUser } from "./firestoreFns/user/getUser";
import { setDocRef } from "./Reducer/userSlice";

function App() {
	const initialDate = new Date();
	const [dateSelected, setDateSelected] = useState<Date>(initialDate);
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		if (user.email) {
			getUser(user.email).then((snapShot) => {
				const docRef = snapShot?.docs[0].id;
				if (docRef) {
					dispatch(setDocRef(docRef));
				}
			});
		}
	}, []);

	return (
		<div className="w-screen h-screen flex flex-col overflow-hidden font-sans antialiased py-1 px-1">
			<Header />
			<CalendarNav
				dateSelected={dateSelected}
				setDateSelected={setDateSelected}
			/>
			<MyCalendar dateSelected={dateSelected} />
		</div>
	);
}

export default App;
