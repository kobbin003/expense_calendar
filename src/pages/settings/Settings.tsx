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
import { useEffect, useState } from "react";
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

	// const { successMessage } = useSelector((state: RootState) => state.alert);
	const dispatch = useDispatch();

	/** set the initial state from the redux state */
	const [settingsProfile, setSettingsProfile] = useState<Partial<UserType>>({
		currency,
		photoURL,
	});

	const [photoFile, setPhotoFile] = useState<File>();

	// get the url from the firestore storage
	const getStoredPhotoURL = async () => {
		const storageRef = ref(storage, "profilePic");
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

		/** need to store photo only if image File is selected */
		if (photoFile) {
			getStoredPhotoURL().then((url) => {
				updateUsersDoc(url);
			});
		} else {
			updateUsersDoc();
		}
	};

	useEffect(() => {
		dispatch(emptySuccessMsg());
	}, []);

	return (
		<div className="flex flex-col gap-2">
			<Link
				to={`/in/${uid}`}
				className=""
			>
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
