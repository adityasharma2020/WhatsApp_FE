import React from 'react';
import { ArrowIcon, CallIcon, MuteIcon, PictureInPictureIcon } from '../../../svg';
import VideoDialIcon from '../../../svg/VideoDial';

const CallActions = ({
	toggleAudioTrack,
	toggleVideoTrack,
	toggleVideo,
	setToggleVideo,
	toggleAudio,
	setToggleAudio,
	endCall,
	handlePictureInPicture,
	setTogglePictureInPic,
	togglePictureInPic,
}) => {
	return (
		<div className='h-22 w-full absolute bottom-0 z-40 px-1 openToolsAnimation'>
			{/* container */}
			<div className='relative bg-[#222] px-4 pt-6 pb-12 rounded-xl'>
				{/* expand icon */}
				<button className='-rotate-90 scale-y-[250%] absolute top-1 left-1/2 '>
					<ArrowIcon className='fill-dark_svg_2' />
				</button>

				{/* Actions */}
				<ul className='flex items-center justify-between'>
					<li
						onClick={() => {
							setTogglePictureInPic((prev) => !prev);
							handlePictureInPicture(togglePictureInPic);
						}}
					>
						<button
							className={`${
								togglePictureInPic ? 'bg-green_4 ' : 'bg-red-400'
							} btn_secondary`}
						>
							<PictureInPictureIcon />
						</button>
					</li>

					<li
						onClick={() => {
							toggleVideoTrack();
							setToggleVideo((prev) => !prev);
						}}
					>
						<button
							className={`btn_secondary ${toggleVideo ? 'bg-red-400' : 'bg-green_4'}`}
						>
							<VideoDialIcon className='fill-white w-14 mt-2.5 h-10' />
						</button>
					</li>
					<li
						onClick={() => {
							toggleAudioTrack();
							setToggleAudio((prev) => !prev);
						}}
					>
						<button
							className={`btn_secondary ${toggleAudio ? 'bg-red-400' : 'bg-green_4'}`}
						>
							<MuteIcon className='fill-white w-7' />
						</button>
					</li>
					<li
						onClick={() => {
							endCall();
						}}
					>
						<button className='btn_secondary bg-red-600 p-1 '>
							<CallIcon className='fill-white ' />
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CallActions;
