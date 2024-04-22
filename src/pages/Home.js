import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../components/sidebar';
import {
	getConversations,

	updateMessagesAndConversations,
} from '../Slices/chatSlice';
import { WhatsappHome } from '../components/chat/welcome';
import { ChatContainer } from '../components/chat';
import SocketContext from '../context/SocketContext';
import Call from '../components/chat/call/Call';
import Peer from 'simple-peer';
import { getConversationId, getConversationName, getConversationPicture } from '../utils/chat';
import toast, { Toaster } from 'react-hot-toast';

const callData = {
	socketId: '',
	callEnded: false,
	gettingCall: false,
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

	const [stream, setStream] = useState();
	const [callAccepted, setCallAccepted] = useState(false);
	//---------
	const [call, setCall] = useState(callData);
	const {  socketId } = call;
	const [show, setShow] = useState(false);
	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();
	const [callEndedTrigger, setCallEndedTrigger] = useState(false);

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
	}, [socket, user]);

	// ------------------------Calling effect ------------------------

	useEffect(() => {
		if (stream) {
			// Add event listener to track
			myVideo.current.srcObject = stream;
			stream.getTracks().forEach((track) => {});
		}
	}, [stream]);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			navigator.mediaDevices
				.getUserMedia({ video: true, audio: true })
				.then((stream) => {
					setStream(stream);
				})
				.catch((error) => {
					console.log('Error accessing media devices:', error);
				});
		}

		socket.on('setup socket', (id) => {
			setCall({ ...call, socketId: id });
		});

		socket.on('incoming call', (data) => {
			console.log('dattaaaaaaaaaaaa:::', data);
			setCall({
				...call,
				name: data.name,
				picture: data.picture,
				signal: data.signal,
				socketId: data.from,
				gettingCall: true,
			});
			setShow(true);
		});

		socket.on('not responded', async () => {
			console.log('not respondeddddddd');
			if (connectionRef.current) {
				connectionRef.current.destroy();
			}

			if (stream) {
				// Stop media devices
				const tracks = stream.getTracks();
				tracks.forEach((track) => track.stop());
			}

			setShow(false);
			setCall({
				...call,
				callEnded: false,
				gettingCall: false,
				name: '',
				picture: '',
			});
		});

		socket.on('call rejected', async () => {
			console.log('not respondeddddddd');
			if (connectionRef.current) {
				connectionRef.current.destroy();
			}

			if (stream) {
				// Stop media devices
				const tracks = stream.getTracks();
				tracks.forEach((track) => track.stop());
			}

			setShow(false);
			setCall({
				...call,
				callEnded: false,
				gettingCall: false,
				name: '',
				picture: '',
			});
			setCallAccepted(false);
		});

		socket.on('end call', () => {
			setShow(false);
			setCall({ ...call, callEnded: true, gettingCall: false, name: '', picture: '' });

			if (stream) {
				// Stop media devices
				const tracks = stream.getTracks();
				tracks.forEach((track) => track.stop());
			}
			connectionRef.current.destroy();

			setCallAccepted(false);
		});

		// Cleanup function to stop media devices when component unmounts
		return () => {
			mounted = false;
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
			}
		};
	}, [call, socket, connectionRef, stream]);

	// -------------------calling functions----------------------

	const callUser = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			setStream(stream);
			setShow(true);
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
			console.log('socketId::::::::', socketId);
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
		} catch (error) {
			if (connectionRef.current) {
				connectionRef.current.destroy();
			}
			toast.error('Error:', error);
		}
	};

	const answerCall = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			setStream(stream);
			setShow(true);
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
		} catch (error) {
			if (connectionRef.current) {
				connectionRef.current.destroy();
			}
			toast.error('Error:', error);
		}
	};

	// -----------------------------------
	const endCall = () => {
		setShow(false);
		setCall({
			...call,
			callEnded: false,
			gettingCall: false,
			name: '',
			picture: '',
			signal: '',
		});
		setCallAccepted(false);

		if (myVideo) {
			myVideo.current.srcObject = null;
			console.log('inside end call', call.socketId);
			socket.emit('end call', call.socketId);

			connectionRef.current.destroy();
		}

		setCallEndedTrigger((prevState) => !prevState);
	};

	const callNotRespond = () => {
		console.log('caller side calldata.socketId:', call.socketId);
		socket.emit('not responded', { to: call.socketId });
	};

	const callRejected = () => {
		setShow(false);
		setCall({ ...call, gettingCall: false });
		socket.emit('call rejected', { to: call.socketId });
	};

	// Toggle audio track function
	const toggleAudioTrack = () => {
		if (stream) {
			const audioTracks = stream.getAudioTracks();
			if (audioTracks.length > 0) {
				const audioTrack = audioTracks[0];
				audioTrack.enabled = !audioTrack.enabled;
				console.log(`Audio track ${audioTrack.enabled ? 'enabled' : 'disabled'}`);
			} else {
				console.log('No audio track found in the stream');
			}
		} else {
			console.log('No active stream available');
		}
	};

	// Toggle video track function
	const toggleVideoTrack = () => {
		if (stream) {
			const videoTracks = stream.getVideoTracks();
			if (videoTracks.length > 0) {
				const videoTrack = videoTracks[0];
				videoTrack.enabled = !videoTrack.enabled;
				console.log(`Video track ${videoTrack.enabled ? 'enabled' : 'disabled'}`);
			} else {
				console.log('No Video track found in the stream');
			}
		} else {
			console.log('No active Video stream available');
		}
	};
	useEffect(() => {}, [callEndedTrigger]);

	//--------------------------------------------------------

	useEffect(() => {
		//listening to reveived messages
		socket.on('receive message', (message) => {
			dispatch(updateMessagesAndConversations(message));
			console.log("receive an socket event");
			// Check if the received message is from another user
			// if (
			// 	activeConversation &&
			// 	activeConversation.latestMessage &&
			// 	activeConversation.latestMessage.sender._id !== user._id
			// ) {
			// 	socket.emit('messages seen', {
			// 		convo_id: activeConversation._id,
			// 		chatUserId: getConversationId(user, activeConversation.users),
			// 	});
			// }
		});

		// listening to typing
		socket.on('typing', (conversation) => {
			setTyping(conversation);
		});

		socket.on('stop typing', () => {
			setTyping(false);
		});

		return () => {
			// Clean up event listeners
			socket.off('receive message');
			socket.off('typing');
			socket.off('stop typing');
		};
	}, [dispatch, socket]);


	// useEffect(() => {
	// 	socket.on('messages seen', ({ convo_id }) => {
	// 		if (activeConversation && activeConversation._id === convo_id) {
	// 			dispatch(updateMessageSeen());
	// 		}
	// 	});

		// No dependencies in the array, so the effect runs on every render/update
	// });
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

	const handlePictureInPicture = (state) => {
		if (userVideo && userVideo.current) {
			if (state) {
				// Request Picture-in-Picture mode
				userVideo.current.requestPictureInPicture().catch((error) => {
					console.error('Error entering Picture-in-Picture mode:', error);
				});
			} else {
				// Exit Picture-in-Picture mode
				document.exitPictureInPicture().catch((error) => {
					console.error('Error exiting Picture-in-Picture mode:', error);
				});
			}
		}
	};
	useEffect(() => {
		document.addEventListener('visibilitychange', (event) => {
			if (document.visibilityState === 'visible') {
				if (document.pictureInPictureElement) {
					document.exitPictureInPicture();
				}
			}
		});
	});

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
			<Toaster />
			<div className={show ? '' : 'hidden'}>
				<Call
					call={call}
					setCall={setCall}
					callAccepted={callAccepted}
					myVideo={myVideo}
					userVideo={userVideo}
					stream={stream}
					answerCall={answerCall}
					show={show}
					setShow={setShow}
					callNotRespond={callNotRespond}
					toggleAudioTrack={toggleAudioTrack}
					toggleVideoTrack={toggleVideoTrack}
					endCall={endCall}
					handlePictureInPicture={handlePictureInPicture}
					callRejected={callRejected}
				/>
			</div>
		</>
	);
}
