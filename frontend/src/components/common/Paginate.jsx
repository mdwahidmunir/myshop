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
    if (sort) {
      navigate(`/?page=${page}&limit=${ITEMS_LIMIT}&sort=${sort}`);
    } else {
      navigate(`/?page=${page}&limit=${ITEMS_LIMIT}`);
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
