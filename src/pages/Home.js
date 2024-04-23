import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../components/sidebar';
import {
	getConversations,
	updateMessageSeen,
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
	ourSocketId: '',
	receiverSocketId: '',
	callEnded: false,
	gettingCall: false,
	callAccepted: false,
	name: '',
	picture: '',
	signal: '',
};

export default function Home() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { activeConversation, messages } = useSelector((state) => state.chat);
	const socket = useContext(SocketContext);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [typing, setTyping] = useState(null);
	const [showSidebar, setShowSidebar] = useState(true); // Initially show the sidebar
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [totalSecInCall, setTotalSecInCall] = useState(0);
	const [call, setCall] = useState(callData);
	const [togglePictureInPic, setTogglePictureInPic] = useState(false);
	const [stream, setStream] = useState();
	const [callKey, setCallKey] = useState(0);
	const { callAccepted } = call;
	//---------

	const [show, setShow] = useState(false);
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
		setupMedia();
		socket.on('setup socket', (id) => {
			setCall((prev) => ({
				...prev,
				ourSocketId: id,
			}));
		});

		socket.on('incoming call', (data) => {
			
			if (callAccepted) return;
			setCall((prev) => ({
				...prev,
				name: data.name,
				picture: data.picture,
				signal: data.signal,
				receiverSocketId: data.from,
				gettingCall: true,
			}));
			// setShow(true);
		});

		socket.on('not responded', async () => {
		

			if (stream) {
				// Stop media devices
				const tracks = stream.getTracks();
				tracks.forEach((track) => track.stop());
			}

			setShow(false);
			setCall((prev) => ({
				...prev,
				callEnded: false,
				gettingCall: false,
				receiverSocketId: '',
				name: '',
				picture: '',
				signal: '',
			}));
		});

		socket.on('call rejected', async () => {
		
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
				receiverSocketId: '',
				name: '',
				picture: '',
				callAccepted: false,
			});
			setCallKey((prevKey) => prevKey + 1);
		});

		socket.on('end call', ({ to }) => {
			setShow(false);
		
			setCall((prev) => ({
				...prev,
				callEnded: false,
				gettingCall: false,
				receiverSocketId: '',
				name: '',
				picture: '',
				signal: '',
				ourSocketId: to,
				callAccepted: false,
			}));

			if (stream) {
				// Stop media devices
				const tracks = stream.getTracks();
				tracks.forEach((track) => track.stop());
			}
			if (connectionRef.current) {
				// Close the peer connection
				connectionRef.current.destroy();

				// Optionally, set the reference to null or perform any cleanup
				connectionRef.current = null;
			}
			// connectionRef.current.destroy();
			setCallKey((prevKey) => prevKey + 1);
		
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);



	const setupMedia = () => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				setStream(stream);
			})
			.catch((error) => {
				
			});
	};

	// -------------------calling functions----------------------

	const callUser = async () => {
		try {
			myVideo.current.srcObject = stream;
			setShow(true);
			setCall((prev) => ({
				...prev,
				name: getConversationName(user, activeConversation.users),
				picture: getConversationPicture(user, activeConversation.users),
				callEnded: false,
			}));
			const peer = new Peer({
				initiator: true,
				trickle: false,
				stream: stream,
			});

			peer.on('signal', (data) => {
				socket.emit('call user', {
					userToCall: getConversationId(user, activeConversation.users),
					signal: data,
					from: call.ourSocketId,
					name: user.name,
					picture: user.picture,
					callAccepted: true,
				});
			});
			peer.on('stream', (stream) => {
				userVideo.current.srcObject = stream;
			});
			socket.on('call accepted', ({ signal, receiverId }) => {
				setCall((prev) => ({
					...prev,
					betweenACall: true,
					callAccepted: true,
					receiverSocketId: receiverId,
				}));
				peer.signal(signal);
			});

			connectionRef.current = peer;
		} catch (error) {
			toast.error('Error:', error);
		}
	};

	const answerCall = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			setStream(stream);
			setShow(true);
			if (myVideo && myVideo.current) {
				myVideo.current.srcObject = stream;
			}
			setCall((prev) => ({ ...prev, callAccepted: true }));
			const peer = new Peer({
				initiator: false,
				trickle: false,
				stream: stream,
			});
			peer.on('signal', (data) => {
				socket.emit('answer call', {
					signal: data,
					from: call.ourSocketId,
					to: call.receiverSocketId,
				});
			});
			peer.on('stream', (stream) => {
				userVideo.current.srcObject = stream;
			});
			peer.signal(call.signal);
			connectionRef.current = peer;
		} catch (error) {
			toast.error('Error:', error);
		}
	};
	

	// -----------------------------------
	const endCall = () => {
		setShow(false);
		setCall((prev) => ({
			...prev,
			callEnded: false,
			gettingCall: false,
			receiverSocketId: '',
			name: '',
			picture: '',
			signal: '',
			callAccepted: false,
		}));

		// myVideo.current.srcObject = null;

		socket.emit('end call', call.receiverSocketId);

		if (connectionRef.current) {
			// Close the peer connection
			connectionRef.current.destroy();

			// Optionally, set the reference to null or perform any cleanup
			connectionRef.current = null;
		}
		setCallKey((prevKey) => prevKey + 1);
		// setCallEndedTrigger((prevState) => !prevState);
	};

	const callNotRespond = () => {
		
		socket.emit('not responded', { to: call.receiverSocketId });
	};

	const callRejected = () => {
		setShow(false);
		setCall((prev) => ({ ...prev, gettingCall: false, signal: '' }));
		socket.emit('call rejected', { to: call.receiverSocketId });
		setCallKey((prevKey) => prevKey + 1);
	};

	// Toggle audio track function
	const toggleAudioTrack = () => {
		if (stream) {
			const audioTracks = stream.getAudioTracks();
			if (audioTracks.length > 0) {
				const audioTrack = audioTracks[0];
				audioTrack.enabled = !audioTrack.enabled;
				
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

	//--------------------------------------------------------
	console.log('rendered.....');
	useEffect(() => {
		//listening to reveived messages
		socket.on('receive message', (message) => {
			dispatch(updateMessagesAndConversations(message));
			console.log('receive an socket event');
			// Check if the received message is from another user
			if (activeConversation && activeConversation.latestMessage) {
				socket.emit('messages seen', {
					convo_id: activeConversation._id,
					chatUserId: getConversationId(user, activeConversation.users),
				});
			}
			socket.on('messages seen', ({ convo_id }) => {
				if (activeConversation && activeConversation._id === convo_id) {
					dispatch(updateMessageSeen());
				}
			});
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
	}, [activeConversation, activeConversation.latestMessage, dispatch, socket, messages, user]);

	useEffect(() => {
		// Check if the received message is from another user
		if (activeConversation && activeConversation.latestMessage) {
			socket.emit('messages seen', {
				convo_id: activeConversation._id,
				chatUserId: getConversationId(user, activeConversation.users),
			});
		}
		socket.on('messages seen', ({ convo_id }) => {
			if (activeConversation && activeConversation._id === convo_id) {
				dispatch(updateMessageSeen());
			}
		});
	}, [activeConversation, dispatch, socket, user]);
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
			if (state === false) {
				// Request Picture-in-Picture mode
				userVideo.current.requestPictureInPicture().catch((error) => {
					console.error('Error entering Picture-in-Picture mode:', error);
				});
			} else if (state === true) {
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
			<div className={show || call.gettingCall ? '' : 'hidden'}>
				<Call
					call={call}
					setCall={setCall}
					myVideo={myVideo}
					userVideo={userVideo}
					stream={stream}
					answerCall={answerCall}
					show={show}
					setShow={setShow}
					key={callKey}
					callNotRespond={callNotRespond}
					toggleAudioTrack={toggleAudioTrack}
					toggleVideoTrack={toggleVideoTrack}
					endCall={endCall}
					handlePictureInPicture={handlePictureInPicture}
					callRejected={callRejected}
					totalSecInCall={totalSecInCall}
					setTotalSecInCall={setTotalSecInCall}
					togglePictureInPic={togglePictureInPic}
					setTogglePictureInPic={setTogglePictureInPic}
					isSmallScreen={isSmallScreen}
				/>
			</div>
		</>
	);
}
