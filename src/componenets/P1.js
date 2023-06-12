import React, { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DisplayData from "./DisplayData";

function P1() {
	const [firstNames, setFirstNames] = useState([""]);
	const [lastNames, setLastNames] = useState([""]);
	const [number, setNumber] = useState("");
	const [loaded, setLoaded] = useState(false);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

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
		// Make API call with firstNames and lastNames - replace variable names later
		// change to selective CORS later and try with Default 4xx instead of lambda change
		// alert("Submitted Successfully!");
		const apiGatewayUrl = 'https://4110ohgv2h.execute-api.us-east-2.amazonaws.com/launch';
		const resourcePath = '/p1';
		const queryParams = `firstNames=${firstNames.join(',')}&lastNames=${lastNames.join(',')}&number=${number}`;

		setLoading(true);

		fetch(`${apiGatewayUrl}${resourcePath}?${queryParams}`)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				console.log(data);
				setData(data);
				setLoaded(true);
				setLoading(false);
			})
			.catch(error => {
				console.error(error);
				alert('There was an error submitting the form. Please try again later.');
				setLoading(false);
			});
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
			<div className="row-md-6">
				<Form onSubmit={handleSubmit} className="pt-3 pb-3">
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
								required
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
									required
								/>
							</Col>
							<Col>
								<Form.Control
									type="number"
									placeholder="Process Time"
									name="lastName"
									value={lastNames[index]}
									onChange={(event) => handleInputChange(index, event)}
									required
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
				<div className="row justify-content-center mt-3">
					<div className="col-md-6">
						{loading && <Spinner animation="border" />}
						{loaded && !loading && <DisplayData data={data} />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default P1;