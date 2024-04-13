import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;

const initialState = {
	status: '',
	error: '',
	conversations: [],
	activeConversation: {},
	messages: [],
	notifications: [],
};

// functions
export const getConversations = createAsyncThunk(
	'conversation/all',
	async (token, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${CONVERSATION_ENDPOINT}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return data;
		} catch (error) {
			return rejectWithValue(error?.data?.error?.message);
		}
	}
);

export const open_create_conversation = createAsyncThunk(
	'conversation/open_create',
	async (values, { rejectWithValue }) => {
		const { token, receiver_id } = values;
		try {
			const { data } = await axios.post(
				`${CONVERSATION_ENDPOINT}`,
				{
					receiver_id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return data;
		} catch (error) {
			return rejectWithValue(error?.data?.error?.message);
		}
	}
);

export const getConversationMessages = createAsyncThunk(
	'conversation/messages',
	async (values, { rejectWithValue }) => {
		const { token, convo_id } = values;
		try {
			const { data } = await axios.get(`${MESSAGE_ENDPOINT}/${convo_id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return data;
		} catch (error) {
			return rejectWithValue(error?.data?.error?.message);
		}
	}
);

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {},

	extraReducers(builder) {
		builder
			.addCase(getConversations.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getConversations.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.conversations = action.payload;
			})
			.addCase(getConversations.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(open_create_conversation.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(open_create_conversation.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.activeConversation = action.payload;
			})
			.addCase(open_create_conversation.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(getConversationMessages.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getConversationMessages.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.messages = action.payload;
			})
			.addCase(getConversationMessages.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

// export const {} = chatSlice.actions;

export default chatSlice.reducer;
