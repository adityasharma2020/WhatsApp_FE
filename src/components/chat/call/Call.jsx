import React, { useState } from 'react';
import Ringing from './Ringing';
import Header from './Header';
import CallArea from './CallArea';
import CallActions from './CallActions';
import Draggable from 'react-draggable';

const Call = ({
	call,
	setCall,
	callAccepted,
	userVideo,
	myVideo,
	stream,
	answerCall,
	isSmallScreen,
	endCall,
}) => {
	const { receiveingCall, callEnded, name } = call;
	const [showActions, setShowActions] = useState(false);

	return (
		<div>
			<Draggable disabled={isSmallScreen}>
				<div
					className={`fixed top-0 left-0 sm:top-16 z-10  sm:left-1/3 -translate-x-1/2 -translate-y-1/2 h-full w-full sm:w-[350px] sm:h-[550px] rounded-2xl overflow-hidden callbg shadow-2xl  ${
						receiveingCall && !callAccepted ? 'hidden' : ''
					}`}
				>
					{/* container */}
					<div
						onMouseOver={() => setShowActions(true)}
						onMouseLeave={() => setShowActions(false)}
						onDoubleClick={() => setShowActions((prev) => !prev)}
						onTouchStart={(e) => {
							if (!showActions) {
								setShowActions(true);
							} else {
								setShowActions(false);
							}
						}}
					>
						<div>
							{/* header */}
							<Header />
							{/* call area */}
							<CallArea name={name} />
							{/* call actions */}
							{showActions && <CallActions endCall={endCall} />}
						</div>

						{/*------- VIDEO STREAMS-------- */}
						<div>
							{/* user video  */}
							{callAccepted && !callEnded && (
								<div>
									<video
										ref={userVideo}
										playsInline
										muted
										autoPlay
										className='largeVideoCall'
									></video>
								</div>
							)}

							{/* my video */}
							{stream && (
								<div>
									<video
										ref={myVideo}
										playsInline
										muted
										autoPlay
										className={`smallVideoCall ${
											showActions ? 'moveVideoCall' : ''
										}`}
									></video>
								</div>
							)}
						</div>
					</div>
				</div>
			</Draggable>

			{receiveingCall && !callAccepted ? (
				<Ringing call={call} setCall={setCall} answerCall={answerCall} endCall={endCall} />
			) : null}
		</div>
	);
};

export default Call;
