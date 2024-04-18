import React, { useRef } from 'react';
import { DocumentIcon } from '../../../../../svg';
import { addFiles } from '../../../../../Slices/chatSlice';
import { useDispatch } from 'react-redux';
import { getFileType } from '../../../../../utils/file';

const DocumentAttachment = () => {
	const inputRef = useRef();
	const dispatch = useDispatch();
	const documentHandler = (e) => {
		let files = Array.from(e.target.files);
		files.forEach((file) => {
			if (
				file.type !== 'application/pdf' &&
				file.type !== 'text/plain' &&
				file.type !== 'application/msword' &&
				file.type !==
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
				file.type !== 'application/vnd.ms-powerpoint' &&
				file.type !==
					'application/vnd.openxmlformats-officedocument.presentationml.presentation' &&
				file.type !== 'application/vnd.ms-excel' &&
				file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
				file.type !== 'application/vnd.rar' &&
				file.type !== 'application/zip' &&
				file.type !== 'audio/mpeg' &&
				file.type !== 'audio/wav'
			) {
				files = files.filter((item) => item.name !== file.name);
				return;
			} else if (file.size > 1024 * 1024 * 10) {
				return;
			} else {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = (e) => {
					dispatch(
						addFiles({
							file: file,
							fileData: e.target.result,
							type: getFileType(file.type),
						})
					);
				};
			}
		});
	};

	const limitFileSelection = (event) => {
		const maxFiles = 20;
		const files = event.target.files;

		// Check if the number of selected files exceeds the limit
		if (files && files.length > maxFiles) {
			event.target.value = null; // Clear the selected files
		}
	};

	return (
		<li>
			<button
				onClick={() => inputRef.current.click()}
				type='button'
				className='bg-[#5F66CD] rounded-full'
			>
				<DocumentIcon />
			</button>

			<input
				type='file'
				hidden
				ref={inputRef}
				multiple
				accept='application/*,text/plain,audio/mpeg,audio/wav'
				onChange={documentHandler}
				onInput={limitFileSelection}
			/>
		</li>
	);
};

export default DocumentAttachment;
