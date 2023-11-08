import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { getUser } from "./firestoreFns/user/getUser";
import { UserType, setUser } from "./Reducer/userSlice";
import { Outlet } from "react-router-dom";
import Alert from "./component/alert/Alert";

import {
	emptyErrorMsg,
	emptySuccessMsg,
	setIsLoading,
} from "./Reducer/alertSlice";
import { DateContext } from "./context/DateContext";

function App() {
	const { email } = useSelector((state: RootState) => state.user);

	const dispatch = useDispatch();

	const { errorMessage, successMessage, isLoading } = useSelector(
		(state: RootState) => state.alert
	);

	const now = new Date();

	const [dateSelected, setDateSelected] = useState<Date>(now);

	/** set the user's doc ref on initiation */
	useEffect(() => {
		if (email) {
			getUser(email).then((snapShot) => {
				const docRefId = snapShot?.docs[0].id;
				const userInfo = snapShot?.docs[0].data() as UserType;
				if (docRefId && userInfo) {
					//* update the user redux state with the userInfo along with docRefId
					dispatch(setUser({ ...userInfo, firestoreUserDocId: docRefId }));
				}
			});
		}
	}, [email]);

	/** refresh alerts on initiation */
	useEffect(() => {
		dispatch(emptyErrorMsg());
		dispatch(emptySuccessMsg());
		dispatch(setIsLoading(false));
	}, []);

	return (
		<DateContext.Provider value={{ dateSelected, setDateSelected }}>
			{email ? (
				<div className="w-screen h-screen flex flex-col overflow-hidden font-sans antialiased py-1 px-1">
					{successMessage && <Alert type="success">{successMessage}</Alert>}
					{errorMessage && <Alert type="error">{errorMessage}</Alert>}
					{isLoading && <Alert type="info">Loading...</Alert>}
					<Header />
					<Outlet />
				</div>
			) : (
				<p>Loading...</p>
			)}
		</DateContext.Provider>
	);
}

export default App;
