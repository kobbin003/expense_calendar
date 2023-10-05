import { PropsWithChildren } from "react";

const Alert = ({ children }: PropsWithChildren) => {
	return (
		<div className="alert alert-error p-0 rounded-sm px-3 py-1 w-max fixed top-4">
			{children}
		</div>
	);
};

export default Alert;
