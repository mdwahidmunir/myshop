import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import {
  logout,
  setAuthError,
  setAuthToken,
  signup,
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  let authToken = useSelector(selectAuthToken);
  const { error } = useSelector(selectAuthState);
  const redirect = location.search
    ? location.search.split("?redirect=")[1]
    : "/";

  const areEmptyFieldsPresent = () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      !name ||
      !email ||
      !password ||
      !confirmPassword
    )
      return true;
    return false;
  };

  const isPwdAndConfPwdMismatch = () => {
    return password !== confirmPassword;
  };

  const isLessThanRequiredLength = (element, minLength) => {
    return element.length < minLength;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Validators
    if (areEmptyFieldsPresent()) {
      dispatch(setAuthError("Fields cant be left empty"));
      return;
    }
    if (isLessThanRequiredLength(password, 8)) {
      dispatch(setAuthError("Password should be of minimum 8 charecters"));
      return;
    }
    if (isPwdAndConfPwdMismatch()) {
      dispatch(setAuthError("Password and Confirm Password does not match"));
      return;
    }

    dispatch(signup({ name, email, password, confirmPassword }));
  };

  // const handleCloseClick = () => {
  //   dispatch(resetError());
  // };

  useEffect(() => {
    if (authToken) {
      navigate(redirect);
    }
  }, [navigate, redirect, authToken, dispatch]);

  useEffect(() => {
    if (error) toast.error(error, { autoClose: 3000 });
    return () => {
      dispatch(resetError());
    };
  }, [dispatch, error]);

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <h1>Sign up</h1>
        {/* {error && (
          <Message variant="danger">
            {error}{" "}
            <span to="/login" onClick={handleCloseClick}>
              <IoCloseSharp className="fas-danger-close" />
            </span>
          </Message>
        )} */}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email Address *</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password *</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Row className="py-3">
            <Col>
              Already a user ? &nbsp;
              <Link to={"/login"}>Log In</Link>
            </Col>
          </Row>

          <Button type="submit" variant="primary">
            Sign Up
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Signup;
