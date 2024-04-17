import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversationMessages } from '../../Slices/chatSlice.js';
import ChatHeader from './header/ChatHeader.jsx';
import ChatMessages from './messages/ChatMessages.jsx';
import { ChatActions } from './actions/index.js';
import { checkOnlineStatus } from '../../utils/chat.js';

const ChatContainer = ({ onlineUsers, typing }) => {
	const { activeConversation } = useSelector((state) => state.chat);
	const { user } = useSelector((state) => state.user);
	
	const { token } = user;

	const dispatch = useDispatch();
	const values = {
		token,
		convo_id: activeConversation?._id,
	};
	const dispatchHandler = async () => {
		await dispatch(getConversationMessages(values));
	};

	useEffect(() => {
		if (activeConversation._id) {
			dispatchHandler();
			
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeConversation?._id]);

	return (
		<div className='relative  h-full min-w-[100%] sm:min-w-[70%]  border-l dark:border-l-dark_border_2 select-none '>
			{/* container */}
			<div className=''>
				{/* chat header */}
				<ChatHeader
					online={checkOnlineStatus(onlineUsers, user, activeConversation.users)}
				/>

				{/* Chat messages */}
				<ChatMessages typing={typing} />

				{/* chat actions */}
				<ChatActions  />
			</div>
		</div>
	);
};

export default ChatContainer;
