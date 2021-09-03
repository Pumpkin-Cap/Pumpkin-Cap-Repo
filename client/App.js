import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import BottomBar from './components/VideoChat/BottomBar';

const App = () => {
	return (
		<div>
			{/* <img id='bg-img' src='/duckbackground.jpg' /> */}
			<Navbar />
			<Routes />
			<BottomBar />
		</div>
	);
};

export default App;
