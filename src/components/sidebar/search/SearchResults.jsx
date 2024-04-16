import React from 'react';
import Contact from './Contact';

const SearchResults = ({ searchResults }) => {
	return (
		<div className='w-full'>
			<div>
				{/* heading */}
				<div className='flex flex-col px-8 pt-8'>
					<h1 className='font-extralight text-md text-green_2'>contacts</h1>
					<span className='w-full mt-4 ml-10 border-b dark:border-b-dark_border_1'></span>
				</div>

				{/* results */}
				<ul>
					{searchResults.length > 0 ? (
						searchResults.map((user) => {
							return <Contact contact={user} key={user._id} />;
						})
					) : (
						<div className='flex  justify-center items-center py-28 text-white'>No user found !</div>
					)}
				</ul>
			</div>
		</div>
	);
};

export default SearchResults;
