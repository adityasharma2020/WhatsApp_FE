import React, { useState } from 'react';
import Ringing from './Ringing';
import Header from './Header';
import CallArea from './CallArea';
import CallActions from './CallActions';
import Draggable, { DraggableCore } from 'react-draggable';

const Call = ({ call, setCall, callAccepted, userVideo, myVideo, stream, isSmallScreen }) => {
	const { receiveingCall, callEnded } = call;
	const [showActions, setShowActions] = useState(false);

	return (
		<>
			<Draggable disabled={isSmallScreen}>
				<div className='fixed top-0 left-0 sm:top-16 sm:left-1/3 -translate-x-1/2 -translate-y-1/2 h-full w-full sm:w-[350px] sm:h-[550px] rounded-2xl overflow-hidden callbg shadow-2xl'>
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
							<CallArea name='aditya sharma' />
							{/* call actions */}
							{showActions && <CallActions />}
						</div>

						{/*------- VIDEO STREAMS-------- */}
						<div>
							{/* user video  */}
							<div>
								<video
									ref={userVideo}
									playsInline
									muted
									autoPlay
									className='largeVideoCall'
								></video>
							</div>

							{/* my video */}
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
						</div>
					</div>

					{receiveingCall && !callAccepted ? (
						<Ringing call={call} setCall={setCall} />
					) : null}
				</div>
			</Draggable>
		</>
	);
};

export default Call;
