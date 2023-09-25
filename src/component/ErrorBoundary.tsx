import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
	let error = useRouteError() as Error;
	console.error("errorBoundary", error);
	// Uncaught ReferenceError: path is not defined
	return (
		<div>
			<h3>Hol Up! Wait a minute! something ain't right!</h3>
			<h5>
				{error.name}: {error.message}
			</h5>
			{/* <p>{error.stack} </p> */}
		</div>
	);
}

export default ErrorBoundary;
