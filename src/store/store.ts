import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducer/userSlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	REGISTER,
	PURGE,
	PERSIST,
	PAUSE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { alertReducer } from "../Reducer/alertSlice";
const rootReducer = combineReducers({ user: userReducer, alert: alertReducer });

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
