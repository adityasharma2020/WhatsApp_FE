import React from 'react';
import { useSelector } from 'react-redux';

const FileViewer = ({activeIndex}) => {
	const { files } = useSelector((state) => state.chat);
	console.log(files[0].file);
	return (
		<div className='w-full max-w-[70%] hview'>
			{/* container */}
			<div className='flex justify-center items-center'>
				{files[activeIndex].type === 'IMAGE' ? (
					<img
						src={files[activeIndex].fileData}
						alt=''
						className='max-w-[90%] object-contain hview'
					/>
				) : (
					<div className='min-w-full hview flex flex-col items-center justify-center'>
						{/* file icon image */}
						<img
							src={`../../../../../images/file/${files[activeIndex].type}.png`}
							alt={files[activeIndex].type}
						/>
						{/* No preview text */}
						<h1 className='dark:text-dark_text_2 text-2xl'>No Preview Available</h1>
						<h1 className='dark:text-dark_text_2 text-2xl'>
							{(files[activeIndex]?.file?.size / 1024 / 1024).toFixed(2)} MB - {files[activeIndex]?.type}
						</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default FileViewer;
