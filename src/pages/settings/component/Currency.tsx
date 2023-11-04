import { ChangeEvent } from "react";
import currencies from "../../../data/currencyList.json";
// import { setCurrency } from "../../../Reducer/userSlice";
import { UserType } from "../../../Reducer/userSlice";

type Props = {
	settingsProfile: Partial<UserType>;
	setSettingsProfile: React.Dispatch<React.SetStateAction<Partial<UserType>>>;
};

const Currency = ({ settingsProfile, setSettingsProfile }: Props) => {
	// Fetch the list of available currencies using Intl.NumberFormat
	const { currency } = settingsProfile;

	const currenciesArray = Object.entries(currencies);

	const currencyList = currenciesArray.map(([currency, currencyName]) => ({
		currency,
		currencyName,
	}));

	const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const currency = e.target.value;

		setSettingsProfile((prev) => ({ ...prev, currency }));
	};

	return (
		<div className="flex gap-2">
			<label htmlFor="currency">Choose your currency</label>
			<select
				name="currency"
				id="currency"
				value={currency}
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
