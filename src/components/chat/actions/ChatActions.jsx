import React from 'react';
import EmojiPicker from './EmojiPicker.jsx';
import Attachments from './Attachments.jsx';
import Input from './Input.jsx';
import SendIcon from '../../../svg/Send.js';

const ChatActions = () => {
	return (
		<form className='dark:bg-dark_bg_2 h-[55px] w-full flex items-center absolute bottom-0  px-4 py-2 select-none'>
			{/* container */}
			<div className='w-full flex items-center gap-x-2'>
				{/* emojis and attachments */}
				<ul className='flex gap-x-2'>
					<EmojiPicker />
					<Attachments />
				</ul>

				{/* input */}
				<Input />

				{/* send Button */}
				<button className='btn'>
					<SendIcon className='dark:fill-dark_svg_1' />
				</button>
			</div>
		</form>
	);
};

export default ChatActions;
