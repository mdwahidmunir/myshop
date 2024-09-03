import Pagination from "react-bootstrap/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { ITEMS_LIMIT } from "../../utils/constants";

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}
const Paginate = ({ page, totalPages }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sort = searchParams.get("sort");

  const handleClick = (page) => {
    !searchParams.get("limit") && searchParams.set("limit", ITEMS_LIMIT);
    if (sort) {
      searchParams.set("sort", sort);
      searchParams.set("page", page);
      const keyword = `/?${searchParams.toString()}`;
      navigate(keyword);
    } else {
      searchParams.set("page", page);
      const keyword = `/?${searchParams.toString()}`;
      navigate(keyword);
    }
  };
  return (
    <>
      <Pagination>
        {[...Array(totalPages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={page === x + 1}
            onClick={() => handleClick(x + 1)}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default Paginate;
