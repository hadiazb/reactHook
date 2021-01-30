import React, { useState, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const Header = () => {
	const [darkMode, setDarkMode] = useState(false);
	const color = useContext(ThemeContext);
	return (
		<div>
			<h1 style={{ color }}>ReactHooks</h1>
			<button
				type='button'
				onClick={() => setDarkMode(!darkMode)}
			>
				{!darkMode ? 'Dark Mode' : 'Light Mode'}
			</button>
		</div>
	);
};

export default Header;
