import { ReactNode } from "react";
import Success from "../svgComps/alert/Success";
import Error from "../svgComps/alert/Error";
import Loading from "../svgComps/alert/Loading";

type AlertProp = {
	children: ReactNode;
	type: "success" | "error" | "info";
};

const Alert = ({ children, type }: AlertProp) => {
	const alertViews = {
		success: { component: Success, alertType: "alert-success" },
		error: { component: Error, alertType: "alert-error" },
		info: { component: Loading, alertType: "alert-info" },
	};
	const CurrentAlert = alertViews[type].component;

	const alerttype = alertViews[type].alertType;

	return (
		<div className="fixed w-screen flex justify-center top-2">
			{alerttype && (
				<div className={`alert ${alerttype} p-0 rounded-md px-3 py-1 w-max`}>
					<CurrentAlert />
					<span>{children}</span>
				</div>
			)}
		</div>
	);
};

export default Alert;
