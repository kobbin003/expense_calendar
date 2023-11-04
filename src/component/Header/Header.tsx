import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../Reducer/userSlice";
import { googleSignOut } from "../../firebase/auth/googleSignOut";
import { RootState } from "../../store/store";

type Props = {};

const Header = ({}: Props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { pathname } = useLocation();
	const notInRootCalendar = ["day", "stats", "settings"].some((str) =>
		pathname.includes(str)
	);

	const { uid, photoURL } = useSelector((state: RootState) => state.user);

	const handleClickLogOut = () => {
		navigate("/");
		dispatch(removeUser());
		googleSignOut();
	};

	return (
		<div
			className={`w-screen ${
				notInRootCalendar ? "relative" : "fixed"
			} flex justify-between items-center pb-1 px-4`}
		>
			<div>S</div>

			<div className="flex items-center justify-center gap-2">
				<div className="dropdown dropdown-bottom dropdown-end">
					<button
						tabIndex={0}
						className=""
					>
						<img
							src={photoURL ? photoURL : "/src/assets/defaultProfile.svg"}
							alt=""
							className="border border-gray-500 rounded-full h-7"
						/>
					</button>
					<ul
						tabIndex={0}
						className="dropdown-content z-[1] menu p-1 m-1 shadow bg-base-100 rounded-sm w-max "
					>
						<li>
							<Link to={`/in/${uid}/settings`}>Settings</Link>
						</li>
						<li>
							<Link to={`/in/${uid}/stats`}>Stats</Link>
						</li>
						<li>
							<button
								onClick={handleClickLogOut}
								className="rounded-sm"
							>
								logout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Header;
