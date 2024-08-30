import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { selectShippingInfo } from "../redux/selectors/shippingSelector";
import { selectPaymentState } from "../redux/selectors/paymentSlice";
import {
  selectCartItems,
  selectCartState,
} from "../redux/selectors/cartSelector";
import { useEffect } from "react";
import { selectAuthToken } from "../redux/selectors/authSelector";
import { SHIPPING_CHARGE } from "../utils/constants";
import { createOrdersAsync, resetError } from "../redux/slices/ordersSlice";
import { selectOrdersError } from "../redux/selectors/ordersSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const filterCart = (cartItems) => {
  return cartItems.map((item) => {
    const newItem = {
      product: item._id,
      qty: item.qty,
    };
    return newItem;
  });
};

function PlaceOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { address, city, postalCode, country } =
    useSelector(selectShippingInfo);
  const { paymentMethod } = useSelector(selectPaymentState);
  const cartItems = useSelector(selectCartItems);
  const { totalItemsPrice, taxAmt, totalPayableAmt } =
    useSelector(selectCartState);
  let authToken = useSelector(selectAuthToken);
  const error = useSelector(selectOrdersError);

  const placeOrder = async () => {
    const orderDetail = {
      orderItems: filterCart(cartItems),
      shippingAddress: { address, city, postalCode, country },
      paymentMethod,
      itemsPrice: totalItemsPrice,
      taxPrice: taxAmt,
      shippingPrice: SHIPPING_CHARGE,
      totalPrice: totalPayableAmt,
    };

    const response = await dispatch(createOrdersAsync(orderDetail));

    if (response.type === createOrdersAsync.fulfilled.toString())
      navigate("/orders");
  };

  useEffect(() => {
    if (authToken && !address) navigate("/shipping");
    if (error) toast.error(error.message, { autoClose: 3000 });
    return () => {
      dispatch(resetError());
    };
  }, [dispatch, navigate, authToken, address, error]);

  return (
    <div>
      <ToastContainer />
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
                  {cartItems.map((item) => (
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
                  <Col>${totalItemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${SHIPPING_CHARGE}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${taxAmt}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${totalPayableAmt}</Col>
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
                  onClick={placeOrder}
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
