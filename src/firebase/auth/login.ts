import { auth } from "../firebaseConfig";
import { AuthType } from "./signUp";

import { signInWithEmailAndPassword } from "firebase/auth";

const login = async ({ email, password }: AuthType) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential;
	} catch (error) {
		throw error;
	}
};
export default login;
