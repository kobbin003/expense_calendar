type Props = {
	content: number;
};

const MutedCalendarDay = ({ content }: Props) => {
	return (
		<div className="border border-gray-200 bg-gray-200/10 text-gray-300">
			{content}
		</div>
	);
};

export default MutedCalendarDay;
