import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Autosuggest from "react-autosuggest";
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DepartmentContext } from '../contexts/DepartmentContext';

const P2 = () => {
  const [productId, setProductId] = useState("");
  const [processes, setProcesses] = useState([{ name: "", time: "" }]);
  // eslint-disable-next-line no-unused-vars
  const [colorSuggestions, setColorSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { department } = useContext(DepartmentContext);


  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://a7ivt3xloc.execute-api.us-east-2.amazonaws.com/prod-info/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
      });
  }, []);

  // fetch processes on product id change
  useEffect(() => {
    // if invlaid product id or product id is not in products, return
    if (!productId || !products.map((product) => product.product_id).includes(productId)) {
      return;
    }
    fetch(`https://a7ivt3xloc.execute-api.us-east-2.amazonaws.com/prod-info/product?product_id=${productId}`,
      {
        method: 'GET',
      })
      .then(response => response.json())
      .then(data => {
        setProcesses(data.processes)
      });
  }, [productId, products]);


  const handleColorChange = (event, { newValue }) => {
    setProductId(newValue);
  };

  const renderColorSuggestion = (suggestion) => (
    <div className="color-suggestion">{suggestion.product_id}</div>
  );

  const getColorSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? products
      : products.filter(
        (option) => {
          return option.product_id.toLowerCase().slice(0, inputLength) ===
            inputValue
        }
      );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    fetch('https://a7ivt3xloc.execute-api.us-east-2.amazonaws.com/prod-info/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
      });
    setColorSuggestions(getColorSuggestions(value));
  };

  const handleColorSuggestionSelected = (event, { suggestion }) => {
    setProductId(suggestion.product_id);
    // setProcesses(suggestion.processes);
  };

  const handleInputChange = (index, event) => {
    const values = [...processes];
    if (event.target.name === "name") {
      values[index].name = event.target.value;
    } else {
      values[index].time = event.target.value;
    }
    setProcesses(values);
  };

  const handleAddProcess = () => {
    const values = [...processes];
    values.push({ name: "", time: "" });
    setProcesses(values);
  };

  const handleRemoveProcess = (index) => {
    const values = [...processes];
    values.splice(index, 1);
    setProcesses(values);
  };

  const handleCreate = () => {
    if (!productId || !processes.every(process => process.name && process.time)) {
      alert('Please fill in all fields correctly');
      return;
    }
    if (department === 'Select Department') {
      alert('Please select a department');
      return;
    }

    setIsLoading(true);
    const data = { product_id: productId.trim(), processes, department: department };
    fetch('https://a7ivt3xloc.execute-api.us-east-2.amazonaws.com/prod-info/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => {
        console.log(response);
        if (response.status === 400) {
          toast.error('Product already exists!');
        } else if (response.status === 200) {
          toast.success('Product Created!');
        } else {
          toast.error('Something went wrong!');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));;
  };

  const handleUpdate = () => {
    if (!productId || !processes.every(process => process.name && process.time)) {
      alert('Please fill in all fields correctly');
      return;
    }

    setIsLoading(true);
    const data = { product_id: productId, processes }
    fetch(`https://a7ivt3xloc.execute-api.us-east-2.amazonaws.com/prod-info/product`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => {
        console.log(response);
        if (response.status === 404) {
          toast.error('Product does not exist!');
        } else if (response.status === 200) {
          toast.success('Product Updated!');
        } else {
          toast.error('Something went wrong!');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));;
  };

  const handleDelete = () => {
    if (!productId) {
      alert('Please fill in the product id correctly');
      return;
    }

    setIsLoading(true);
    const data = { product_id: productId }
    fetch(`https://a7ivt3xloc.execute-api.us-east-2.amazonaws.com/prod-info/product`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => {
        console.log(response);
        if (response.status === 404) {
          toast.error('Product does not exist!');
        } else if (response.status === 200) {
          toast.success('Product Deleted!');
        } else {
          toast.error('Something went wrong!');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));;
  };

  function renderSuggestionsContainer({ containerProps, children, query }) {
    const { key, ...restContainerProps } = containerProps; // Destructure key from containerProps

    return (
      <div {...restContainerProps} className='suggestions-container'>
        {children}
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <ToastContainer />
      <div className="row-md-6">
        <Form className="mx-3">
          <div>
            <h1>Current Department: {department}</h1>
          </div>
          <Form.Group controlId="formProductId" className="mb-3">
            <Form.Label>Product ID</Form.Label>
            <Autosuggest
              shouldRenderSuggestions={() => true}
              suggestions={getColorSuggestions(productId)}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={() =>
                setColorSuggestions([])
              }
              getSuggestionValue={(suggestion) => suggestion.name}
              renderSuggestion={renderColorSuggestion}
              inputProps={{
                placeholder: "Product ID",
                value: productId,
                onChange: handleColorChange,
              }}
              onSuggestionSelected={handleColorSuggestionSelected}
              renderSuggestionsContainer={renderSuggestionsContainer}
            />
          </Form.Group>
          {processes && processes.map((process, index) => (
            <Row key={index} className="mb-3 align-items-end">
              <Col>
                <Form.Group
                  controlId={`formProcessName${index}`}
                >
                  {/* <Form.Label>Process Name</Form.Label> */}
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Process Name"
                    value={process.name}
                    onChange={(event) =>
                      handleInputChange(index, event)
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  controlId={`formProcessTime${index}`}
                >
                  {/* <Form.Label>Process Time</Form.Label> */}
                  <Form.Control
                    type="number"
                    name="time"
                    placeholder="Enter Process Time"
                    value={process.time}
                    onChange={(event) =>
                      handleInputChange(index, event)
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  onClick={() => handleRemoveProcess(index)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <div className="d-flex justify-content-center my-3">
            <Button className="mr-3 mx-3" variant="success" onClick={handleAddProcess}>
              Add Process
            </Button>
            <Button
              onClick={handleCreate}
              variant="primary"
              className="mr-3 mx-3"
            >
              Create
            </Button>
            <Button className="mr-3 mx-3" variant="warning" onClick={handleUpdate}>
              Update Product
            </Button>
            <Button className="mr-3 mx-3" variant="danger" onClick={handleDelete}>
              Delete Product
            </Button>
          </div>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {isLoading && <Spinner animation="border" />}
        </div>
      </div>
    </div>
  );
};

export default P2;
