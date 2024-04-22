import moment from 'moment';
import React from 'react';
import TriangleIcon from '../../../svg/triangle';
import MessageStatus from './MessageStatus';


const Message = ({ message, me }) => {

	

	return (
		<div className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? 'ml-auto justify-end' : ''}`}>
			{/* message container */}
			<div>
				<div
					className={`relative h-full w-full  dark:text-dark_text_1 p-2 rounded-lg ${
						me ? 'bg-green_3' : 'dark:bg-dark_bg_2'
					}`}
				>
					{/* message */}
					<p className='float-left h-full text-sm pb-8 pr-8  break-all'>
						{message.message}
					</p>

					<div className='flex justify-center items-center'>
						{me && (
							<div className=' absolute right-10 bottom-1 float-right'>
								<MessageStatus messageStatus={message.seen} />
							</div>
						)}
						{/* message date */}
						<span className=' absolute right-1.5 bottom-1 float-right text-xs pt-6 text-dark_text_5 leading-none'>
							{moment(message.createdAt).format('HH:mm')}
						</span>
					</div>

					{/* triangle */}
					{!me ? (
						<span>
							<TriangleIcon className=' fill-transparent rotate-[60deg] absolute top-[-5px] -left-1.5' />
						</span>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Message;
