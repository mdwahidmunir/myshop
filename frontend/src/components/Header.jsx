import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  selectUserName,
  selectUserState,
} from "../redux/selectors/userSelector";
import { selectIsLoggedIn } from "../redux/selectors/authSelector";
import { useEffect, useState } from "react";
import { getUserAsync } from "../redux/slices/userSlice";
import { logout } from "../redux/slices/authSlice";
import SearchBar from "./SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const { loading: userLoading } = useSelector(selectUserState);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleLogoClick = () => {
    setSearchTerm("");
    navigate("/");
  };

  useEffect(() => {
    if (!userName && isAuthenticated && !userLoading) {
      dispatch(getUserAsync());
    }
  }, [isAuthenticated, userName, dispatch, userLoading]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand className="cursor-pointer" onClick={handleLogoClick}>
            MyShop
          </Navbar.Brand>

          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>

              {userName ? (
                <NavDropdown title={userName}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={(e) => handleLogout(e)}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
