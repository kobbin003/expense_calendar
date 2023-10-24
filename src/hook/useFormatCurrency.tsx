import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useFormatCurrency = (value: number) => {
	const { currency } = useSelector((state: RootState) => state.user);
	const amount = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(value);
	return amount;
};
