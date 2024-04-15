import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../components/sidebar';
import { getConversations, updateMessagesAndConversations } from '../Slices/chatSlice';
import { WhatsappHome } from '../components/chat/welcome';
import { ChatContainer } from '../components/chat';
import SocketContext from '../context/SocketContext';

export default function Home() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { activeConversation } = useSelector((state) => state.chat);
	const socket = useContext(SocketContext);

	//------------join user into the socket.io--------------

	//join user into the socket
	useEffect(() => {
		socket.emit('join', user._id);
	}, [user]);

	//listening to reveived messages
	useEffect(() => {
		socket.on('receive message', (message) => {
			console.log(message);
			dispatch(updateMessagesAndConversations(message))
		});
	}, []);

	//--------------get conversations-------------------------
	useEffect(() => {
		if (user?.token) {
			dispatch(getConversations(user.token));
		}
	}, [user, dispatch]);

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
