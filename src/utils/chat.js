export const getConversationId = (user, users) => {
	return users[0]._id === user._id ? users[1]._id : user[0]._id;
};
