/* 
	extrareducers : It's particularly useful for handling actions dispatched by createAsyncThunk

	/auth/register' : This in the createAsyncThunk funtion is not the actual url, insted it is a string identifier
	for the action created by asyncthunk.this identifier is used internally by redux toolkit to dispacth
	the appropriate redux actions based on the status of the request.
*/

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

const initialState = {
	status: '',
	error: '',
	user: {
		id: '',
		name: '',
		email: '',
		picture: '',
		status: '',
		token: '',
	},
};

// function to call the backend  for registering user.
export const registerUser = createAsyncThunk(
	'/auth/register',
	async (values, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, {
				...values, // here we are spreading all the values  to pass all the properties of one object as separate properties in another object
			});

			// console.log('response form server:', data);
			return data; // we return the response , that we got from server
		} catch (error) {
			//the error message we get from the backend
			return rejectWithValue(error?.response?.data?.error?.message);
		}
	}
);

// function to call the backend  for login user.
export const loginUser = createAsyncThunk('/auth/login', async (values, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(`${AUTH_ENDPOINT}/login`, {
			...values, // here we are spreading all the values  to pass all the properties of one object as separate properties in another object
		});

		// console.log('response form server:', data);
		return data; // we return the response , that we got from server
	} catch (error) {
		//the error message we get from the backend
		return rejectWithValue(error?.response?.data?.error?.message);
	}
});

// function for refreshing the access token
// export const refreshAccessToken = createAsyncThunk(
// 	'/auth/refreshToken',
// 	async (_, { rejectWithValue }) => {
// 		try {
// 			const { data } = await axios.post(`${AUTH_ENDPOINT}/refreshtoken`);
// 			console.log('new refresh token get:::', data);
// 			return data;
// 		} catch (error) {
// 			return rejectWithValue(error?.response?.data?.error?.message);
// 		}
// 	}
// );

export const userSlice = createSlice({
	name: 'userSlice',
	initialState: initialState,
	reducers: {
		logout: (state) => {
			state.status = '';
			state.error = '';
			state.user = {
				id: '',
				name: '',
				email: '',
				picture: '',
				status: '',
				token: '',
			};
		},
		changeStatus: (state, action) => {
			state.status = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(registerUser.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload.user;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(loginUser.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload.user;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const { logout, changeStatus } = userSlice.actions;
export default userSlice.reducer;
