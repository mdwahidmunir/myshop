import { Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../redux/slices/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "./common/Paginate";
import Product from "../components/Product";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectAllProducts,
  selectProductPageInfo,
  selectProductState,
} from "../redux/selectors/productSelector";
import { ITEMS_LIMIT, SORT_DROPDOWN } from "../utils/constants";
import { getFiltersAsync } from "../redux/slices/filterSlice";
import ProductPlaceholder from "./ProductPlaceholder";
import ProductListPLaceholder from "./ProductListPLaceholder";
import {
  selectBrands,
  selectCategories,
} from "../redux/selectors/filtersSelector";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [queryParams, setQueryParams] = useState({});
  const [sortParam, setSortParam] = useState(queryParams.sort || "default");
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  const products = useSelector(selectAllProducts);
  const { loading, error } = useSelector(selectProductState);
  const { currentPage, totalItems, totalPage } = useSelector(
    selectProductPageInfo
  );

  const handleSort = (e) => {
    const _sortParam = e.target.value;
    setSortParam(_sortParam);
    let keyword;
    if (_sortParam !== "default") {
      searchParams.set("sort", _sortParam);
      searchParams.set("page", 1);
      searchParams.set("limit", ITEMS_LIMIT);
      keyword = `/?${searchParams.toString()}`;
    } else keyword = `/?page=1&limit=${ITEMS_LIMIT}`;
    navigate(keyword);
  };

  const handleFilter = (type, value) => {
    let keyword;
    if (value !== "default") {
      searchParams.set(type, value);
      searchParams.set("page", 1);
      searchParams.set("limit", ITEMS_LIMIT);
      keyword = `/?${searchParams.toString()}`;
    } else {
      searchParams.delete(type);
      searchParams.set("page", 1);
      searchParams.set("limit", ITEMS_LIMIT);
      keyword = `/?${searchParams.toString()}`;
    }
    console.log("navigating filter ...", keyword);
    navigate(keyword);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    setQueryParams(params);

    !queryParams.sort
      ? setSortParam("default")
      : setSortParam(queryParams.sort);

    dispatch(getFiltersAsync());
    dispatch(fetchProducts(location.search));
  }, [dispatch, location.search, queryParams.sort]);

  return (
    <>
      {loading ? (
        <>
          {/* <Loader /> */}
          <ProductListPLaceholder />
        </>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h1>Latest Products</h1>
          <Row className="align-items-center mb-3">
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <Form.Select
                onChange={(e) => handleFilter("brand", e.target.value)}
                value={queryParams.brand || "default"}
              >
                {Object.keys(brands).map((key) => (
                  <option key={key} value={key}>
                    {brands[key]}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <Form.Select
                onChange={(e) => handleFilter("category", e.target.value)}
                value={queryParams.category || "default"}
              >
                {Object.keys(categories).map((key) => (
                  <option key={key} value={key}>
                    {categories[key]}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={4}>
              <Form.Select value={sortParam} onChange={handleSort}>
                {Object.keys(SORT_DROPDOWN).map((key) => (
                  <option key={key} value={key}>
                    {SORT_DROPDOWN[key]}
                  </option>
                ))}
              </Form.Select>
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
            {totalItems !== 0 ? (
              <span>
                Showing {(currentPage - 1) * ITEMS_LIMIT + 1} to{" "}
                {currentPage === totalPage
                  ? totalItems
                  : ITEMS_LIMIT * currentPage}{" "}
                of {totalItems} results
              </span>
            ) : (
              <span>Showing 0 to 0 of 0 results</span>
            )}
            <Paginate page={currentPage} totalPages={totalPage} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
