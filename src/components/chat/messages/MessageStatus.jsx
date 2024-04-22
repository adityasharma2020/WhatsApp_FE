import React from 'react';
import { BsCheck, BsCheckAll } from 'react-icons/bs';
const MessageStatus = ({ messageStatus }) => {
	return (
		<div>
			{messageStatus === 'sent' && <BsCheck className='text-lg' />}
			{messageStatus === false && <BsCheckAll className='text-lg' />}
			{messageStatus === true && <BsCheckAll className='text-lg text-blue-400' />}
		</div>
	);
};

export default MessageStatus;
