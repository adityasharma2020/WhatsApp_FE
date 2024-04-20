import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { CloseIcon } from '../../../svg';

const ImageDetail = ({ detailPic, setDetailPic }) => {
	return (
		<AnimatePresence>
			{detailPic && (
				<motion.div
					exit={{
						opacity: [1, 0],
						transition: {
							delay: 0.5,
						},
					}}
					className='w-full h-full bg-secondary/95 fixed z-[999]'
				>
					<div className='w-full h-[60px] flex items-center px-7 justify-start'>
						<div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
							<img
								src='https://imgs.search.brave.com/jLTwrBSRPcoyhBJs1uPbMl500isS1N2O0JlI3BLUQoY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc'
								alt=''
							/>
						</div>
						<h1 className='text-white ml-4'>9414871149</h1>
						<button className='text-icon ml-auto' onClick={() => setDetailPic(false)}>
							<CloseIcon className='dark:fill-dark_svg_2 mr-0.5' />
						</button>
					</div>
					<div className='w-full flex justify-center items-center'>
						<motion.div
							exit={{
								width: 205,
								borderRadius: '100%',
								translateX: -485,
								translateY: 75,
							}}
							className='w-[585px] mt-2 origin-bottom overflow-hidden'
						>
							<img
								src='https://imgs.search.brave.com/jLTwrBSRPcoyhBJs1uPbMl500isS1N2O0JlI3BLUQoY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc'
								alt=''
							/>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ImageDetail;
