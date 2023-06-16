import React from 'react';
import { Table } from 'react-bootstrap';

function ProductTable({ product }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Process Name</th>
                    <th>Process Time</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{product.product_id}</td>
                    <td>{new Date(product.created_at).toLocaleDateString()}</td>
                    <td>{new Date(product.updated_at).toLocaleDateString()}</td>
                    <td>
                        {product.processes.map((process, index) => (
                            <div key={index}>{process.name}</div>
                        ))}
                    </td>
                    <td>
                        {product.processes.map((process, index) => (
                            <div key={index}>{process.time}</div>
                        ))}
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default ProductTable;