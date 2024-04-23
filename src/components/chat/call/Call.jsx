import React, { useState } from 'react';
import Ringing from './Ringing';
import Header from './Header';
import CallArea from './CallArea';
import CallActions from './CallActions';
import Draggable from 'react-draggable';

const Call = ({
	call,
	setCall,
	
	myVideo,
	stream,
	userVideo,
	answerCall,
	show,
	setShow,
	callNotRespond,
	toggleAudioTrack,
	toggleVideoTrack,
	endCall,
	handlePictureInPicture,
	callRejected,
	totalSecInCall,
	setTotalSecInCall,
	togglePictureInPic,
	setTogglePictureInPic
}) => {
	const [showActions, setShowActions] = useState(false);
	const { gettingCall, name,callAccepted,callEnded } = call;
	const [toggleAudio, setToggleAudio] = useState(false);
	const [toggleVideo, setToggleVideo] = useState(false);
	

	return (
		<div>
			<Draggable>
				<div
					className={`fixed top-0 left-0 sm:top-16 z-10  sm:left-1/3 -translate-x-1/2 -translate-y-1/2 h-full w-full sm:w-[350px] sm:h-[550px] rounded-2xl overflow-hidden callbg shadow-2xl  ${
						gettingCall && !callAccepted ? 'hidden' : ''
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
							<CallArea
								name={name}
								callAccepted={callAccepted}
								setTotalSecInCall={setTotalSecInCall}
								totalSecInCall={totalSecInCall}
								callEnded={callEnded}
							/>
							{/* call actions */}
							{showActions && (
								<CallActions
									toggleAudioTrack={toggleAudioTrack}
									toggleVideoTrack={toggleVideoTrack}
									toggleAudio={toggleAudio}
									setToggleAudio={setToggleAudio}
									toggleVideo={toggleVideo}
									setToggleVideo={setToggleVideo}
									setTogglePictureInPic={setTogglePictureInPic}
									togglePictureInPic={togglePictureInPic}
									endCall={endCall}
									handlePictureInPicture={handlePictureInPicture}
								/>
							)}
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
				</div>
			</Draggable>

			{gettingCall && !callAccepted ? (
				<Ringing
					answerCall={answerCall}
					call={call}
					setCall={setCall}
					callAccepted={callAccepted}
					setShow={setShow}
					callNotRespond={callNotRespond}
					callRejected={callRejected}
				/>
			) : (
				<></>
			)}
		</div>
	);
};

export default Call;
