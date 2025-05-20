import { useRef } from "react";
import ExpenseInputModalContent from "../expenseInputModal/ExpenseInputModalContent";

const AddExpense = () => {
	const expenseModalRef = useRef<HTMLDialogElement>(null);

	const handleClickShowModal = () => {
		/** HTMLDialogElement's  showModal() is equivalent to open attribute of <dialog> element*/
		expenseModalRef.current && expenseModalRef.current.showModal();
	};

	const handleClickCloseModal = () => {
		expenseModalRef.current && expenseModalRef.current.close();
	};

	return (
		<div>
			<button
				className="btn btn-sm btn-success hover:scale-105"
				onClick={handleClickShowModal}
			>
				Add Expense
			</button>
			<dialog className="modal" ref={expenseModalRef}>
				<div className="modal-box w-3/4 sm:w-2/4 md:w-1/3 rounded-md overflow-visible h-max min-h-16 px-8 py-6">
					<ExpenseInputModalContent
						handleClickCloseModal={handleClickCloseModal}
					/>
				</div>
			</dialog>
		</div>
	);
};

export default AddExpense;
