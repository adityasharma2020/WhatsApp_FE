import React from 'react';
import { logout } from '../../../Slices/userSlice.js';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
const Menu = () => {
	const dispatch = useDispatch();
	return (
		<AnimatePresence>
			<motion.div
				animate={{ scale: [0, 1] }}
				transition={{ duration: 0.3 }}
				exit={{ scale: 0 }}
				className='absolute right-3 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52'
			>
				<ul>
					<li className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'>
						<span>New group</span>
					</li>
					<li className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'>
						<span>New Community</span>
					</li>
					<li className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'>
						<span>Settings</span>
					</li>
					<li
						className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'
						onClick={() => dispatch(logout())}
					>
						<span>Logout</span>
					</li>
				</ul>
			</motion.div>
		</AnimatePresence>
	);
};

export default Menu;
