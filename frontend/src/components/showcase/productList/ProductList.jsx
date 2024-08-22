import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from './productCard/ProductCard'

const ProductList = ({ products }) => {
  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col xs={12} sm={6} md={4} lg={3} key={product.id} style={{ marginBottom: 20}}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
