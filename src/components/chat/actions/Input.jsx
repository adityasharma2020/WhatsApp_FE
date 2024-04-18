import React, { useContext, useEffect, useRef } from 'react';
import SocketContext from '../../../context/SocketContext';
import { useSelector } from 'react-redux';

const Input = ({ message, setMessage, textRef }) => {
	const { activeConversation } = useSelector((state) => state.chat);
	const socket = useContext(SocketContext);

	const typingRef = useRef(false);
	const lastTypingTimeRef = useRef(0);

	const onChangeHandler = (e) => {
		setMessage(e.target.value);
		if (!typingRef.current) {
			typingRef.current = true;
			socket.emit('typing', activeConversation._id);
		}
		lastTypingTimeRef.current = new Date().getTime();
		let timer = 1000;

		// Delay execution of the setTimeout callback by 5 seconds
		setTimeout(() => {
			let timeNow = new Date().getTime();
			let timeDiff = timeNow - lastTypingTimeRef.current;
			if (timeDiff >= timer && typingRef.current) {
				socket.emit('stop typing', activeConversation._id);
				typingRef.current = false;
			}
		}, timer);
	};

	useEffect(() => {
		setMessage('');
	}, [activeConversation, setMessage]);

	return (
		<div className='w-full'>
			<input
				type='text'
				value={message}
				onChange={onChangeHandler}
				className='dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none  h-[45px] w-full flex-1 rounded-lg pl-4'
				placeholder='Type a message'
				ref={textRef}
			/>
		</div>
	);
};

export default Input;
