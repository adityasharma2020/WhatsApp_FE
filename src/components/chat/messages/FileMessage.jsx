import React from 'react';
import TriangleIcon from '../../../svg/triangle';
import moment from 'moment';
import { useSelector } from 'react-redux';
import MessageStatus from './MessageStatus';
import FileImageVideo from './FileImageVideo';
import FileOthers from './FileOthers';

const FileMessage = ({ fileMessage, me, message }) => {
	const { user } = useSelector((state) => state.user);
	const { file, type } = fileMessage;
	return (
		<div className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? 'ml-auto justify-end' : ''}`}>
			{/* message container */}
			<div>
				<div
					className={`relative h-full dark:text-dark_text_1 p-1 rounded-lg 
                    ${me ? 'bg-green_3' : 'dark:bg-dark_bg_2'}
                  
                    `}
				>
					{/* message */}
					<div className=' h-full text-sm pb-5 '>
						{type === 'IMAGE' || type === 'VIDEO' ? (
							<FileImageVideo url={file.secure_url} type={type} />
						) : (
							<FileOthers file={file} type={type} me={me} />
						)}
					</div>

					<div className='flex justify-end'>
						{/* message date */}
						<span className=' absolute right-8 bottom-1.5 float-right text-xs  text-dark_text_5 leading-none'>
							{moment(message.createdAt).format('HH:mm')}
						</span>

						{message.sender._id === user._id && (
							<div className=' absolute right-1.5 bottom-1.5 float-right'>
								<MessageStatus messageStatus={message.messageStatus} />
							</div>
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

export default FileMessage;
