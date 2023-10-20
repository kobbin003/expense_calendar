import { ChangeEvent, useState } from "react";
import currencies from "../../../data/currencyList.json";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setCurrency } from "../../../Reducer/userSlice";

type Props = {};

const Currency = ({}: Props) => {
	const { currency } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const [selectedValue, setSelectedValue] = useState(currency);
	// Fetch the list of available currencies using Intl.NumberFormat

	const currenciesArray = Object.entries(currencies);

	const currencyList = currenciesArray.map(([currency, currencyName]) => ({
		currency,
		currencyName,
	}));

	const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(e.target.value);
		dispatch(setCurrency(e.target.value));
	};

	return (
		<div>
			<label htmlFor="currency">Choose your currency</label>
			<select
				name="currency"
				id="currency"
				value={selectedValue}
				onChange={handleOnChange}
				className="hover:cursor-pointer"
			>
				<option value=""></option>
				{currencyList.map((item) => {
					return (
						<option
							key={item.currency}
							value={item.currency}
						>
							{item.currencyName}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default Currency;
