import React from 'react';
import Header from './Header';
import FileViewer from './FileViewer';
import Input from './Input';
import HandleAndSend from './HandleAndSend';

const FilePreview = () => {
	return (
		<div className='relative py-2 w-full flexitems-center justify-center'>
			{/* container */}
			<div className='w-full flex flex-col items-center'>
				{/* header */}
				<Header />

				{/* fileViewer */}
				<FileViewer />

				<div className='w-full flex flex-col items-center'>
					{/* message input */}
					<Input />

					{/* send and manipulate files */}
					<HandleAndSend />
				</div>
			</div>
		</div>
	);
};

export default FilePreview;
