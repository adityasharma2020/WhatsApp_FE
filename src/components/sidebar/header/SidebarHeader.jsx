import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from '../../../svg/index.js';
import Menu from './Menu.jsx';

const SidebarHeader = ({ setUserInfo, setSearchUserGroup }) => {
	const { user } = useSelector((state) => state.user);
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className='h-[50px] dark:bg-dark_bg_2 flex items-center p16 '>
			<div className='w-full flex  items-center justify-between'>
				{/* user image */}
				<button className='btn' onClick={() => setUserInfo((prev) => !prev)}>
					<img
						src={user?.picture}
						alt={user?.name}
						className='w-full h-full rounded-full object-cover'
					/>
				</button>
				{/* user icons */}
				<ul className='flex items-center gap-x-2.5'>
					<li className=''>
						<button className='btn'>
							<CommunityIcon className='dark:fill-dark_svg_1' />
						</button>
					</li>

					<li className=''>
						<button className='btn'>
							<StoryIcon className='dark:fill-dark_svg_1' />
						</button>
					</li>

					<li className=''>
						<button
							className='btn'
							onClick={() => {
								setSearchUserGroup(true);
							
							}}
						>
							<ChatIcon className='dark:fill-dark_svg_1' />
						</button>
					</li>

					<li className='relative' onClick={() => setShowMenu((prev) => !prev)}>
						<button className={`btn ${showMenu ? 'bg-dark_hover_1' : ''}`}>
							<DotsIcon className='dark:fill-dark_svg_1' />
						</button>
						{showMenu ? <Menu /> : null}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SidebarHeader;
