import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../components/sidebar';
import { getConversations } from '../Slices/chatSlice';
import { WhatsappHome } from '../components/chat/welcome';
import { ChatContainer } from '../components/chat';
import SocketContext from '../context/SocketContext';

export default function Home() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { activeConversation } = useSelector((state) => state.chat);
	// const socket = useContext(SocketContext);
	//get conversations
	useEffect(() => {
		if (user.token) {
			dispatch(getConversations(user.token));
		}
	}, [user, dispatch]);
	// console.log(socket);
	return (
		<div className='min-h-screen w-full dark:bg-dark_bg_1   flex items-center justify-around overflow-hidden'>
			{/* container */}

			<div className='container h-screen flex '>
				{/* sidebar */}
				<Sidebar />
				{activeConversation?._id ? <ChatContainer /> : <WhatsappHome />}
			</div>
		</div>
	);
}
