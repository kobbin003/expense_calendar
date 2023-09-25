import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./component/ErrorBoundary";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: "/:day",
		element: <p>day</p>,
	},
]);
