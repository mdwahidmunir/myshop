import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import {
  clearToken,
  login,
  setAuthError,
  setAuthToken,
} from "../redux/slices/authSlice";
import {
  selectAuthToken,
  selectAuthState,
} from "../redux/selectors/authSelector";
import { resetError } from "../redux/slices/authSlice";
import FormContainer from "./common/FormContainer";
import Message from "./Message";
import { Link } from "react-router-dom";
import cookieParser from "../utils/cookieParser";
import { IoCloseSharp } from "react-icons/io5";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let authToken = useSelector(selectAuthToken);

  const { error } = useSelector(selectAuthState);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      dispatch(setAuthError("Email or Password cant be empty"));
      return;
    }
    dispatch(login({ email, password }));
  };

  const handleLogin = () => {
    dispatch(resetError());
  };

  useEffect(() => {
    if (!cookieParser().jwt) {
      dispatch(clearToken());
      return;
    }
    if (!authToken && cookieParser().jwt) {
      authToken = cookieParser().jwt;
      dispatch(setAuthToken(authToken));
    }

    if (authToken) {
      navigate(redirect);
    }
  }, [navigate, redirect, authToken, dispatch]);

  return (
    <>
      <FormContainer>
        <h1>Log In</h1>
        {error && (
          <Message variant="danger">
            {error}{" "}
            <Link to="/login" onClick={handleLogin}>
              <IoCloseSharp style={{ color: "#572120" }} />
            </Link>
          </Message>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Row className="py-3">
            <Col>
              New User ? &nbsp;
              <Link
                to={redirect ? `register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </Col>
          </Row>

          <Button type="submit" variant="primary">
            Log In
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Login;
