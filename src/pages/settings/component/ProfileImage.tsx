import { ChangeEvent } from "react";
import { UserType } from "../../../Reducer/userSlice";
import Compressor from "compressorjs";
import { checkSizeImage } from "../../../utils/checkSizeImage";
import { emptyErrorMsg, setErrorMsg } from "../../../Reducer/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type Props = {
	settingsProfile: Partial<UserType>;
	setSettingsProfile: React.Dispatch<React.SetStateAction<Partial<UserType>>>;
	setPhotoFile: React.Dispatch<React.SetStateAction<File | undefined>>;
};

// const compressPhotoFile = (file: File) => {};
const ProfileImage = ({
	settingsProfile,
	setSettingsProfile,
	setPhotoFile,
}: Props) => {
	const { photoURL } = settingsProfile;
	const { ...alerts } = useSelector((state: RootState) => state.alert);
	console.log("alerts", alerts);
	const dispatch = useDispatch();
	const handleOnChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const photoURL = URL.createObjectURL(file);
			const photoAllowedToStore = checkSizeImage(file);
			if (photoAllowedToStore) {
				console.log("good size", file.size);
				setSettingsProfile((prev) => ({ ...prev, photoURL }));
				/** compressfile using compressjs */
				new Compressor(file, {
					quality: 0.6,
					success: (result) => {
						if (result) {
							// set the result type as File
							const compressedFile = result as File;
							setPhotoFile(compressedFile);
						}
					},
				});
			} else {
				//set error message
				dispatch(setErrorMsg("File size larger than 200mb"));
				setTimeout(() => {
					dispatch(emptyErrorMsg());
				}, 2000);
				console.log("size too large", file.size);
			}
		}
	};

	/** set a limit in the size of the photo uploaded */
	return (
		<div className="flex gap-2 border-b-2 border-b-gray-100 shadow-md p-2">
			<p className="pr-2 flex flex-col">
				<span>choose your profile photo </span>
				<small>[ should be less than 200MB ]</small>
			</p>
			<label htmlFor="imageFile">
				<input
					name="img"
					type="file"
					id="imageFile"
					style={{ display: "none" }}
					accept="image/*"
					onChange={handleOnChangeFile}
				/>
				<img
					src={photoURL ? photoURL : "/src/assets/defaultProfile.svg"}
					alt=""
					className="border border-gray-500 rounded-full h-7 w-7 hover:cursor-pointer"
				/>
			</label>
		</div>
	);
};

export default ProfileImage;
