import AuthForm from "./AuthForm";
import AuthButton from "../authButton/AuthButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googleLogin from "../../firebase/auth/googleAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setUser } from "../../Reducer/userSlice";
import { addUser } from "../../firestoreFns/user/addUser";
import { getUser } from "../../firestoreFns/user/getUser";
import { emptyErrorMsg, setErrorMsg } from "../../Reducer/alertSlice";
import { useEffect } from "react";
import Alert from "../alert/Alert";
import Logo from "../logo/Logo";

const Auth = () => {
	const { pathname } = useLocation();

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const alert = useSelector((state: RootState) => state.alert);

	const handleGoogleAuth = () => {
		googleLogin()
			.then((res) => {
				if (res) {
					const { displayName, email, photoURL, phoneNumber, uid } = res;

					// add "USD" as default currency
					const userInfo = {
						displayName,
						email,
						photoURL,
						phoneNumber,
						uid,
						currency: "USD",
					};

					//*  set the user in redux state
					dispatch(setUser(userInfo));

					//* navigate to app
					navigate(`/in/${uid}`);

					//*  skip adding the user in firestore if already present.
					email &&
						getUser(email).then((res) => {
							const userWithEmailExists =
								res?.docs.length && res?.docs.length > 0;
							if (!userWithEmailExists) {
								//*  add the user in firestore if a user with email does not exist.
								addUser(userInfo);
							}
						});

					//* empty error on success
					dispatch(emptyErrorMsg());
				}
			})
			.catch((err) => {
				console.log("google login error", err);
				dispatch(setErrorMsg("your google account not found"));
			});
	};

	//* empty error on start
	useEffect(() => {
		dispatch(emptyErrorMsg());
	}, [dispatch]);

	//* empty error on path change.
	useEffect(() => {
		dispatch(emptyErrorMsg());
	}, [pathname, dispatch]);

	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center">
			{alert.errorMessage && <Alert type="error">{alert.errorMessage}</Alert>}
			<div className="flex flex-col gap-2 border-2 p-4 border-gray-400/5 rounded-sm shadow-2xl">
				<Logo />
				{!pathname.includes("login") ? (
					<>
						<AuthForm type="Signup" />
						<div className="w-full flex items-center">
							<div className="flex-1 h-0 border-1 border-gray-300"></div>
							<div className="px-2">OR</div>
							<div className="flex-1 h-0 border-1 border-gray-300"></div>
						</div>
						<AuthButton
							bgColor="bg-green-400"
							img="/google.svg"
							desc="Continue with Google"
							onClick={handleGoogleAuth}
						/>
						<div className="w-full h-0 border-1 border-gray-300"></div>
						<div className="w-full flex">
							<p>Already have an account?</p>{" "}
							<Link to={`/login`} className="text-blue-600 pl-1">
								Log in
							</Link>
						</div>
					</>
				) : (
					<>
						<AuthForm type="Login" />
						<div className="w-full h-0 border-1 border-gray-300"></div>
						<div className="w-full flex">
							<p>Don't have an account?</p>{" "}
							<Link to={`/`} className="text-blue-600 pl-1">
								Sign up
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Auth;
