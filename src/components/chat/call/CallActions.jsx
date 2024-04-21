import React from 'react';
import { ArrowIcon, CallIcon, MuteIcon } from '../../../svg';
import SpeakerIcon from '../../../svg/Speaker';
import VideoDialIcon from '../../../svg/VideoDial';


const CallActions = ({ endCall }) => {
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
					<li>
						<button className='btn_secondary'>
							<SpeakerIcon className='fill-white w-7' />
						</button>
					</li>
					<li>
						<button className='btn_secondary'>
							<VideoDialIcon className='fill-white w-14 mt-2.5' />
						</button>
					</li>
					<li>
						<button className='btn_secondary'>
							<MuteIcon className='fill-white w-7' />
						</button>
					</li>
					<li onClick={endCall}>
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
