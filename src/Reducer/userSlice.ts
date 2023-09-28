import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserType = {
	displayName: string | null;
	email: string | null;
	phoneNumber: string | null;
	photoURL: string | null;
	uid: string;
};

const initialUserState: UserType | {} = {};

export const userSlice = createSlice({
	name: "user",
	initialState: initialUserState,
	reducers: {
		setUser: (state, action: PayloadAction<UserType>) => {
			const { payload } = action;
			return { ...state, ...payload };
		},
		// updateUser: () => {},
		removeUser: () => {
			return {};
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
