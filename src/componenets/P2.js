import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function P2() {
  const [inputFields, setInputFields] = useState([
    { firstName: "", lastName: "" },
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: "", lastName: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  return (
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <Row key={index}>
            <Col>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={inputField.firstName}
                  onChange={(e) => {
                    const values = [...inputFields];
                    values[index].firstName = e.target.value;
                    setInputFields(values);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={inputField.lastName}
                  onChange={(e) => {
                    const values = [...inputFields];
                    values[index].lastName = e.target.value;
                    setInputFields(values);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Remove</Form.Label>
              <br></br>
              <Button
                variant="danger"
                type="button"
                onClick={() => handleRemoveFields(index)}
              >
                -
              </Button>
            </Col>
          </Row>
        ))}
        <br></br>
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="mb-3">
            <Button variant="primary" type="button" onClick={handleAddFields}>
              +
            </Button>{" "}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default P2;