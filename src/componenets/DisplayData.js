import React from 'react';

const DisplayData = ({ data }) => {
	if (!data || !data.firstNames || !data.lastNames || !data.number) {
		return null;
	}

	return (
		<div>
			<h2>Data:</h2>
			<p>Message: {data.message}</p>
			<p>First Names: {data.firstNames.join(', ')}</p>
			<p>Last Names: {data.lastNames.join(', ')}</p>
			<p>Number: {data.number}</p>
		</div>
	);
};

export default DisplayData;