type Props = {
	content: string;
};

const CalendarDayHeader = ({ content }: Props) => {
	const daysShort = content.slice(0, 3);
	// console.log(daysShort);
	return (
		<div className="border flex items-center text-sm md:text-sm overflow-hidden">
			<span className="hidden md:block">{content}</span>
			<span className="md:hidden">{daysShort}</span>
		</div>
	);
};

export default CalendarDayHeader;
