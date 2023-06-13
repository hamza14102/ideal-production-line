import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';

const P2 = () => {
  const [productId, setProductId] = useState('');
  const [processes, setProcesses] = useState([{ name: '', time: '' }]);
  // eslint-disable-next-line no-unused-vars
  const [colorSuggestions, setColorSuggestions] = useState([]);

  const colorOptions = [
    { name: 'Red' },
    { name: 'Green' },
    { name: 'Blue' },
    { name: 'Yellow' },
    { name: 'Orange' },
    { name: 'Purple' },
    { name: 'Brown' },
    { name: 'Black' },
    { name: 'White' },
    { name: 'Gray' },
    { name: 'Pink' },
    { name: 'Cyan' },
    { name: 'Magenta' },
    { name: 'Lime' },
    { name: 'Teal' },
    { name: 'Lavender' },
  ];

  const handleColorChange = (event, { newValue }) => {
    setProductId(newValue);
  };

  const renderColorSuggestion = (suggestion) => (
    <div className="color-suggestion">
      {suggestion.name}
    </div>
  );

  const getColorSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : colorOptions.filter(option =>
      option.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const handleColorSuggestionSelected = (event, { suggestion }) => {
    setProductId(suggestion.name);
  };

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
            <Autosuggest
              suggestions={getColorSuggestions(productId)}
              onSuggestionsFetchRequested={({ value }) => setColorSuggestions(getColorSuggestions(value))}
              onSuggestionsClearRequested={() => setColorSuggestions([])}
              getSuggestionValue={(suggestion) => suggestion.name}
              renderSuggestion={renderColorSuggestion}
              inputProps={{
                placeholder: 'Product ID',
                value: productId,
                onChange: handleColorChange,
              }}
              onSuggestionSelected={handleColorSuggestionSelected}
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