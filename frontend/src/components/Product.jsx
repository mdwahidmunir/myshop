import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image} />
        </a>

        <Card.Body>
          <a href={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </a>

          <Card.Text as="div">
            <div className="my-3">
              <Rating value={product.rating} color={"#f8e825"} />
            </div>
          </Card.Text>

          <Card.Text as="div">
            <div className="my-3">
              {product.rating} out of {product.numReviews} reviews
            </div>
          </Card.Text>

          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
