import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserType = {
	displayName: string | null;
	email: string | null;
	phoneNumber: string | null;
	photoURL: string | null;
	uid: string;
	firestoreUserDocRef?: string;
};

const initialState: UserType = {
	displayName: "",
	email: "",
	phoneNumber: "",
	photoURL: "",
	uid: "",
	firestoreUserDocRef: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserType>) => {
			const { payload } = action;
			return { ...state, ...payload };
		},
		setDocRef: (state, action: PayloadAction<string>) => {
			return { ...state, firestoreUserDocRef: action.payload };
		},
		// updateUser: () => {},
		removeUser: () => {
			return initialState;
		},
	},
});

export const { setUser, removeUser, setDocRef } = userSlice.actions;

export default userSlice.reducer;
