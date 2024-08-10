import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { selectUserName } from "../redux/selectors/userSelector";
import { selectIsLoggedIn } from "../redux/selectors/authSelector";
import { useEffect } from "react";
import { getUserAsync } from "../redux/slices/userSlice";
import { logout } from "../redux/slices/authSlice";

function Header() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const isAuthenticated = useSelector(selectIsLoggedIn);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout()).unwrap();
  };

  useEffect(() => {
    if (!userName && isAuthenticated) {
      dispatch(getUserAsync());
    }
  }, [isAuthenticated, userName, dispatch]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MyShop</Navbar.Brand>
          </LinkContainer>

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
