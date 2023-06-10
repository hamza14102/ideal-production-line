import React from 'react';
import { Table } from 'react-bootstrap';

const DisplayData = ({ data }) => {
	if (!data || !data.firstNames || !data.lastNames) {
		return null;
	}

	return (
		<div>
			<h2>Ideal Distribution:</h2>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Process Name</th>
						<th>Manpower Needed</th>
					</tr>
				</thead>
				<tbody>
					{data.firstNames.map((firstName, index) => (
						<tr key={index}>
							<td>{firstName}</td>
							<td>{data.lastNames[index]}</td>
						</tr>
					))}
					<tr>
						<td colSpan="2">Ideal Conveyor Speed: {data.number}</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
};

export default DisplayData;