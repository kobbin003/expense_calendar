import { useSelector } from "react-redux";
import Currency from "./component/Currency";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { updateUserCurrency } from "../../firestoreFns/user/updateUserCurrency";

type Props = {};

const Settings = ({}: Props) => {
	const { uid, currency, firestoreUserDocRef } = useSelector(
		(state: RootState) => state.user
	);

	const saveSettings = () => {
		// update user with the chosen currency in firestore
		if (firestoreUserDocRef) {
			updateUserCurrency(currency, firestoreUserDocRef).then(() => {
				// dis
			});
		}
	};

	return (
		<div>
			<Link to={`/in/${uid}`}>Go Back</Link>
			<Currency />
			<div>
				<button
					className="btn btn-accent rounded-sm"
					onClick={saveSettings}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default Settings;
