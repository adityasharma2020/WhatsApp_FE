import React from 'react';
import { useSelector } from 'react-redux';

const HandleAndSend = ({ activeIndex, setActiveIndex }) => {
	const { files } = useSelector((state) => state.chat);
	return (
		<div className='w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2 overflow-x-scroll scrollbar'>
			{/* empty */}
			<span></span>
			{/* list files */}
			<div className='flex items-center gap-x-2'>
				{files.map((file, i) => (
					<div
						key={i}
						onClick={() => setActiveIndex(i)}
						className={`relative w-14 h-14 border dark:border-white mt-2 rounded-md overflow-hidden cursor-pointer`}
					>
						{file.type === 'IMAGE' ? (
							<img
								src={file.fileData}
								alt=''
								className='w-full h-full object-cover'
							/>
						) : (
							<img
								src={`../../../../../images/file/${file.type}.png`}
								alt=''
								className='w-8 h-10 mt-1.5 ml-2.5'
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default HandleAndSend;
