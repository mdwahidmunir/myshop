import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import {
  Col,
  Image,
  ListGroup,
  Form,
  Row,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";

const Cart = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const cartItems = useSelector((state) => state.cart.cartItems);

  console.log("Location ::", location);
  console.log("cart items", cartItems);

  useEffect(() => {
    id && dispatch(addToCart({ id, qty }));
  }, [dispatch, id, qty]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your Cart is empty ! <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} rounded fluid />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={3}>
                      <Form.Select
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart({
                              id: item._id,
                              qty: e.target.value,
                            })
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={1}>
                      <Button
                        variant="light"
                        type="button"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal(
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items
                </h2>
                <h3>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block w-100"
                  disabled={cartItems.length === 0}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
