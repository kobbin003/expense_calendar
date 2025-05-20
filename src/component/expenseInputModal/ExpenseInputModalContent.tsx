import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { addExpense } from "../../firestoreFns/expense/addExpense";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { ExpenseType } from "../../types/expense";
import { dateToyyyyMMdd } from "../../utils/date/date-fns/dateToyyyyMMdd";
import {
	emptySuccessMsg,
	setIsLoading,
	setSuccessMsg,
} from "../../Reducer/alertSlice";

type Props = {
	handleClickCloseModal: () => void;
};

const items = [
	{ name: "amount", type: "text" },
	{ name: "description", type: "text" },
];
const ExpenseInputModalContent = ({ handleClickCloseModal }: Props) => {
	const { uid, firestoreUserDocId } = useSelector(
		(state: RootState) => state.user
	);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const [formData, setFormData] = useState<{ [key: string]: string }>({
		amount: "",
		description: "",
	});

	const [disableButton, setDisableButton] = useState(true);

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

		if (firestoreUserDocId && formData.amount) {
			const now = new Date();

			const dayParams = dateToyyyyMMdd(now);

			const expense: ExpenseType = {
				amount: Number(formData.amount),
				description: formData.description
					? formData.description.toString()
					: "",
				expenseDate: now,
			};
			// start loading
			dispatch(setIsLoading(true));
			addExpense(firestoreUserDocId, expense).then(() => {
				navigate(`/in/${uid}/day/${dayParams}`);
				// stop loading
				dispatch(setIsLoading(false));
				/** close modal after addExpense instead of on onClick event */
				handleClickCloseModal();
				// set success message
				dispatch(setSuccessMsg("expense added!"));
				// remove success message
				setTimeout(() => {
					dispatch(emptySuccessMsg());
				}, 2000);
				// reset the formdata
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
		<form className="form-control gap-2" onSubmit={handleSubmit}>
			<button
				type="button"
				className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
				onClick={handleClickCancel}
			>
				✕
			</button>

			{items.map((item) => (
				<div key={item.name} className="flex flex-col gap-1">
					<label
						htmlFor={item.name}
						className="text-xs sm:text-sm text-gray-500 "
					>
						enter {item.name}
					</label>
					<input
						type={item.type}
						id={item.name}
						name={item.name}
						placeholder={item.name}
						value={formData[item.name]}
						className="text-sm w-full p-2 border-2 border-gray-400 rounded-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
	);
};

export default ExpenseInputModalContent;
