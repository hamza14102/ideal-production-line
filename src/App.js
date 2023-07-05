import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componenets/Home';
import P1 from './componenets/P1';
import CreateProduct from './componenets/CreateProduct';
// import Navigation from './componenets/Navigation';
import SupervisorSearch from './componenets/SupervisorSearch';
import ResponsiveAppBar from './componenets/ResponsiveNavbar';

function App() {
	return (
		<div className="App">
			<Router basename={process.env.PUBLIC_URL}>
				<ResponsiveAppBar />
				{/* <Navigation /> */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/P1" element={<P1 />} />
					<Route path="/CreateProduct" element={<CreateProduct />} />
					<Route path="/SupervisorSearch" element={<SupervisorSearch />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;