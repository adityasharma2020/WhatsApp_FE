import { useContext, useEffect, useState } from 'react';
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
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [typing, setTyping] = useState(null);
	const [showSidebar, setShowSidebar] = useState(true); // Initially show the sidebar
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	//------------join user into the socket.io--------------

	//join user into the socket
	useEffect(() => {
		socket.emit('join', user._id);
		//get online users
		socket.on('get-online-users', (users) => {
			setOnlineUsers(users);
		});

		// Add event listener for resize
		const handleResize = () => {
			setIsSmallScreen(window.matchMedia('(max-width: 768px)').matches);
		};
		window.addEventListener('resize', handleResize);
		// Initial check for screen size
		setIsSmallScreen(window.matchMedia('(max-width: 768px)').matches);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [user]);

	useEffect(() => {
		//listening to reveived messages
		socket.on('receive message', (message) => {
			dispatch(updateMessagesAndConversations(message));
		});

		// listening to typing
		socket.on('typing', (conversation) => {
			console.log('typing');
			setTyping(conversation);
		});

		socket.on('stop typing', () => {
			setTyping(false);
		});
	}, [user]);

	//--------------get conversations-------------------------
	useEffect(() => {
		if (user?.token) {
			dispatch(getConversations(user.token));
		}
	}, [user, dispatch]);

	useEffect(() => {
		if (isSmallScreen) {
			setShowSidebar(!activeConversation?._id); // Show sidebar only if there's no active conversation
		} else {
			setShowSidebar(true); // Always show sidebar on larger screens
		}
	}, [activeConversation, isSmallScreen]);

	return (
		<div className='min-h-screen w-full  dark:bg-dark_bg_1  flex items-center justify-around overflow-hidden overflow-x-scroll scrollbar-hide'>
			{/* container */}

			<div className='container h-screen flex '>
				{/* sidebar */}
				{showSidebar && <Sidebar onlineUsers={onlineUsers} typing={typing} />}
				{activeConversation?._id && (
					<ChatContainer onlineUsers={onlineUsers} typing={typing} />
				)}
				{!isSmallScreen && !activeConversation?._id && <WhatsappHome />}
			</div>
		</div>
	);
}
