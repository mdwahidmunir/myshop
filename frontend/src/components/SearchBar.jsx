import { useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ITEMS_LIMIT } from "../utils/constants";

const SearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const timeOutId = setTimeout(() => {
      let keyword;
      if (searchParams.get("search") && searchTerm.trim() === "") {
        searchParams.delete("search");
        keyword = `/?${searchParams.toString()}`;
        console.log("navigating with delete...", keyword);
        navigate(keyword);
      } else if (searchTerm !== "") {
        searchParams.set("search", searchTerm);

        !searchParams.get("page") && searchParams.set("page", 1);
        !searchParams.get("limit") && searchParams.set("limit", ITEMS_LIMIT);
        keyword = `/?${searchParams.toString()}`;
        console.log("navigating...", keyword);
        navigate(keyword);
      }
    }, 500);

    return () => {
      clearInterval(timeOutId);
    };
  }, [searchTerm, navigate, location.search]);
  return (
    <div>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-sm-2 rounded"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e)}
        />
      </Form>
    </div>
  );
};

export default SearchBar;
