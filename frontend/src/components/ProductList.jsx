import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  selectProductPageInfo,
} from "../redux/selectors/productSelector";
import Product from "../components/Product";
import { useEffect } from "react";
import { fetchAllProducts, fetchProducts } from "../redux/slices/productSlice";
import Loader from "../components/Loader";
import { selectProductState } from "../redux/selectors/productSelector";
import Message from "../components/Message";
import Paginate from "./common/Paginate";
import { useLocation } from "react-router-dom";
import { ITEMS_LIMIT } from "../utils/constants";

function ProductList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const keywords = location.search;

  const products = useSelector(selectAllProducts);
  const { loading, error } = useSelector(selectProductState);
  const { currentPage, totalItems } = useSelector(selectProductPageInfo);

  const totalPages = Math.ceil(totalItems / ITEMS_LIMIT);

  useEffect(() => {
    dispatch(fetchProducts(keywords));
  }, [dispatch, keywords, totalPages]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
          <div className="d-flex justify-content-between align-items-center my-3">
            <span>
              Showing {(currentPage - 1) * ITEMS_LIMIT + 1} to{" "}
              {currentPage === totalPages
                ? totalItems
                : ITEMS_LIMIT * currentPage}{" "}
              of {totalItems} results
            </span>
            <Paginate page={currentPage} totalPages={totalPages} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
