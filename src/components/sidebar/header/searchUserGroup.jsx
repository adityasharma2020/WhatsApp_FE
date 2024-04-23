import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { SearchResults } from '../search';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ReturnIcon, SearchIcon } from '../../../svg';

const SearchUserGroup = ({ searchUserGroup, setSearchUserGroup }) => {
	const [searchResults, setSearchResults] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const { user } = useSelector((state) => state.user);
	const [show, setShow] = useState(false);
	const { token } = user;

	const debounce = (func, delay) => {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => func(...args), delay);
		};
	};

	const handleSearch = debounce(async (e) => {
		if (e.target.value.length > 2) {
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setSearchResults(data);
			} catch (error) {}
		} else {
			setSearchResults([]);
		}
	}, 2000);

	const clearSearch = () => {
		setSearchResults([]);
		setInputValue('');
	};

	const handleInputChange = async (e) => {
		setInputValue(e.target.value);
		await handleSearch(e);
	};

	return (
		<AnimatePresence>
			{searchUserGroup && (
				<motion.div
					animate={{
						opacity: [0, 1],
						transition: {
							duration: 0.2,
						},
					}}
					exit={{
						opacity: [1, 0],
						transition: {
							delay: 0.3,
						},
					}}
					className='w-full h-full bg-dark_bg_3/50  flex items-center justify-center fixed z-[999]'
				>
					<motion.div
						animate={{
							scale: [0, 1],
							transition: {
								duration: 0.3,
							},
						}}
						exit={{
							scale: [1, 0],
							transition: {
								duration: 0.2,
							},
						}}
						className='min-w-[90%] h-[90%] md:min-w-[50%] bg-dark_bg_3  scrollbar flex30 relative select-none flex flex-col'
					>
						<div className='h-[70px] w-full bg-primary flex items-center gap-6'>
							<button
								className='text-icon ml-6 fill-dark_svg_1'
								onClick={() => {
									setSearchUserGroup(false);
									setInputValue('');
									setSearchResults([]);
								}}
							>
								<svg
									viewBox='0 0 24 24'
									height='24'
									width='24'
									preserveAspectRatio='xMidYMid meet'
									class=''
									enable-background='new 0 0 24 24'
								>
									<path
										enable-background='new'
										d='M19.1,17.2l-5.3-5.3l5.3-5.3l-1.8-1.8L12,10.2L6.7,4.9L4.9,6.6 l5.3,5.3l-5.3,5.3L6.7,19l5.3-5.3l5.3,5.3L19.1,17.2z'
									></path>
								</svg>
							</button>
							<h1 className='text-white text-lg'>Search User</h1>
						</div>
						<div className='flex w-full h-[50px] bg-dark_bg_3 py-[10px] px-3 items-center'>
							<form action='' className='w-full'>
								<div className='h-full w-full py-[6px] bg-dark_bg_3 mt-2 rounded-lg overflow-hidden flex items-center px-3 transition-all ease-in-out duration-300'>
									{show || inputValue.length > 0 ? (
										<span
											className='w-8 flex items-center justify-center rotateAnimation cursor-pointer'
											onClick={clearSearch}
										>
											<ReturnIcon className='fill-green_1 w-5' />
										</span>
									) : (
										<span className='w-8 flex items-center justify-center '>
											<SearchIcon className='dark:fill-dark_svg_2 w-5' />
										</span>
									)}
									<input
										type='text'
										placeholder='search or start a new chat'
										className='input'
										value={inputValue}
                    autoFocus
										onChange={handleInputChange}
										onFocus={() => setShow(true)}
										onBlur={() => setShow(false)}
									/>
								</div>
							</form>
						</div>

						<div className='flex-1 overflow-y-auto  convos scrollbar'>
							<SearchResults searchResults={searchResults} />
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default SearchUserGroup;
