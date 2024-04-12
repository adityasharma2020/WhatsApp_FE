import React from 'react';
import { useSelector } from 'react-redux';
import Conversation from './Conversation';

const Conversations = () => {
	const { conversations } = useSelector((state) => state.chat);
	// console.log(conversations);
	return (
		<div className='convos scrollbar '>
			{conversations.length
				? conversations.map((convo) => {
						return <Conversation convo={convo} key={convo._id} />;
				  })
				: ''}
		</div>
	);
};

export default Conversations;
