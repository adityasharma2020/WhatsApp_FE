import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateHandler } from '../../../utils/date';
import { open_create_conversation } from '../../../Slices/chatSlice';
import {
	getConversationId,
	getConversationName,
	getConversationPicture,
} from '../../../utils/chat';
import { capitalize } from '../../../utils/string';
import SocketContext from '../../../context/SocketContext';
import MessageStatus from '../../chat/messages/MessageStatus';

const Conversation = ({ convo }) => {
	const dispath = useDispatch();
	const { user } = useSelector((state) => state?.user);
	const { activeConversation } = useSelector((state) => state?.chat);
	const { token } = user;
	const socket = useContext(SocketContext);
	const values = {
		receiver_id: getConversationId(user, convo?.users),
		token,
	};
	const openConversation = async () => {
		let newConvo = await dispath(open_create_conversation(values));
		socket.emit('join conversation', newConvo?.payload?._id);
	};

	return (
		<li
			onClick={() => openConversation()}
			className={`list-none h-[71px] w-full dark:bg-dark_bg_1 hover:${
				convo?._id !== activeConversation?._id ? 'dark:bg-dark_bg_2' : ''
			} cursor-pointer dark:text-dark_text_1 px-[10px] ${
				convo?._id === activeConversation?._id ? 'dark:bg-dark_hover_1' : ''
			}`}
		>
			{/* container */}
			<div className='relative w-full flex items-center justify-between py-[10px]'>
				{/* left */}
				<div className='flex items-center gap-x-4'>
					{/* conversation user picture */}
					<div className='relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden'>
						<img
							src={getConversationPicture(user, convo.users)}
							alt='conversationPic'
							className='w-full h-full object-cover'
						/>
					</div>

					{/* conversation name and message */}
					<div className='w-full flex flex-col '>
						{/* conversation name */}
						<h1 className='font-bold flex items-center gap-x-2'>
							{capitalize(getConversationName(user, convo.users))}
						</h1>
						{/* conversation message */}
						<div>
							<div className='flex  items-center gap-x-1 dark:text-dark_text_2'>
								<div className='flex text-xs items-center gap-x-1 dark:text-dark_text_2'>
									{convo.latestMessage.sender._id === user._id && (
										<MessageStatus
											messageStatus={convo.latestMessage.messageStatus}
										/>
									)}

									<p>
										{[...convo?.latestMessage?.message].length > 15 // we are spreading the message into an array because , emojis  make length function diffrently
											? `${convo?.latestMessage?.message.substring(0, 25)}..`
											: convo?.latestMessage?.message}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* right */}
				<div className='flex flex-col gap-y-4 items-end text-xs'>
					<span className='dark:text-dark_text_2'>
						{convo?.latestMessage?.createdAt &&
							dateHandler(convo.latestMessage?.createdAt)}
					</span>
				</div>
			</div>

			{/* border */}
			<div className='ml-16 border-b dark:border-b-dark_border_1'></div>
		</li>
	);
};

export default Conversation;
