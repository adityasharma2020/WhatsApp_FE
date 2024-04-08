import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {

	return (
		<div className='dark'>
			<Router>
				<Routes>
					<Route exact path='/' element={<Home></Home>}></Route>
					<Route path='/login' element={<Login></Login>}></Route>
					<Route path='/register' element={<Register></Register>}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
