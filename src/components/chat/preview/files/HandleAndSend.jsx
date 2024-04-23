import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon, SendIcon } from '../../../../svg';
import Add from './Add';
import { uploadFiles } from '../../../../utils/upload';
import { clearFiles, removeFileFromFiles, sendMessage } from '../../../../Slices/chatSlice';
import SocketContext from '../../../../context/SocketContext';
import { ClipLoader } from 'react-spinners';
import VideoThumbnail from 'react-video-thumbnail';

const HandleAndSend = ({ activeIndex, setActiveIndex, message }) => {
	const { files, activeConversation } = useSelector((state) => state.chat);
	const { user } = useSelector((state) => state.user);
	const { token } = user;
	const [numberOfFiles] = useState(files.length);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const socket = useContext(SocketContext);

	const sendMessageHandler = async (e) => {
		if (loading || files.length === 0) return;
		setLoading(true);
		// upload files first to clodunary
		const uploaded_files = await uploadFiles(files);

		//now send the message
		const values = {
			convo_id: activeConversation._id,
			token: token,
			message: message,
			files: uploaded_files.length > 0 ? uploaded_files : [],
		};

		
		let newMsg = await dispatch(sendMessage(values));
		// Emit the message
		socket.emit('send message', newMsg.payload);
		setLoading(false);

		dispatch(clearFiles());
	};

	// handle remove file
	const handleRemoveFile = (index) => {
		dispatch(removeFileFromFiles(index));
	};

	return (
		<div className='w-[97%] flex gap-x-4 justify-center items-center flex-wrap'>
			<div className='w-[80%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2 overflow-x-scroll scrollbar'>
				{/* empty */}
				{/* <span></span> */}
				{/* list files */}
				<div className='flex items-center gap-x-2'>
					{files.map((file, i) => (
						<div
							key={i}
							className={`fileThumbnail relative w-14 h-14 border border-white mt-2 rounded-md overflow-hidden cursor-pointer
           					${activeIndex === i ? 'border-[3px] !border-green_1' : ''}
           					`}
							onClick={() => setActiveIndex(i)}
						>
							{file.type === 'IMAGE' ? (
								<img
									src={file.fileData}
									alt=''
									className='w-full h-full object-cover'
								/>
							) : file?.type === 'VIDEO' ? (
								<VideoThumbnail videoUrl={file.fileData} /> // we can use video withut controllers here also, but it is good for seo.
							) : (
								<img
									src={`../../../../../images/file/${file.type}.png`}
									alt=''
									className='w-8 h-10 mt-1.5 ml-2.5'
								/>
							)}

							{/* remove file icon */}
							{activeIndex === i && (
								<div className='removeFileIcon' onClick={() => handleRemoveFile(i)}>
									<CloseIcon className='dark:fill-white absolute cursor-pointer  right-0 -top-0 w-5 h-5' />
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Add another file */}
			{numberOfFiles < 20 && <Add setActiveIndex={setActiveIndex} />}

			{/* empty space */}
			<span></span>
			{/* send button */}
			<div
				onClick={() => sendMessageHandler()}
				className='bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer'
			>
				{loading ? (
					<ClipLoader color='#E9EDEF' size={25} />
				) : (
					<SendIcon className='fill-white' />
				)}
			</div>
		</div>
	);
};

export default HandleAndSend;
