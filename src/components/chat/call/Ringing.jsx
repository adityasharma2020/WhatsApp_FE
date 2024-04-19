import React, { useEffect, useState } from 'react';
import { CloseIcon } from '../../../svg';
import ValidIcon from '../../../svg/Valid';
import { BsCheck } from 'react-icons/bs';

const Ringing = ({ call, setCall }) => {
	const { receiveingCall, callEnded } = call;
	const [timer, setTimer] = useState(0);

	let interval;
	const handleTimer = () => {
		interval = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 1000);
	};
	console.log(timer);

	useEffect(() => {
		if (timer <= 5) {
			handleTimer();
		} else {
			setCall({ ...call, receiveingCall: false });
		}
		return () => clearInterval(interval);
	}, [timer]);

	// useEffect(() => {
	// 	// Play the audio when the component mounts
	// 	const audio = new Audio('/ringing.mp3');
	// 	audio.play().catch((error) => {
	// 		// Audio playback failed, handle error if needed
	// 		console.error('Audio playback failed:', error);
	// 	});

	// 	return () => {
	// 		// Clean up function to stop audio when the component unmounts
	// 		audio.pause();
	// 	};
	// }, []);

	return (
		<div className='w-[80%] md:w-[50%] lg:w-[30%] dark:bg-dark_bg_5 rounded-lg fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl z-40'>
			{/* Container */}
			<div className='p-4 flex items-center justify-between gap-x-8'>
				{/* call info */}
				<div className='flex items-center gap-x-2'>
					<img
						src='https://web.dev/images/authors/thomassteiner.jpg'
						alt={`Caller pic`}
						className=' w-10  h-10 md:w-28 md:h-28 rounded-full'
					/>

					<div>
						<h1 className='dark:text-white text-sm'>
							<b>Aditya sharma</b>
						</h1>
						<span className='dark:text-dark_text_2 text-xs'>Whatsapp Video...</span>
					</div>
				</div>

				{/* call actions */}
				<ul className='flex items-center gap-x-2'>
					<li>
						<button className='w-8 h-8 flex items-center justify-center rounded-full bg-red-500'>
							<CloseIcon className='fill-white w-5' />
						</button>
					</li>

					<li>
						<button className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-500'>
							<BsCheck className='fill-white w-5' />
						</button>
					</li>
				</ul>
			</div>

			{/*Ringtone*/}
			<audio src='../../../../audio/ringtone.mp3' autoPlay loop></audio>
		</div>
	);
};

export default Ringing;
