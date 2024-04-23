import React from 'react';
import { capitalize } from '../../../utils/string';
import CallTimes from './CallTimes';

const CallArea = ({ name, totalSecInCall, setTotalSecInCall,callEnded, callAccepted }) => {
	return (
		<div className='absolute top-12 z-40 w-full p-1 cursor-pointer'>
			{/* container */}
			<div className='flex flex-col items-center'>
				{/* call infos */}
				<div className='flex flex-col items-center gap-y-1'>
					<h1 className='text-white text-lg'>
						<b>{name ? capitalize(name) : ''}</b>
					</h1>
					{totalSecInCall === 0 ? (
						<span className='text-dark_text_1'>Ringing...</span>
					) : null}
					<CallTimes
					callEnded={callEnded}
						totalSecInCall={totalSecInCall}
						setTotalSecInCall={setTotalSecInCall}
						callAccepted={callAccepted}
					/>
				</div>
			</div>
		</div>
	);
};

export default CallArea;
