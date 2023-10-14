import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ExpenseType, addExpense } from "../../firestoreFns/expense/addExpense";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { dateToString } from "../../utils/date/date-fns/dateToString";

type Props = {
	handleClickCloseModal: () => void;
};

const ExpenseInputModalContent = ({ handleClickCloseModal }: Props) => {
	const { uid, firestoreUserDocRef } = useSelector(
		(state: RootState) => state.user
	);

	const navigate = useNavigate();

	const [formData, setFormData] = useState<{ [key: string]: string }>({
		amount: "",
		description: "",
	});

	const [disableButton, setDisableButton] = useState(true);

	const items = [
		{ name: "amount", type: "text" },
		{ name: "description", type: "text" },
	];

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleClickCancel = () => {
		handleClickCloseModal();
		setFormData({
			amount: "",
			description: "",
		});
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const now = new Date();

		const nowParams = dateToString(now);

		const expense: ExpenseType = {
			amount: Number(formData.amount),
			description: formData.description ? formData.description.toString() : "",
			expenseDate: now,
			expenseDay: nowParams,
		};

		if (firestoreUserDocRef) {
			addExpense(firestoreUserDocRef, expense).then(() => {
				navigate(`/${uid}/${nowParams}`);
				/** close modal after addExpense
				 * instead on on onClick event
				 */
				handleClickCloseModal();
				setFormData({
					amount: "",
					description: "",
				});
			});
		}
	};

	/** enable done button if formData.amount
	 * 1. does not have only 0 as value.
	 * 2. has only number as it's characters. */
	useEffect(() => {
		const numberRegex = /^\d+(\.\d+)?$/;
		const onlyZeroRegex = /^0+$/;
		const amountIsNumber = numberRegex.test(formData.amount);
		const amountIsOnlyZero = onlyZeroRegex.test(formData.amount);

		if (formData.amount && amountIsNumber && !amountIsOnlyZero) {
			setDisableButton(false);
		} else {
			setDisableButton(true);
		}
	}, [formData.amount]);

	/** empty formdata on mount */
	useEffect(() => {
		setFormData({
			amount: "",
			description: "",
		});
	}, []);

	return (
		<>
			<button
				className="absolute -top-2 -right-2 border-2 rounded-full h-max px-2
						 bg-gray-200 text-gray-500 hover:text-black"
				onClick={handleClickCancel}
			>
				<span className="block scale-y-90">x</span>
			</button>
			<form
				className="form-control gap-2"
				onSubmit={handleSubmit}
			>
				{items.map((item) => (
					<div
						key={item.name}
						className="w-full"
					>
						<label
							htmlFor={item.name}
							className="text-xs text-gray-500"
						>
							enter {item.name}
						</label>
						<input
							type={item.type}
							id={item.name}
							name={item.name}
							placeholder={item.name}
							value={formData[item.name]}
							className="w-full p-2 border-2 border-gray-400 rounded-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							onChange={handleOnChange}
						/>
					</div>
				))}
				<button
					className="btn btn-accent rounded-sm"
					type="submit"
					disabled={disableButton}
				>
					Done
				</button>
				<button
					className="btn btn-secondary rounded-sm"
					onClick={handleClickCancel}
					type="button"
				>
					Cancel
				</button>
			</form>
		</>
	);
};

export default ExpenseInputModalContent;
