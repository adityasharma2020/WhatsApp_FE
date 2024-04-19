import React, { useEffect, useRef } from 'react';
import image from '../../../assets/bg_image.jpg';
import { useSelector } from 'react-redux';
import Message from './Message';
import Typing from './Typing';
import FileMessage from './FileMessage';

const ChatMessages = ({ typing }) => {
	const { messages, activeConversation,files } = useSelector((state) => state.chat);
	const { user } = useSelector((state) => state.user);
	const endRef = useRef();

	useEffect(() => {
		// when a new message added we make scroll to the end div that we added in last.
		endRef.current.scrollIntoView({ behaviour: 'smooth' });
	}, [messages, typing,files]);

	return (
		<div
			className='mb-[60px] bg-cover bg-no-repeat'
			style={{ backgroundImage: `url('${image}')` }}
		>
			{/* container */}
			<div className='scrollbar overflow_scrollbar overflow-auto py-3 px-[6%]'>
				{/* messages */}
				{messages &&
					messages.map((message) => {
						return (
							<div key={message._id}>
								{/* message file */}
								{message?.files.length > 0
									? message.files.map((file, index) => (
											<FileMessage
												fileMessage={file}
												message={message}
												key={`file-${message._id}-${index}`} //just to make a unique key dirrent form the top map function.
												me={user._id === message.sender._id}
											/>
									  ))
									: ''}
								{/* message text */}
								{message?.message.length > 0 ? (
									<Message
										message={message}
										me={user?._id === message.sender?._id}
										key={`text-${message._id}`} // Use a unique key for each FileMessage
									/>
								) : null}
							</div>
						);
					})}

				{typing === activeConversation._id ? <Typing /> : ''}
				{/* emty div for scrolling down */}
				<div ref={endRef}></div>
			</div>
		</div>
	);
};

export default ChatMessages;
