import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const P2 = () => {
  const [productId, setProductId] = useState('');
  const [processes, setProcesses] = useState([{ name: '', time: '' }]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(productId, processes);
    // TODO: Submit data to AWS database
  };

  const handleInputChange = (index, event) => {
    const values = [...processes];
    if (event.target.name === 'name') {
      values[index].name = event.target.value;
    } else {
      values[index].time = event.target.value;
    }
    setProcesses(values);
  };

  const handleAddProcess = () => {
    const values = [...processes];
    values.push({ name: '', time: '' });
    setProcesses(values);
  };

  const handleRemoveProcess = (index) => {
    const values = [...processes];
    values.splice(index, 1);
    setProcesses(values);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="row-md-6">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formProductId" className='mb-3'>
            <Form.Label>Product ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </Form.Group>
          {processes.map((process, index) => (
            <Row key={index} className="mb-3 align-items-end">
              <Col>
                <Form.Group controlId={`formProcessName${index}`}>
                  {/* <Form.Label>Process Name</Form.Label> */}
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Process Name"
                    value={process.name}
                    onChange={(event) => handleInputChange(index, event)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`formProcessTime${index}`}>
                  {/* <Form.Label>Process Time</Form.Label> */}
                  <Form.Control
                    type="number"
                    name="time"
                    placeholder="Enter Process Time"
                    value={process.time}
                    onChange={(event) => handleInputChange(index, event)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button variant="danger" onClick={() => handleRemoveProcess(index)}>
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <div className="d-flex justify-content-center my-3">
            <Button variant="primary" type="submit" className="mr-3 mx-3">
              Submit
            </Button>
            <Button variant="secondary" onClick={handleAddProcess}>
              Add Process
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default P2;