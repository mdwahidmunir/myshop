import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "./common/CheckoutSteps";
import { selectShippingInfo } from "../redux/selectors/shippingSelector";
import { selectPaymentState } from "../redux/selectors/paymentSlice";
import { selectCartItems } from "../redux/selectors/cartSelector";
import { useEffect } from "react";
import { selectAuthToken } from "../redux/selectors/authSelector";

function PlaceOrder() {
  const {
    error: shippingError,
    address,
    city,
    postalCode,
    country,
  } = useSelector(selectShippingInfo);
  const navigate = useNavigate();

  const { paymentMethod } = useSelector(selectPaymentState);

  const cartItems = useSelector(selectCartItems);

  let authToken = useSelector(selectAuthToken);

  useEffect(() => {
    if (authToken && !address) navigate("/shipping");
  }, [navigate, authToken, address]);

  return (
    <div>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Shipping: </strong>
                {address}, {city}
                {"  "}
                {postalCode},{"  "}
                {country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  {/* <Col>${cart.itemsPrice}</Col> */}
                  <Col>$0</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  {/* <Col>${cart.shippingPrice}</Col> */}
                  <Col>$0</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  {/* <Col>${cart.taxPrice}</Col> */}
                  <Col>$0</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  {/* <Col>${cart.totalPrice}</Col> */}
                  <Col>$0</Col>
                </Row>
              </ListGroup.Item>

              {/* <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item> */}

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block w-100"
                  disabled={cartItems.length === 0}
                  //   onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrder;
