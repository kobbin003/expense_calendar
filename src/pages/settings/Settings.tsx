import { useDispatch, useSelector } from "react-redux";
import Currency from "./component/Currency";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { updateUser } from "../../firestoreFns/user/updateUser";
import {
	emptySuccessMsg,
	setIsLoading,
	setSuccessMsg,
} from "../../Reducer/alertSlice";
import { useEffect, useRef, useState } from "react";
import ProfileImage from "./component/ProfileImage";
import {
	UserType,
	updateUser as updateUserRedux,
} from "../../Reducer/userSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";

type Props = {};

export type SettingsProfile = {
	currency: string;
	photoURL: string | null;
};

const Settings = ({}: Props) => {
	const { uid, currency, firestoreUserDocId, photoURL } = useSelector(
		(state: RootState) => state.user
	);

	const dispatch = useDispatch();

	const [disableSave, setDisableSave] = useState(true);

	/** set the initial value as ref; useful to check if values are changed */
	const initialStateRef = useRef({ currency, photoURL });

	/** set the initial state from the redux state */
	const [settingsProfile, setSettingsProfile] = useState<Partial<UserType>>({
		currency,
		photoURL,
	});

	const [photoFile, setPhotoFile] = useState<File>();

	// get the url from the firestore storage
	const getUpdatedPhotoURL = async () => {
		const storageRef = ref(storage, uid);

		if (photoFile) {
			await uploadBytes(storageRef, photoFile);
			const url = getDownloadURL(storageRef);
			return url;
		}
	};

	const updateUsersDoc = (url?: string) => {
		if (firestoreUserDocId) {
			updateUser(
				{
					//* when we dont
					photoURL: url || photoURL,
					currency: settingsProfile.currency,
				},
				firestoreUserDocId
			).then(() => {
				dispatch(setIsLoading(false));
				// dispatch success message
				dispatch(setSuccessMsg("Settings Saved"));
				// empty success message after 2 seconds
				setTimeout(() => {
					dispatch(emptySuccessMsg());
				}, 2000);
			});
		}
	};

	const saveSettings = () => {
		dispatch(setIsLoading(true));

		// update user redux state
		dispatch(updateUserRedux(settingsProfile));

		/** need to store photo & save it's url only if image File is selected */
		if (photoFile) {
			getUpdatedPhotoURL().then((url) => {
				updateUsersDoc(url);
			});
		} else {
			/** else just save the currency */
			updateUsersDoc();
		}
	};

	useEffect(() => {
		dispatch(emptySuccessMsg());
	}, []);

	/** enable save button only if values are changed */
	useEffect(() => {
		if (
			settingsProfile.currency !== initialStateRef.current.currency ||
			settingsProfile.photoURL !== initialStateRef.current.photoURL
		) {
			// console.log(
			// 	"enable save",
			// 	settingsProfile.currency,
			// 	initialStateRef.current.currency
			// );
			setDisableSave(false);
		} else {
			setDisableSave(true);
		}
	}, [settingsProfile]);

	return (
		<div className="flex flex-col gap-2 p-2">
			<Link to={`/in/${uid}`} className="">
				<img
					src="/src/assets/goBack.svg"
					alt=""
					className="h-7 p-2  hover:scale-105 border border-gray-500/50 rounded-sm shadow"
				/>
			</Link>
			<ProfileImage
				settingsProfile={settingsProfile}
				setSettingsProfile={setSettingsProfile}
				setPhotoFile={setPhotoFile}
			/>
			<Currency
				settingsProfile={settingsProfile}
				setSettingsProfile={setSettingsProfile}
			/>
			<div className="p-2">
				<button
					className="btn btn-accent rounded-sm"
					onClick={saveSettings}
					disabled={disableSave}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default Settings;
