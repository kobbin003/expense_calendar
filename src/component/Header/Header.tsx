import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../Reducer/userSlice";
import { googleSignOut } from "../../firebase/auth/googleSignOut";
import { RootState } from "../../store/store";
import { useRef } from "react";
import { useClickedOut } from "../../hook/useClickedOut";
import Logo from "../logo/Logo";

const Header = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { pathname } = useLocation();

	const dropdownRef = useRef<HTMLDetailsElement>(null);

	const closeDropDownImageRef = useRef<HTMLImageElement>(null);

	const notInRootCalendar = ["day", "stats", "settings"].some((str) =>
		pathname.includes(str)
	);

	const { uid, photoURL } = useSelector((state: RootState) => state.user);

	const handleClickLogOut = () => {
		navigate("/");
		dispatch(removeUser());
		googleSignOut();
	};

	useClickedOut(closeDropDownImageRef, () => {
		// console.log("clicked outside");
		const dropdownEl = dropdownRef.current as HTMLDetailsElement;
		dropdownEl.removeAttribute("open");
	});

	return (
		<div
			className={`w-screen ${
				notInRootCalendar ? "relative" : "fixed"
			} flex justify-between items-center pb-1 px-4 `}
		>
			<div className="z-50">
				<Link to={`/in/${uid}`} className="z-50">
					<Logo />
				</Link>
			</div>

			<div className="flex items-center justify-center gap-2">
				<details
					className="dropdown dropdown-bottom dropdown-end"
					ref={dropdownRef}
				>
					<summary className="list-none hover:cursor-pointer">
						<img
							src={photoURL ? photoURL : "/defaultProfile.svg"}
							alt=""
							className="border border-gray-500 rounded-full h-7 w-7"
							ref={closeDropDownImageRef}
						/>
					</summary>
					<ul className="dropdown-content z-[1] menu p-1 m-1 shadow bg-base-100 rounded-sm w-max ">
						<li className="border-b border-gray-300/50 shadow-md">
							<Link to={`/in/${uid}/settings`} className="rounded-sm">
								Settings
							</Link>
						</li>
						<li className="border-b border-gray-300/50 shadow-md">
							<Link to={`/in/${uid}/stats`} className="rounded-sm">
								Stats
							</Link>
						</li>
						<li className="border-b border-gray-300/50 shadow-md">
							<button onClick={handleClickLogOut} className="rounded-sm">
								logout
							</button>
						</li>
					</ul>
				</details>
			</div>
		</div>
	);
};

export default Header;
