import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderByIdAsync } from "../redux/slices/ordersSlice";
import {
  selectCurentOrder,
  selectOrdersError,
  selectOrdersLoading,
} from "../redux/selectors/ordersSelector";
import Message from "./Message";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import OrderDetailsPlaceholder from "./OrderDetailsPlaceholder";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);
  const order = useSelector(selectCurentOrder);

  useEffect(() => {
    dispatch(getOrderByIdAsync(orderId.replace("#", "%23")));
  }, [dispatch, orderId]);

  console.log("Order is ", order);
  return loading ? (
    <OrderDetailsPlaceholder />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      {order ? (
        <>
          <h1>{order.orderId}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a
                      href={`mailto:${order.user.email}`}
                      className="cursor-pointer"
                    >
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Shipping: </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}
                    {"  "}
                    {order.shippingAddress.postalCode},{"  "}
                    {order.shippingAddress.country}
                  </p>
                  <p>
                    <strong>
                      Status:{" "}
                      <span
                        className={`${
                          order.status === "Pending"
                            ? "text-warning"
                            : order.status === "Shipped"
                            ? "text-info"
                            : order.status === "Delivered"
                            ? "text-success"
                            : "text-secondary"
                        }`}
                      >
                        {order.status}
                      </span>
                    </strong>
                  </p>

                  {order.status === "Delivered" ? (
                    <Message variant="success">Delivered</Message>
                  ) : (
                    <Message variant="info">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="warning">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message variant="info">Order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                fluid
                                rounded
                              />
                            </Col>

                            <Col>
                              <Link to={`/product/${item.product._id}`}>
                                {item.product.name}
                              </Link>
                            </Col>

                            <Col md={4}>
                              {item.qty} X ${item.product.price} = $
                              {(item.qty * item.product.price).toFixed(2)}
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
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping:</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total:</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {/* {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )} */}
                </ListGroup>
                {/* {loadingDeliver && <Loader />} */}
                {/* {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )} */}
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Message variant="danger">Order not found</Message>
      )}
    </div>
  );
};

export default OrderDetails;
