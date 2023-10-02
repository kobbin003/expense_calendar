import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ErrorType = {
	message: string;
};

const initialState: ErrorType = { message: "" };

export const errorSlice = createSlice({
	name: "errors",
	initialState,
	reducers: {
		setError: (state, action: PayloadAction<string>) => {
			state.message = action.payload;
		},
		emptyError: (state) => {
			state.message = "";
		},
	},
});
export const { setError, emptyError } = errorSlice.actions;

export const errorReducer = errorSlice.reducer;
