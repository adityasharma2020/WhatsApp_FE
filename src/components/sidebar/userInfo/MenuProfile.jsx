import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const MenuProfile = ({ x, y, menu, setDetailPic, setMenu }) => {
	const detailHandler = () => {
		setMenu(false);
		setDetailPic(true);
	};
	return (
		<AnimatePresence>
			{menu && (
				<motion.div
					animate={{
						scale: [0, 1],
						transition: {
							duration: 0.3,
						},
					}}
					style={{
						x: x,
						y: y,
					}}
					className='w-[160px] h-[152px] bg-primary origin-top-left z-[999] flex fixed items-center rounded-md'
				>
					<ul className='w-full text-white'>
						<li
							className='py-2 hover:bg-secondary px-4 cursor-pointer'
							onClick={detailHandler}
						>
							View Photo
						</li>
						<li className='py-2 hover:bg-secondary px-4 cursor-pointer'>
							Upload photo
						</li>
						<li className='py-2 hover:bg-secondary px-4 cursor-pointer'>
							Remove photo
						</li>
					</ul>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default MenuProfile;
