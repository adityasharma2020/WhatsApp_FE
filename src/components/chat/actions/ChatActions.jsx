import React, { useRef, useState } from 'react';
import EmojiPickerApp from './EmojiPicker.jsx';
import { Attachments } from './attachments';
import Input from './Input.jsx';
import SendIcon from '../../../svg/Send.js';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../Slices/chatSlice.js';
import { ClipLoader } from 'react-spinners';

const ChatActions = () => {
	const dispatch = useDispatch();
	const [message, setMessage] = useState('');
	const [showPicker, setShowPicker] = useState(false);
	const [showAttachments, setShowAttachments] = useState(false);
	const [loading, setLoading] = useState(false);
	const { activeConversation, status } = useSelector((state) => state.chat);
	const { user } = useSelector((state) => state.user);
	const { token } = user;
	const textRef = useRef();
	const values = {
		message,
		convo_id: activeConversation._id,
		token,
	};

	const SendMessageHander = async (e) => {
		setLoading(true);
		e.preventDefault();
		setShowAttachments(false);
		setShowPicker(false);
		await dispatch(sendMessage(values));
		setMessage('');
		setLoading(false);
	};
	return (
		<form
			onSubmit={(e) => SendMessageHander(e)}
			className='dark:bg-dark_bg_2 h-[55px]  w-full flex items-center absolute bottom-0  px-4 py-2 select-none'
		>
			{/* container */}
			<div className='w-full flex items-center gap-x-2'>
				{/* emojis and attachments */}
				<ul className='flex gap-x-2'>
					<EmojiPickerApp
						textRef={textRef}
						message={message}
						setMessage={setMessage}
						showPicker={showPicker}
						setShowPicker={setShowPicker}
						setShowAttachments={setShowAttachments}
					/>
					<Attachments
						showAttachments={showAttachments}
						setShowPicker={setShowPicker}
						setShowAttachments={setShowAttachments}
					/>
				</ul>

				{/* input */}
				<Input
					message={message}
					setMessage={setMessage}
					textRef={textRef}
					setShowAttachments={setShowAttachments}
					setShowPicker={setShowPicker}
				/>

				{/* send Button */}
				<button type='submit' className='btn'>
					{status === 'loading' && loading ? (
						<ClipLoader color='#E9EDEF' size={25} />
					) : (
						<SendIcon className='dark:fill-dark_svg_1' />
					)}
				</button>
			</div>
		</form>
	);
};

export default ChatActions;
