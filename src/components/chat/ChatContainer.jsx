import React from 'react';

import ChatHeader from './header/ChatHeader.jsx';

const ChatContainer = () => {
	return (
		<div className='relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden'>
			{/* container */}
			<div className=''>
				{/* chat header */}
				<ChatHeader />
			</div>
		</div>
	);
};

export default ChatContainer;
