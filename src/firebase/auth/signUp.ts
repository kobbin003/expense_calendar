import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export type AuthType = {
	email: string;
	password: string;
};

async function signUp({ email, password }: AuthType) {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential;
	} catch (error) {
		throw error;
	}
}

export default signUp;
