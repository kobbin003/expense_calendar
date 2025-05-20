import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const googleSignOut = () => {
	try {
		signOut(auth);
	} catch (error) {
		console.error(error);
	}
};
