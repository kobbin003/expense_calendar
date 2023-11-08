type Props = {
	content: string;
};

const CalendarDayHeader = ({ content }: Props) => {
	const daysShort = content.slice(0, 3);
	return (
		<div className="border flex items-center text-sm md:text-sm overflow-hidden px-1 py-2 ">
			<span className="hidden md:block">{content}</span>
			<span className="md:hidden">{daysShort}</span>
		</div>
	);
};

export default CalendarDayHeader;
