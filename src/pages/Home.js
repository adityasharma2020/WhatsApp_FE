import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../components/sidebar';
import { getConversations, updateMessagesAndConversations } from '../Slices/chatSlice';
import { WhatsappHome } from '../components/chat/welcome';
import { ChatContainer } from '../components/chat';
import SocketContext from '../context/SocketContext';
import Call from '../components/chat/call/Call';
import Peer from 'simple-peer';
import { getConversationId, getConversationName, getConversationPicture } from '../utils/chat';

const callData = {
	socketId: '',
	receiveingCall: false,
	callEnded: false,
	name: '',
	picture: '',
	signal: '',
};

export default function Home() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { activeConversation } = useSelector((state) => state.chat);
	const socket = useContext(SocketContext);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [typing, setTyping] = useState(null);
	const [showSidebar, setShowSidebar] = useState(true); // Initially show the sidebar
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [show, setShow] = useState(false);
	const [call, setCall] = useState(callData);
	const [callAccepted, setCallAccepted] = useState(false);
	const [stream, setStream] = useState();

	const { receiveingCall, callEnded, socketId } = call;
	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();

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

	// ------------------------Calling ------------------------
	useEffect(() => {
		setupMedia();
		socket.on('setup socket', (id) => {
			setCall({ ...call, socketId: id });
		});
		socket.on('call user', (data) => {
			setCall({
				...call,
				socketId: data.from,
				name: data.name,
				picture: data.picture,
				signal: data.signal,
				receiveingCall: true,
			});
		});
		socket.on('end call', () => {
			setShow(false);
			setCall({ ...call, callEnded: true, receiveingCall: false });
			myVideo.current.srcObject = null;
			if (callAccepted) {
				connectionRef?.current?.destroy();
			}
		});
	}, []);
	//--call user funcion
	const callUser = () => {
		enableMedia();
		setCall({
			...call,
			name: getConversationName(user, activeConversation.users),
			picture: getConversationPicture(user, activeConversation.users),
		});
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});
		peer.on('signal', (data) => {
			socket.emit('call user', {
				userToCall: getConversationId(user, activeConversation.users),
				signal: data,
				from: socketId,
				name: user.name,
				picture: user.picture,
			});
		});
		peer.on('stream', (stream) => {
			userVideo.current.srcObject = stream;
		});
		socket.on('call accepted', (signal) => {
			setCallAccepted(true);
			peer.signal(signal);
		});
		connectionRef.current = peer;
	};
	//--answer call  funcion
	const answerCall = () => {
		enableMedia();
		setCallAccepted(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});
		peer.on('signal', (data) => {
			socket.emit('answer call', { signal: data, to: call.socketId });
		});
		peer.on('stream', (stream) => {
			userVideo.current.srcObject = stream;
		});
		peer.signal(call.signal);
		connectionRef.current = peer;
	};
	//---------------------------------------------------
	// this functions uses browsers api to access camera and put that stream in stream variable
	const setupMedia = () => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream);
		});
	};

	const enableMedia = () => {
		myVideo.current.srcObject = stream;
		setShow(true);
	};

	//--------------------------------------------------------

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
		<>
			<div className='min-h-screen w-full  dark:bg-dark_bg_1  flex items-center justify-around overflow-hidden overflow-x-scroll scrollbar-hide'>
				{/* container */}
				{/* <div id='installApp'></div> */}
				<div className='container h-screen flex '>
					{/* sidebar */}
					{showSidebar && <Sidebar onlineUsers={onlineUsers} typing={typing} />}

					{activeConversation?._id && (
						<ChatContainer
							onlineUsers={onlineUsers}
							typing={typing}
							callUser={callUser}
						/>
					)}
					{!isSmallScreen && !activeConversation?._id && <WhatsappHome />}
				</div>
			</div>

			<div className={`${(show || call.signal) && !call.callEnded ? '' : 'hidden'}`}>
				<Call
					setCall={setCall}
					call={call}
					callAccepted={callAccepted}
					userVideo={userVideo}
					myVideo={myVideo}
					stream={stream}
					isSmallScreen={isSmallScreen}
					answerCall={answerCall}
				/>
			</div>
		</>
	);
}
