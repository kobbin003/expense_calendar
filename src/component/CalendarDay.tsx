type Props = {
	content: string | number;
};

const CalendarDay = ({ content }: Props) => {
	return <div className="border border-white bg-orange-600">{content}</div>;
};

export default CalendarDay;
