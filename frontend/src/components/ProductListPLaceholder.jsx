import ProductPlaceholder from "./ProductPlaceholder";
import { Col, Row } from "react-bootstrap";

const ProductListPLaceholder = () => {
  return (
    <div>
      <Row>
        {Array.from({ length: 8 }).map((_, index) => (
          <Col key={index} sm={12} md={6} lg={4} xl={3}>
            <ProductPlaceholder />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductListPLaceholder;
