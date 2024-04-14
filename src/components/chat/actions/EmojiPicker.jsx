import React, { useEffect, useState } from 'react';
import { CloseIcon, EmojiIcon } from '../../../svg';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerApp = ({ textRef, setShowAttachments, setMessage, showPicker, setShowPicker }) => {
	const [cursorPosition, setCursorPosition] = useState();
	useEffect(() => {
		textRef.current.selectionEnd = cursorPosition;
	}, [cursorPosition,textRef]);

	useEffect(() => {
		// Calculate the new message whenever message or cursorPosition changes
		const ref = textRef.current;
		if (!ref) return;

		const start = ref.value.substring(0, ref.selectionStart);
		const end = ref.value.substring(ref.selectionStart);
		const newText = start + end;

		// Update the message state
		setMessage(newText);

		// Update the cursor position
		setCursorPosition(start.length);
	}, [textRef, setMessage]);

	const handleEmoji = (emojiData, e) => {
		const { emoji } = emojiData;

		// Take the ref of the input
		const ref = textRef.current;
		if (!ref) return;

		// Ensure the input is in focus
		ref.focus();

		// Get the start and end parts of the message
		const start = ref.value.substring(0, ref.selectionStart);
		const end = ref.value.substring(ref.selectionStart);

		// Construct the new message with the emoji
		const newText = start + emoji + end;

		// Update the message state
		setMessage(newText);

		// Update the cursor position
		setCursorPosition(start.length + emoji.length);
	};

	return (
		<li>
			<button
				onClick={() => {
					setShowAttachments(false);
					setShowPicker((prev) => !prev);
				}}
				className='btn'
				type='button'
			>
				{showPicker ? (
					<CloseIcon className='dark:fill-dark_svg_1' />
				) : (
					<EmojiIcon className='dark:fill-dark_svg_1' />
				)}
			</button>

			{/* Emoji picker */}
			{showPicker ? (
				<div className='w-full openEmojiAnimation absolute bottom-[55px] -left-[0.5px]'>
					<EmojiPicker theme='dark' onEmojiClick={handleEmoji} />
				</div>
			) : null}
		</li>
	);
};

export default EmojiPickerApp;
