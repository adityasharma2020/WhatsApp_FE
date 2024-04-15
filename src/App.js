import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import SocketContext from './context/SocketContext';

// socket io connection
const socket = io(process.env.REACT_APP_SERVER_ENDPOINT);

function App() {
	const { user } = useSelector((state) => state.user);
	const { token } = user;

	useEffect(() => {
		socket.on('receiveMessage', (msg) => {
			console.log(msg);
		});
	});

	const sendMsg = () => {
		socket.emit('sendMessage', 'hello from client to server');
	};

	return (
		<div className='dark'>
			<SocketContext.Provider value={socket}>
				
				<Router>
					<Routes>
						<Route
							exact
							path='/'
							element={token ? <Home></Home> : <Navigate to='/login' />}
						></Route>
						<Route
							path='/login'
							element={!token ? <Login></Login> : <Navigate to='/' />}
						></Route>
						<Route
							path='/register'
							element={!token ? <Register></Register> : <Navigate to='/' />}
						></Route>
					</Routes>
				</Router>
			</SocketContext.Provider>
		</div>
	);
}

export default App;
