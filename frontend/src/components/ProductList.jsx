import { Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  selectProductPageInfo,
} from "../redux/selectors/productSelector";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { fetchProducts } from "../redux/slices/productSlice";
import Loader from "../components/Loader";
import { selectProductState } from "../redux/selectors/productSelector";
import Message from "../components/Message";
import Paginate from "./common/Paginate";
import { useLocation, useNavigate } from "react-router-dom";
import { ITEMS_LIMIT } from "../utils/constants";
import { SORT_DROPDOWN } from "../utils/constants";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const keywords = location.search;
  const searchParams = new URLSearchParams(keywords);
  const sort = searchParams.get("sort");
  const [sortParam, setSortParam] = useState(sort || "default");

  const products = useSelector(selectAllProducts);
  const { loading, error } = useSelector(selectProductState);
  const { currentPage, totalItems, totalPage } = useSelector(
    selectProductPageInfo
  );

  const totalPages = Math.ceil(totalItems / ITEMS_LIMIT);

  const handleSort = (e) => {
    const _sortParam = e.target.value;
    setSortParam(_sortParam);
    let keyword;
    if (_sortParam !== "default")
      keyword = `/?page=1&limit=${ITEMS_LIMIT}&sort=${_sortParam}`;
    else keyword = `/?page=1&limit=${ITEMS_LIMIT}`;
    navigate(keyword);
  };

  useEffect(() => {
    dispatch(fetchProducts(keywords));
  }, [dispatch, keywords]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h1>Latest Products</h1>
          <Row className="align-items-center mb-3">
            <Col className="text-end" md={{ span: 3, offset: 9 }}>
              <Form>
                <Form.Select
                  as="select"
                  value={sortParam}
                  onChange={(e) => handleSort(e)}
                >
                  {[...Object.keys(SORT_DROPDOWN)].map((x) => (
                    <option key={x} value={x}>
                      {SORT_DROPDOWN[x]}
                    </option>
                  ))}
                </Form.Select>
              </Form>
            </Col>
          </Row>
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
            <Paginate page={currentPage} totalPages={totalPage} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
