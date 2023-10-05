import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ErrorType = {
	errorMessage: string;
	successMessage: string;
};

const initialState: ErrorType = { errorMessage: "", successMessage: "" };

export const alertSlice = createSlice({
	name: "errors",
	initialState,
	reducers: {
		setErrorMsg: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload;
		},
		setSuccessMsg: (state, action: PayloadAction<string>) => {
			state.errorMessage = action.payload;
		},
		emptyErrorMsg: (state) => {
			state.errorMessage = "";
		},
		emptySuccessMsg: (state) => {
			state.errorMessage = "";
		},
	},
});

export const { setErrorMsg, setSuccessMsg, emptyErrorMsg, emptySuccessMsg } =
	alertSlice.actions;

export const alertReducer = alertSlice.reducer;
