import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../redux/selectors/productSelector";
import Product from "../components/Product";
import { useEffect } from "react";
import { fetchAllProducts } from "../redux/slices/productSlice";

function ProductList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const products = useSelector(selectAllProducts);
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products &&
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default ProductList;
