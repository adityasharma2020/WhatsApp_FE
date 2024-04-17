import moment from 'moment';
import React from 'react';
import TriangleIcon from '../../../svg/triangle';

import { useSelector } from 'react-redux';
import MessageStatus from './MessageStatus';

const Message = ({ message, me }) => {
	const { user } = useSelector((state) => state.user);

	return (
		<div className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? 'ml-auto justify-end' : ''}`}>
			{/* message container */}
			<div>
				<div
					className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${
						me ? 'bg-green_3' : 'dark:bg-dark_bg_2'
					}`}
				>
					{/* message */}
					<p className='float-left h-full text-sm pb-5 pr-8'>{message.message}</p>

					<div className='flex'>
						{/* message date */}
						<span className=' absolute right-1.5 bottom-1.5 float-right text-xs pt-6 text-dark_text_5 leading-none'>
							{moment(message.createdAt).format('HH:mm')}
						</span>

						{message.sender._id === user._id && (
							<MessageStatus messageStatus={message.messageStatus} />
						)}
					</div>

					{/* triangle */}
					{!me ? (
						<span>
							<TriangleIcon className='dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5' />
						</span>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Message;
