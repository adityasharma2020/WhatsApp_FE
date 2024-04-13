import React from 'react';

const Input = ({ message, setMessage, textRef }) => {
	const onChangeHandler = (e) => {
		setMessage(e.target.value);
		if (e.target.value.trim() === '') {
			setMessage('');
		}
	};

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
