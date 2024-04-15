import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import createFilter from 'redux-persist-transform-filter';

//slices
import userSlice from '../Slices/userSlice';
import chatSlice from '../Slices/chatSlice';
import tokenInterceptor from '../utils/tokenInterceptor';

//saveUserOnlyFilter
const saveUserOnlyFilter = createFilter('user', ['user']); //By using this line, you are creating a filter transformation that only includes the user slice from your Redux store and all keys within that slice.

//persist config
const persistConfig = {
	key: 'user',
	storage,
	whiteList: ['user'], // whiteList: Specifies which  slices should be persisted to storage.(this name should be what is the key in our root reduer for the corrosponding slice.) Only the slices listed in the whiteList array will be stored locally.
	blacklist: ['chat'],
	transforms: [saveUserOnlyFilter], // transforms: Allows you to apply transformations to the state before storing it and after retrieving it from storage. You can use transformations like filters, encryption, or compression to modify the state before persistence.
};

// combine all reducers in it and then we can export this only.
const rootReducer = combineReducers({
	user: userSlice,
	chat: chatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
	tokenInterceptor, // Custom middleware for token refresh
	...getDefaultMiddleware({
		serializableCheck: false, // Disable serializability checks
	}),
];

export const store = configureStore({
	reducer: persistedReducer,
	middleware: middleware,
});

export const persistor = persistStore(store);
