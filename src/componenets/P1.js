import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function P1() {
	const [firstNames, setFirstNames] = useState([""]);
	const [lastNames, setLastNames] = useState([""]);
	const [number, setNumber] = useState("");

	const handleAddFields = () => {
		setFirstNames([...firstNames, ""]);
		setLastNames([...lastNames, ""]);
	};

	const handleRemoveFields = (index) => {
		const values1 = [...firstNames];
		const values2 = [...lastNames];
		values1.splice(index, 1);
		values2.splice(index, 1);
		setFirstNames(values1);
		setLastNames(values2);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("firstNames", firstNames);
		console.log("lastNames", lastNames);
		console.log("number", number);
		// Make API call with firstNames and lastNames
		alert("Submitted Successfully!");
		// replace with API call
		const apiGatewayUrl = 'https://4110ohgv2h.execute-api.us-east-2.amazonaws.com/launch';
		const resourcePath = '/p1';
		const queryParams = `firstNames=${firstNames.join(',')}&lastNames=${lastNames.join(',')}&number=${number}`;

		fetch(`${apiGatewayUrl}${resourcePath}?${queryParams}`)
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.error(error));
	};



	const handleInputChange = (index, event) => {
		const values1 = [...firstNames];
		const values2 = [...lastNames];
		if (event.target.name === "firstName") {
			values1[index] = event.target.value;
		} else {
			values2[index] = event.target.value;
		}
		setFirstNames(values1);
		setLastNames(values2);
	};

	return (
		<div className="d-flex justify-content-center">
			<Form onSubmit={handleSubmit}>
				<Form.Group as={Row} controlId="formNumber">
					<Form.Label column sm={2}>
						Manpower
					</Form.Label>
					<Col sm={10}>
						<Form.Control
							type="number"
							placeholder="Enter Total Manpower"
							value={number}
							onChange={(e) => setNumber(e.target.value)}
						/>
					</Col>
				</Form.Group>
				{firstNames.map((firstName, index) => (
					<Row key={index} className="mt-2">
						<Col>
							<Form.Control
								type="text"
								placeholder="Process Name"
								name="firstName"
								value={firstName}
								onChange={(event) => handleInputChange(index, event)}
							/>
						</Col>
						<Col>
							<Form.Control
								type="number"
								placeholder="Process Time"
								name="lastName"
								value={lastNames[index]}
								onChange={(event) => handleInputChange(index, event)}
							/>
						</Col>
						<Col>
							<Button
								variant="danger"
								onClick={() => handleRemoveFields(index)}
							>
								Remove
							</Button>
						</Col>
					</Row>
				))}
				<div className="d-flex justify-content-center mt-2">
					<Button variant="secondary" onClick={() => handleAddFields()} className="mx-2">
						Add
					</Button>
					<Button type="submit" className="mx-2">Submit</Button>
				</div>
			</Form>
		</div>
	);
}

export default P1;