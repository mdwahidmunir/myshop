import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Rating from "./Rating";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearProduct, fetchProductById } from "../redux/slices/productSlice";
import {
  selectProductById,
  selectProductState,
} from "../redux/selectors/productSelector";
import { useDispatch, useSelector } from "react-redux";
import LazyImage from "./common/LazyImage";
import ProductDetailPlaceholder from "./ProductDetailPlaceholder";

function ProductDetail() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductById(id));

    return () => dispatch(clearProduct());
  }, [dispatch, id]);

  const { loading } = useSelector(selectProductState);
  const product = useSelector(selectProductById);

  const handleAddToCart = (id, qty) => {
    navigate(`/cart/${id}?qty=${qty}`);
    // dispatch(addToCart({ id, qty }));
  };

  return (
    <>
      {loading && <ProductDetailPlaceholder />}
      {product && (
        <div>
          <Row>
            <Col md={6}>
              {/* <Image src={product.image} alt={product.name} fluid /> */}
              <LazyImage
                src={product.image}
                alt={product.name}
                className="card-img-top"
              />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="my-auto">Qty:</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Select
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block w-100"
                      disabled={product.countInStock == 0}
                      type="button"
                      onClick={() => handleAddToCart(product._id, qty)}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
