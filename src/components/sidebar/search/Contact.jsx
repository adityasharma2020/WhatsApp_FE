import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { open_create_conversation } from '../../../Slices/chatSlice';
import SocketContext from '../../../context/SocketContext';

const Contact = ({ contact }) => {
	const dispath = useDispatch();
	const { user } = useSelector((state) => state?.user);
	const { token } = user;
	const socket = useContext(SocketContext);
	const values = {
		receiver_id: contact._id,
		token,
	};
	const openConversation = async () => {
		let newConvo = await dispath(open_create_conversation(values));
		socket.emit('join conversation', newConvo?.payload?._id);
	};
	return (
		<li
			onClick={() => openConversation()}
			className='list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]'
		>
			{/* container */}
			<div className='flex items-center gap-x-3 py-[10px]'>
				{/* contact info */}
				<div className='flex items-center gap-x-3'>
					{/* contact user picture */}
					<div className='relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden'>
						<img
							src={contact.picture}
							alt={contact.name}
							className='w-full h-full object-cover'
						/>
					</div>

					{/* conversation name and message */}
					<div className='w-full flex flex-col '>
						{/* conversation name */}
						<h1 className='font-bold flex items-center gap-x-2'>{contact.name}</h1>
						{/* conversation status */}
						<div>
							<div className='flex  items-center gap-x-1 dark:text-dark_text_2'>
								<div className='flex-1 text-xs items-center gap-x-1 dark:text-dark_text_2'>
									<p>{contact?.status}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* border */}
			<div className='ml-16 border-b dark:border-b-dark_border_1'></div>
		</li>
	);
};

export default Contact;
