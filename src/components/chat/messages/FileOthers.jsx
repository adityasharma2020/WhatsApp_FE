import React from 'react';
import DownloadIcon from '../../../svg/Download';

const FileOthers = ({ file, type, me }) => {
	return (
		<div
			className={`p-2 rounded-lg
        ${me ? 'bg-green_3' : 'dark:bg-dark_bg_2'}
        `}
		>
			{/* container */}
			<div className='flex justify-between p-2 gap-x-8'>
				{/* file info */}
				<div className='flex items-center gap-2'>
					<img
						src={`../../../../images/file/${type}.png`}
						alt=''
						className='w-8 object-contain'
					/>

					<div className='flex flex-col gap-x-2'>
						<h1>
							{file.original_filename.length > 20
								? `${file.original_filename.substring(0, 20)}...`
								: file.original_filename}
							.{file.public_id.split('.')[1]}
						</h1>
						<span className='text-xs'>
							{type} . {(file.bytes / 1024 / 1024).toFixed(2)} MB
						</span>
					</div>
				</div>

				{/* download button */}
				<a href={file.secure_url} download target='_blank' rel='noreferrer'>
					<DownloadIcon />
				</a>
			</div>
		</div>
	);
};

export default FileOthers;
