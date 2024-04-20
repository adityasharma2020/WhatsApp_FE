import React from 'react';
import { ArrowIcon, LockIcon } from '../../../svg';
import AddContactIcon from '../../../svg/AddContact';

const Header = () => {
	return (
		<div className='absolute top-0 w-full z-50 cursor-pointer sm:cursor-move'>
			{/* header container */}
			<div className='p-1 flex items-center justify-between'>
				{/* return button */}
				<button className='btn  rotate-180 scale-110'>
					<span>
						<ArrowIcon className='fill-white' />
					</span>
				</button>

				{/* End to end encrypted text */}
				<p className='flex items-center'>
					<LockIcon className='fill-white scale-75' />
					<span className='text-xs text-white'>End-to-end Encrypted</span>
				</p>

				{/* add contact to call */}
				<button className='btn'>
					<AddContactIcon className='fill-white' />
				</button>
			</div>
		</div>
	);
};

export default Header;
