import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/cart">
            <Nav.Link>Add to Cart</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Add to Cart</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        <Nav.Link disabled>
          <i className="fa-solid fa-angle-right" />
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Link disabled>
        <i className="fa-solid fa-angle-right" />
      </Nav.Link>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment-method">
            <Nav.Link>Payment Method</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Link disabled>
        <i className="fa-solid fa-angle-right" />
      </Nav.Link>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
