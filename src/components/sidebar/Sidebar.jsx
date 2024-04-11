import React, { useState } from 'react';
import SidebarHeader from './header/SidebarHeader';
import { Notifications } from './notifications';
import { Search } from './search';

const Sidebar = () => {
	const [searchResults, setSearchResults] = useState([]);
	return (
		<div className='w-[40%] h-full select-none'>
			{/* sidebar header */}
			<SidebarHeader />

			{/* notifications */}
			<Notifications />

			{/* search */}
			<Search searchLength={searchResults.length} />
		</div>
	);
};

export default Sidebar;
