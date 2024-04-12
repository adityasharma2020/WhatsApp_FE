import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../components/sidebar';
import { getConversations } from '../Slices/chatSlice';

export default function Home() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);

	//get conversations
	useEffect(() => {
		console.log('user:', user);
		if (user.token) {
			dispatch(getConversations(user.token));
		}
	}, [user]);

	return (
		<div className='h-screen dark:bg-dark_bg_1 flex items-center justify-start  overflow-hidden'>
			{/* container */}

			<div className='container h-screen'>
				{/* sidebar */}
				<Sidebar />
			</div>
		</div>
	);
}
