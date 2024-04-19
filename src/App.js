import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import SocketContext from './context/SocketContext';
import InstallPWAButton from './components/PWA/InstallPWAButton';
// socket io connection
const socket = io(process.env.REACT_APP_SERVER_ENDPOINT);

function App() {
	const { user } = useSelector((state) => state.user);
	const { token } = user;

	const isTokenExpired = (token) => {
		if (!token) return true; // Token doesn't exist
		const decodedToken = jwtDecode(token);
		if (decodedToken.exp * 1000 < Date.now()) return true; // Token is expired
		return false; // Token is not expired
	};

	useEffect(() => {
		socket.on('receiveMessage', (msg) => {});
	});

	const sendMsg = () => {
		socket.emit('sendMessage', 'hello from client to server');
	};

	return (
		<div className='dark  '>
			<SocketContext.Provider value={socket}>
				<Router>
					<Routes>
						<Route
							exact
							path='/'
							element={
								!isTokenExpired(token) ? <Home></Home> : <Navigate to='/login' />
							}
						></Route>
						<Route
							path='/login'
							element={
								!token || isTokenExpired(token) ? (
									<Login></Login>
								) : (
									<Navigate to='/' />
								)
							}
						></Route>
						<Route
							path='/register'
							element={
								!token || isTokenExpired(token) ? (
									<Register></Register>
								) : (
									<Navigate to='/' />
								)
							}
						></Route>
					</Routes>
				</Router>
			</SocketContext.Provider>
			<InstallPWAButton />
		</div>
	);
}

export default App;
