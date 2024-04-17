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

export const sendMessage = createAsyncThunk(
	'/messages/send',
	async (values, { rejectWithValue }) => {
		const { token, receiver_id, message, convo_id, files } = values;
		try {
			const { data } = await axios.post(
				`${MESSAGE_ENDPOINT}`,
				{
					message,
					convo_id,
					receiver_id,
					files,
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

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		clearConversation: (state) => {
			state.activeConversation = {};
		},
		updateMessagesAndConversations: (state, action) => {
			// Update message

			let convo = state.activeConversation;
			// we are checkinng that the active coversation is equal to the conversaation
			// the message belongs then we reflect it on the screen only.
			if (convo._id === action.payload.conversation._id) {
				state.messages = [...state.messages, action.payload];
			}

			// update conversations
			let conversation = {
				...action.payload.conversation,
				latestMessage: action.payload,
			};

			//removing current conversation in which  new message came
			let newConvos = [...state.conversations].filter((c) => c._id !== conversation._id);
			//and now we are adding that conversation at top
			newConvos.unshift(conversation);
			state.conversations = newConvos;
		},
	},

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
			})
			.addCase(sendMessage.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(sendMessage.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.messages = [...state.messages, action.payload];

				// after we send the message we want to update the latest message and also we wnat
				// to shift that conversation to the top.
				let conversation = {
					...action.payload.conversation,
					latestMessage: action.payload,
				};

				//we first make a shallow copy of all the conversations present in our state
				// and then we filter out the new converstion in which the message is added
				// and then we add that newly added messages conversation at the top using unshift.
				let newConvos = [...state.conversations].filter((c) => c._id !== conversation._id);
				newConvos.unshift(conversation);

				state.conversations = newConvos;
			})
			.addCase(sendMessage.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const { updateMessagesAndConversations, clearConversation } = chatSlice.actions;

export default chatSlice.reducer;
