import React, { useState } from 'react';
import SidebarHeader from './header/SidebarHeader';
import { Notifications } from './notifications';
import { Search, SearchResults } from './search';
import { Conversations } from './conversations';

const Sidebar = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [notificationInfo, setNotificationInfo] = useState(true);
	const [inputValue, setInputValue] = useState('');

	return (
		<div className='min-w-[100%] sm:min-w-[30%] scrollbar flex30 h-full select-none flex flex-col'>
			{/* sidebar header */}
			<SidebarHeader />

			{/* notifications */}
			{notificationInfo && <Notifications setNotificationInfo={setNotificationInfo} />}

			{/* search */}
			<Search
				searchLength={searchResults.length}
				setSearchResults={setSearchResults}
				inputValue={inputValue}
				setInputValue={setInputValue}
			/>

			{inputValue.length > 2 && (
				<div className='flex-1 overflow-y-auto  convos scrollbar'>
					<>
						{/* search resuts */}
						<SearchResults searchResults={searchResults} />
					</>
				</div>
			)}
			{/* conversations */}
			{inputValue.length <= 2 && <Conversations />}
		</div>
	);
};

export default Sidebar;
