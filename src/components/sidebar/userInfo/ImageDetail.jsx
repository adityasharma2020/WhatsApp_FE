import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { CloseIcon } from '../../../svg';
import { useSelector } from 'react-redux';

const ImageDetail = ({ detailPic, setDetailPic }) => {
	const {user} = useSelector((state)=>state.user);
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
								src={user?.picture}
								alt=''
							/>
						</div>
						<h1 className='text-white ml-4'>{user.mobile}</h1>
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
								src={user.picture}
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
