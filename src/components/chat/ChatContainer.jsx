import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversationMessages } from '../../Slices/chatSlice.js';
import ChatHeader from './header/ChatHeader.jsx';
import ChatMessages from './messages/ChatMessages.jsx';

const ChatContainer = () => {
	const { activeConversation, messages } = useSelector((state) => state.chat);
	const { user } = useSelector((state) => state.user);
	const { token } = user;

	const dispatch = useDispatch();
	const values = {
		token,
		convo_id: activeConversation?._id,
	};

	useEffect(() => {
		if (activeConversation._id) {
			dispatch(getConversationMessages(values));
		}
	}, [activeConversation?._id]);
	console.log('messages', messages);
	return (
		<div className='relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden'>
			{/* container */}
			<div className=''>
				{/* chat header */}
				<ChatHeader />
				{/* Chat messages */}
				<ChatMessages />
			</div>
		</div>
	);
};

export default ChatContainer;
