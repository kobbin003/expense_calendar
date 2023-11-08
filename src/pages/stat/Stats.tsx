import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";

type Props = {};

const Stats = ({}: Props) => {
	const { uid } = useSelector((state: RootState) => state.user);
	return (
		<div>
			<h1>Stats</h1>
			<Link to={`/in/${uid}`}>Calendar</Link>
		</div>
	);
};

export default Stats;
