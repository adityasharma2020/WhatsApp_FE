import React from 'react';
import image from '../../../bg_image.jpg';
import { useSelector } from 'react-redux';
import Message from './Message';

const ChatMessages = () => {
	const { messages } = useSelector((state) => state.chat);
	const { user } = useSelector((state) => state.user);
	return (
		<div
			className='mb-[60px] bg-cover bg-no-repeat'
			style={{ backgroundImage: `url('${image}')` }}
		>
			{/* container */}
			<div className='scrollbar overflow_scrollbar overflow-auto py-2 px-[6%]'>
				{/* messages */}
				{messages &&
					messages.map((message) => {
						return (
							<Message
								message={message}
								me={user?._id === message.sender?._id}
								key={message?._id}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default ChatMessages;
