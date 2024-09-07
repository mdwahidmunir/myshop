import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import LazyImage from "./common/LazyImage";

function Product({ product }) {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          {/* <Card.Img src={product.image} /> */}
          <LazyImage
            src={product.image}
            alt={product.name}
            className="card-img-top"
          />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={product.rating}
                text={`${product.rating} out of ${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </div>
          </Card.Text>

          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
