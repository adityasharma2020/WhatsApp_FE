import React, { useState } from 'react';
import SidebarHeader from './header/SidebarHeader';
import { Notifications } from './notifications';
import { Search, SearchResults } from './search';
import { Conversations } from './conversations';
import UserInfo from './userInfo/UserInfo';
import ImageDetail from './userInfo/ImageDetail';
import SearchUserGroup from './header/searchUserGroup';
import { NewChatIcon } from '../../svg';

const Sidebar = ({ onlineUsers, typing }) => {
	const [searchResults, setSearchResults] = useState([]);
	const [notificationInfo, setNotificationInfo] = useState(true);
	const [inputValue, setInputValue] = useState('');
	const [userInfo, setUserInfo] = useState(false);
	const [searchUserGroup, setSearchUserGroup] = useState(false);
	const [detailPic, setDetailPic] = useState(false);

	return (
		<>
			<div className='min-w-[100%] md:min-w-[30%] scrollbar flex30 h-full relative select-none flex flex-col'>
				<ImageDetail detailPic={detailPic} setDetailPic={setDetailPic} />

				<UserInfo
					userInfo={userInfo}
					setUserInfo={setUserInfo}
					setDetailPic={setDetailPic}
				/>
				<SearchUserGroup
					searchUserGroup={searchUserGroup}
					setSearchUserGroup={setSearchUserGroup}
				/>
				{/* sidebar header */}
				<SidebarHeader setSearchUserGroup={setSearchUserGroup} setUserInfo={setUserInfo} />

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
				{inputValue.length <= 2 && (
					<Conversations onlineUsers={onlineUsers} typing={typing} />
				)}
			</div>

			<div className='absolute bottom-8 right-5'>
				<button
					onClick={() => setSearchUserGroup((prev) => !prev)}
					className='bg-green_1 p-1 rounded-full shadow-md outline-none focus:outline-none focus:ring-4 cursor-pointer ring-green_4'
				>
					<NewChatIcon className='fill-white w-10 h-10' />
				</button>
			</div>
		</>
	);
};

export default Sidebar;
