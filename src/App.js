import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';

function App() {
	const { user } = useSelector((state) => state.user);
	const { token } = user;

	return (
		<div className='dark'>
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
		</div>
	);
}

export default App;
