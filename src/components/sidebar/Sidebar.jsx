import React, { useState } from 'react';
import SidebarHeader from './header/SidebarHeader';
import { Notifications } from './notifications';
import { Search, SearchResults } from './search';
import { Conversations } from './conversations';

const Sidebar = () => {
	const [searchResults, setSearchResults] = useState([]);
	
	return (
		<div className='w-[40%] h-full select-none'>
			{/* sidebar header */}
			<SidebarHeader />

			{/* notifications */}
			<Notifications />

			{/* search */}
			<Search searchLength={searchResults.length} setSearchResults={setSearchResults} />

			{searchResults.length > 0 ? (
				<>
					{/* search resuts */}
					<SearchResults searchResults={searchResults} />
				</>
			) : (
				<></>
			)}
			{/* conversations */}
			<Conversations />
		</div>
	);
};

export default Sidebar;
