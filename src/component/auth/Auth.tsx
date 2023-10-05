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

type Props = {};

const Auth = (_: Props) => {
	const { pathname } = useLocation();

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const alert = useSelector((state: RootState) => state.alert);

	const handleGoogleAuth = () => {
		googleLogin()
			.then((res) => {
				if (res) {
					const { displayName, email, photoURL, phoneNumber, uid } = res;
					const userInfo = { displayName, email, photoURL, phoneNumber, uid };
					//*  set the user in redux state
					dispatch(setUser(userInfo));

					//* navigate to app
					navigate(`/${uid}`);

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
	}, []);

	//* empty error on path change.
	useEffect(() => {
		dispatch(emptyErrorMsg());
	}, [pathname]);

	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center">
			{alert.errorMessage && <Alert>{alert.errorMessage}</Alert>}
			<div className="flex flex-col gap-2">
				<div>LOGO</div>
				{pathname.includes("login") ? (
					<>
						<AuthForm type="Login" />
						<div className="w-full h-0 border-1 border-gray-300"></div>
						<div className="w-full flex">
							<p>Don't have an account?</p>{" "}
							<Link
								to={`/`}
								className="text-blue-600 pl-1"
							>
								Sign up
							</Link>
						</div>
					</>
				) : (
					<>
						<AuthForm type="Signup" />
						<div className="w-full flex items-center">
							<div className="flex-1 h-0 border-1 border-gray-300"></div>
							<div className="px-2">OR</div>
							<div className="flex-1 h-0 border-1 border-gray-300"></div>
						</div>
						<AuthButton
							bgColor="bg-green-400"
							img="/src/assets/google.svg"
							desc="Continue with Google"
							onClick={handleGoogleAuth}
						/>
						<div className="w-full h-0 border-1 border-gray-300"></div>
						<div className="w-full flex">
							<p>Already have an account?</p>{" "}
							<Link
								to={`/login`}
								className="text-blue-600 pl-1"
							>
								Log in
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Auth;
