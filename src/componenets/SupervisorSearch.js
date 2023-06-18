import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
// import ProductTable from './ProductTable';
import { Form, Button, Spinner } from "react-bootstrap";
import DisplayData from "./DisplayData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SupervisorSearch = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);

  const [products, setProducts] = useState([]);
  const [totalManpower, setTotalManpower] = useState('');

  const handleTotalManpowerChange = (event) => {
    setTotalManpower(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the totalManpower value
    const firstNames = selectedProduct.processes.map((product) => product.name);
    const lastNames = selectedProduct.processes.map((product) => product.time);
    const number = totalManpower;
    // console.log(firstNames, lastNames, number);

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
        // console.log(data);
        setData(data);
        setLoaded(true);
        setLoading(false);
      })
      .catch(error => {
        toast.error(error);
        alert('There was an error submitting the form. Please try again later.');
        setLoading(false);
      });


  };

  useEffect(() => {
    fetch('https://a7ivt3xloc.execute-api.us-east-2.amazonaws.com/prod-info/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
      });
  }, []);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : products.filter(
        (product) =>
          product.product_id.toString().toLowerCase().slice(0, inputLength) === inputValue
      );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    fetch('https://a7ivt3xloc.execute-api.us-east-2.amazonaws.com/prod-info/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
      });
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSelectedProduct(suggestion);
    // console.log(suggestion);
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.product_id}</div>;

  const inputProps = {
    placeholder: 'Search for a product',
    value,
    onChange: (event, { newValue }) => {
      setValue(newValue);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-3">
        <ToastContainer />
        <div className="row-md-6 d-flex align-items-center">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={(suggestion) => suggestion.product_id.toString()}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          {/* {selectedProduct && <ProductTable product={selectedProduct} />} */}
          <Form onSubmit={handleSubmit} className="ml-3">
            <div className="d-flex align-items-center">
              <Form.Group controlId="totalManpower" className="mb-0 flex-grow-1 mr-3">
                {/* <Form.Label className="mr-2">Total Manpower:</Form.Label> */}
                <Form.Control type="number" placeholder='Total Manpower' value={totalManpower} onChange={handleTotalManpowerChange} />
              </Form.Group>
              <Button variant="primary" type="submit">Search</Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          {loading && <Spinner animation="border" />}
          {loaded && !loading && <DisplayData data={data} />}
        </div>
      </div>
    </div>
  );
};

export default SupervisorSearch;