import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiArrowBack } from 'react-icons/bi';
import { RiPencilFill } from 'react-icons/ri';
import { IoCameraSharp } from 'react-icons/io5';
import MenuProfile from './MenuProfile';
import { useSelector } from 'react-redux';
const UserInfo = ({ userInfo, setUserInfo, setDetailPic }) => {
	const [menu, setMenu] = useState(false);
	const { user } = useSelector((state) => state.user);
	const [x, setX] = useState();
	const [y, setY] = useState();
	const fotoProfile = (e) => {
		setX(e.pageX);
		setY(e.pageY);
		setMenu(!menu);

	};
	return (
		<AnimatePresence>
			{userInfo && (
				<motion.div
					animate={{
						translateX: [-400, 0],
						transition: {
							duration: 0.3,
						},
					}}
					exit={{
						translateX: -410,
						transition: {
							delay: 0.2,
							duration: 0.3,
						},
					}}
					className='absolute z-[99] w-full h-full  bg-dark_bg_1'
				>
					<MenuProfile
						x={x}
						y={y}
						menu={menu}
						setDetailPic={setDetailPic}
						setMenu={setMenu}
					/>

					<div className='bg-dark_bg_4  h-[110px] w-full flex py-4'>
						<motion.div
							animate={{
								opacity: [0, 1],
								translateX: [-70, 0],
								transition: {
									duration: 0.5,
									delay: 0.1,
								},
							}}
							className='flex items-center mt-auto ml-5'
						>
							<BiArrowBack
								className='text-white text-2xl cursor-pointer'
								onClick={() => setUserInfo(false)}
							/>
							<h1 className='text-xl text-white ml-8 font-medium'>Profile</h1>
						</motion.div>
					</div>
					<motion.div
						animate={{
							scale: [0, 1],
						}}
						transition={{
							duration: 0.3,
							delay: 0.1,
						}}
						className='w-full flex justify-center  mt-8'
					>
						<div
							className='w-[205px] rounded-full overflow-hidden group relative cursor-pointer'
							onClick={(e) => fotoProfile(e)}
						>
							<img src={user.picture} alt='' />
							<div className='w-full h-full absolute top-0 z-50 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 flex flex-col justify-center items-center'>
								<IoCameraSharp className='text-white text-2xl' />
								<h1 className='text-center text-white text-xs w-1/2'>
									USER PROFILE PIC
								</h1>
							</div>
						</div>
					</motion.div>
					<motion.div
						animate={{
							translateY: [-30, 0],
							opacity: [0, 1],
							transition: {
								duration: 0.5,
								delay: 0.2,
							},
						}}
						className='px-7 flex flex-col gap-6 mt-9'
					>
						<h3 className='text-line text-sm dark:text-green_2'>Your Name</h3>
						<div className='flex items-center'>
							<h1 className='text-xl text-white'>{user.name}</h1>
							<RiPencilFill className='text-icon ml-auto text-2xl dark:fill-dark_svg_1 cursor-pointer' />
						</div>
						<p className='text-icon text-white text-sm'>
							This is not Your username or PIN.This name will be visible to your
							Whatsapp contacts.
						</p>
					</motion.div>

					<motion.div
						animate={{
							translateY: [-30, 0],
							opacity: [0, 1],
							transition: {
								duration: 0.5,
								delay: 0.2,
							},
						}}
						className='px-7 flex flex-col gap-1 mt-5'
					>
						<h3 className='text-line text-sm dark:text-green_2'>Info</h3>
						<div className='flex items-start flex-col gap-2'>
							<RiPencilFill className='text-icon ml-auto text-2xl dark:fill-dark_svg_1 cursor-pointer' />
							<h1 className='text-sm text-white'>Email: {user.email}</h1>
							<h1 className='text-xs text-white'>Status: {user.status}</h1>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default UserInfo;
