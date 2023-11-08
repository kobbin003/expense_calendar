import { ReactNode } from "react";
import Success from "../svgComps/alert/Success";
import Error from "../svgComps/alert/Error";
import Loading from "../svgComps/alert/Loading";

type AlertProp = {
	children: ReactNode;
	type: "success" | "error" | "info";
};

const Alert = ({ children, type }: AlertProp) => {
	const alerts = {
		success: { component: Success, alertClass: "alert-success" },
		error: { component: Error, alertClass: "alert-error" },
		info: { component: Loading, alertClass: "alert-info" },
	};

	const CurrentAlert = alerts[type].component;

	const alertClass = alerts[type].alertClass;

	return (
		<div className="fixed w-screen flex justify-center top-2 z-30">
			<div className={`alert ${alertClass} p-0 rounded-md px-3 py-1 w-max`}>
				<CurrentAlert />
				<span>{children}</span>
			</div>
		</div>
	);
};

export default Alert;
