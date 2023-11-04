import { ChangeEvent } from "react";
import { UserType } from "../../../Reducer/userSlice";

type Props = {
	settingsProfile: Partial<UserType>;
	setSettingsProfile: React.Dispatch<React.SetStateAction<Partial<UserType>>>;
	setPhotoFile: React.Dispatch<React.SetStateAction<File | undefined>>;
};

const ProfileImage = ({
	settingsProfile,
	setSettingsProfile,
	setPhotoFile,
}: Props) => {
	const { photoURL } = settingsProfile;

	const handleOnChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const photoURL = URL.createObjectURL(file);
			setSettingsProfile((prev) => ({ ...prev, photoURL }));
			setPhotoFile(file);
		}
	};

	return (
		<div className="flex">
			<p className="pr-2">choose your profile photo</p>
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
