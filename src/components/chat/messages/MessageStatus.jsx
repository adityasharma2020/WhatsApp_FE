import React from 'react';
import { BsCheck, BsCheckAll } from 'react-icons/bs';
const MessageStatus = ({ messageStatus }) => {
	return (
		<div>
			{messageStatus === 'sent' && <BsCheck className='text-lg' />}
			{messageStatus === 'delivered' && <BsCheckAll className='text-lg' />}
			{messageStatus === 'read' && <BsCheckAll className='text-lg text-blue-400' />}
		</div>
	);
};

export default MessageStatus;
