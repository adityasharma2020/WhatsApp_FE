import React from 'react';
import { CloseIcon } from '../../../../svg';
import { useDispatch, useSelector } from 'react-redux';
import { clearFiles } from '../../../../Slices/chatSlice';

const Header = ({ activeIndex }) => {
	const dispatch = useDispatch();
	const { files } = useSelector((state) => state.chat);

	const clearFileHandler = () => {
		dispatch(clearFiles());
	};
	return (
		<div className='w-full'>
			{/* container */}
			<div className='w-full flex items-center justify-between'>
				{/* close icon / empty file */}
				<div className='translate-x-4 cursor-pointer' onClick={() => clearFileHandler()}>
					<CloseIcon className='dark:fill-dark_svg_1' />
				</div>

				{/* File Name */}
				<h1 className='dark:text-dark_text_1 text-[15px]'>
					{files[activeIndex]?.file?.name?.length > 35
						? `${files[activeIndex]?.file?.name?.substring(0, 35)}... .${
								files[activeIndex].type
						  }`
						: files[activeIndex]?.file?.name}
				</h1>
				{/* empty tag */}
				<div></div>
			</div>
		</div>
	);
};

export default Header;
