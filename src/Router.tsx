import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./component/ErrorBoundary";
import Auth from "./component/auth/Auth";
import Day from "./pages/day/Day";
import RootCalendar from "./pages/root/RootCalendar";
import Stats from "./pages/stat/Stats";
import Settings from "./pages/settings/Settings";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Auth />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: "/login",
		element: <Auth />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: "/in/:user",
		element: <App />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <RootCalendar />,
			},
			{
				path: ":day",
				element: <Day />,
			},
			{
				path: "stats/:month",
				element: <Stats />,
			},
			{
				path: "settings",
				element: <Settings />,
			},
		],
	},
	{ path: "*", element: <p>404</p> },
]);
