import { useEffect, useRef } from 'react';

export default function CallTimes({ totalSecInCall, setTotalSecInCall, callEnded, callAccepted }) {
	const timeoutRef = useRef(null);

	useEffect(() => {
		const setSecInCall = () => {
			setTotalSecInCall((prev) => prev + 1);
			timeoutRef.current = setTimeout(setSecInCall, 1000);
		};

		if (callAccepted && !callEnded) {
			setSecInCall();
		}

		return () => {
			clearTimeout(timeoutRef.current);
			setTotalSecInCall(0);
		};
	}, [callAccepted, callEnded, setTotalSecInCall]);

	return (
		<div
			className={`text-dark_text_2 text-sm text-white p-1 bg-white/5 bg-opacity-50 backdrop-blur-lg rounded-lg ${
				totalSecInCall !== 0 ? 'block' : 'hidden'
			}`}
		>
			{parseInt(totalSecInCall / 3600 >= 0) ? (
				<>
					<span>
						{parseInt(totalSecInCall / 3600).toString().length < 2
							? '0' + parseInt(totalSecInCall / 3600)
							: parseInt(totalSecInCall / 3600)}
					</span>
					<span>:</span>
				</>
			) : null}
			<span>
				{parseInt(totalSecInCall / 60).toString().length < 2
					? '0' + parseInt(totalSecInCall / 60)
					: parseInt(totalSecInCall / 60)}
			</span>
			<span>:</span>
			<span>
				{(totalSecInCall % 60).toString().length < 2
					? '0' + (totalSecInCall % 60)
					: totalSecInCall % 60}
			</span>
		</div>
	);
}
