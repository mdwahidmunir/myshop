import { Container, Row, Col, Image, Card, ListGroup } from "react-bootstrap";
import Message from "./Message";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrdersAsync } from "../redux/slices/ordersSlice";
import {
  selectOrdersError,
  selectOrdersState,
  selectOrdersLoading,
} from "../redux/selectors/ordersSelector";
import OrdersPlaceholder from "./OrdersPlaceholder";

const Orders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrdersState);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(getOrdersAsync());
  }, [dispatch]);

  return (
    <Container className="my-5">
      <h2 className="mb-4">Order List</h2>
      {loading ? (
        <OrdersPlaceholder />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orders.length === 0 ? (
        <Message variant="info">
          You have no orders yet. Start shopping now to place your first order!{" "}
          <Link to="/">Explore Now</Link>
        </Message>
      ) : (
        orders.map((order) => (
          <Card key={order._id} className="mb-4 shadow-sm">
            <Card.Header className="bg-dark text-white py-3">
              <Row>
                <Col md={6}>
                  <h5 className="mb-0">Order ID: {order.orderId}</h5>
                </Col>
                <Col
                  md={6}
                  className="text-md-right"
                  style={{ textAlign: "right" }}
                >
                  <h5 className="mb-0">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </h5>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col md={4}>
                  <h6 className="text-muted">Customer Information</h6>
                  <p className="mb-2">
                    <strong>Name:</strong>
                    <br />
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong>
                    <br />
                    {order.user.email}
                  </p>
                </Col>
                <Col md={4}>
                  <h6 className="text-muted">Shipping Address</h6>
                  <p className="mb-2">
                    <strong>Address:</strong>
                    <br />
                    {order.shippingAddress.address}
                  </p>
                  <p className="mb-2">
                    <strong>City:</strong>
                    <br />
                    {order.shippingAddress.city}
                  </p>
                  <p className="mb-2">
                    <strong>Postal Code:</strong>
                    <br />
                    {order.shippingAddress.postalCode}
                  </p>
                  <p>
                    <strong>Country:</strong>
                    <br />
                    {order.shippingAddress.country}
                  </p>
                </Col>
                <Col md={4}>
                  <h6 className="text-muted">Payment Details</h6>
                  <p className="mb-2">
                    <strong>Method:</strong>
                    <br />
                    {order.paymentMethod}
                  </p>
                  <p className="mb-2">
                    <strong>Status:</strong>
                    <br />
                    {order.isPaid ? (
                      <span className="text-success">Paid</span>
                    ) : (
                      <span className="text-danger">Not Paid</span>
                    )}
                  </p>
                  <p>
                    <strong>Total Amount:</strong>
                    <br />${order.totalPrice.toFixed(2)}
                  </p>
                </Col>
              </Row>
              <h6 className="text-muted mb-3">Order Items</h6>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center mb-2">
                      <Col md={2} className="mb-2">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={5} className="mb-2">
                        <h6 className="mb-0">{item.product.name}</h6>
                      </Col>
                      <Col md={1} className="mb-2">
                        <strong>Qty:</strong> {item.qty}
                      </Col>
                      <Col md={2} className="mb-2">
                        <strong>Price:</strong> $
                        {(item.qty * item.product.price).toFixed(2)}
                      </Col>
                      <Col md={2} className="mb-2">
                        <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Orders;
