import React, { useState } from 'react';
import { FilterIcon, ReturnIcon, SearchIcon } from '../../../svg';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Search = ({ searchLength, setSearchResults }) => {
	const [show, setShow] = useState(false);
	const { user } = useSelector((state) => state.user);
	const { token } = user;

	const handleSearch = async (e) => {
		console.log(e.target.value);
		if (e.target.value.length > 2 && e.key === 'Enter') {
			console.log(e.target.value);
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
			} catch (error) {
				console.log(error?.response?.data?.error?.message);
			}
		} else {
			setSearchResults([]);
		}
	};
	return (
		<div className='h-[49px] py-1.5'>
			{/* container */}
			<div className='px-[10px]'>
				{/* search input container */}
				<div className='flex items-center justify-center gap-x-2'>
					<div className='w-full flex dark:bg-dark_bg_2 rounded-lg'>
						{show || searchLength > 0 ? (
							<span className='w-8 flex items-center justify-center rotateAnimation'>
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
							onFocus={() => setShow(true)}
							onBlur={() => searchLength === 0 && setShow(false)}
							onKeyDown={(e) => handleSearch(e)}
						/>
					</div>

					<button className='btn'>
						<FilterIcon className='dark:fill-dark_svg_2' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Search;
