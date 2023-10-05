import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import login from "../../firebase/auth/login";
import AuthButton from "../authButton/AuthButton";
import signUp from "../../firebase/auth/signUp";
import { useDispatch } from "react-redux";
import { setUser } from "../../Reducer/userSlice";
import { addUser } from "../../firestoreFns/user/addUser";
import { useLocation, useNavigate } from "react-router-dom";
import { emptyErrorMsg, setErrorMsg } from "../../Reducer/alertSlice";

type UserFormType = { email: string; password: string };

const AuthForm = ({ type }: { type: "Login" | "Signup" }) => {
	const dispatch = useDispatch();

	const { pathname } = useLocation();

	const navigate = useNavigate();

	const initialFormData = {
		email: "",
		password: "",
	};
	const [formData, setFormData] = useState<UserFormType>(initialFormData);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setFormData((prev) => ({ ...prev, [inputName]: inputValue }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formData.email) {
			dispatch(setErrorMsg("please provide email"));
			return;
		}
		if (!formData.password) {
			dispatch(setErrorMsg("please provide password"));
			return;
		}
		if (type == "Login") {
			login(formData)
				.then((res) => {
					const {
						user: { displayName, email, photoURL, phoneNumber, uid },
					} = res;
					const userInfo = { displayName, email, photoURL, phoneNumber, uid };
					//*  set the user in redux state
					dispatch(setUser(userInfo));
					//* navigate to app
					navigate(`/${uid}`);
					//* empty error on success
					dispatch(emptyErrorMsg());
				})
				.catch((err) => {
					console.log("email login error", err);
					dispatch(setErrorMsg("invalid credentials"));
				});
		} else {
			signUp(formData)
				.then((res) => {
					const {
						user: { displayName, email, photoURL, phoneNumber, uid },
					} = res;
					const userInfo = { displayName, email, photoURL, phoneNumber, uid };
					//*  add the user in firestore
					addUser(userInfo);
					//*  set the user in redux state
					dispatch(setUser(userInfo));
					//* navigate to app
					navigate(`/${uid}`);
					//* empty error on success
					dispatch(emptyErrorMsg());
				})
				.catch((err) => {
					console.log("email signup error", err);
					dispatch(setErrorMsg(err.message));
				});
		}
	};

	//* reset formData on path change.
	useEffect(() => {
		setFormData(initialFormData);
	}, [pathname]);

	return (
		<form
			onSubmit={handleSubmit}
			className="form-control gap-2"
		>
			<input
				type="email"
				name="email"
				value={formData.email}
				placeholder="email"
				onChange={handleOnChange}
				className="border-2 focus:outline-none border-gray-400 rounded-sm p-1"
			/>
			<input
				type="password"
				name="password"
				value={formData.password}
				placeholder="password"
				onChange={handleOnChange}
				className="border-2 focus:outline-none border-gray-400 rounded-sm p-1"
			/>
			<AuthButton
				bgColor="bg-orange-400"
				img="/src/assets/mail.svg"
				desc={type}
			/>
		</form>
	);
};

export default AuthForm;
