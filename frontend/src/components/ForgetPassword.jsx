import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import {
  decOTPCountDown,
  logout,
  passwordResetAsync,
  resetMessage,
  resetOTPToast,
  sendOTPAsync,
  setAuthError,
  setAuthToken,
} from "../redux/slices/authSlice";
import {
  selectAuthToken,
  selectAuthState,
  selectOTPStatus,
  selectAuthMessage,
} from "../redux/selectors/authSelector";
import { resetError } from "../redux/slices/authSlice";
import FormContainer from "./common/FormContainer";
import Message from "./Message";
import { Link } from "react-router-dom";
import cookieParser, { isLoggedIn } from "../utils/cookieParser";
import { IoCloseSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableOTP, setDisableOTP] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  let authToken = useSelector(selectAuthToken);
  const { error } = useSelector(selectAuthState);
  const otpStatus = useSelector(selectOTPStatus);
  const message = useSelector(selectAuthMessage);

  const redirect = location.search
    ? location.search.split("?redirect=")[1]
    : "/";

  const resetFormFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOTP("");
  };
  const areEmptyFieldsPresent = () => {
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      !email ||
      !password ||
      !confirmPassword ||
      (!disableOTP && (otp.trim() === "" || !otp))
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

  const submitHandler = async (e) => {
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

    const response = await dispatch(
      passwordResetAsync({ email, password, confirmPassword, otp })
    );

    if (response.type === passwordResetAsync.rejected.toString()) {
      setOTP("");
    } else if (response.type === passwordResetAsync.fulfilled.toString())
      resetFormFields();
  };

  const otpHandler = () => {
    dispatch(sendOTPAsync(email));
  };

  const handleCloseClick = () => {
    dispatch(resetError());
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      dispatch(logout());
    }
    if (!authToken && isLoggedIn()) {
      const currentToken = cookieParser().jwt;
      dispatch(setAuthToken(currentToken));
    }
    if (authToken) {
      navigate(redirect);
    }
    return () => {
      dispatch(resetError());
    };
  }, [navigate, redirect, authToken, dispatch]);

  useEffect(() => {
    setDisableOTP(!(email && password && confirmPassword));
  }, [email, password, confirmPassword]);

  useEffect(() => {
    if (otpStatus.countDown > 0) {
      const interval = setInterval(() => {
        dispatch(decOTPCountDown());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpStatus, otpStatus.countdown, dispatch]);

  useEffect(() => {
    if (otpStatus.sending)
      toast.info("Sending OTP to your registered email !", { autoClose: 3000 });
    else if (otpStatus.message)
      toast.success(otpStatus.message, { autoClose: 3000 });
    else if (error) toast.error(error, { autoClose: 3000 });
    if (passwordResetAsync.fulfilled) return () => dispatch(resetOTPToast());
  }, [dispatch, otpStatus.sending, otpStatus.message, error]);

  useEffect(() => {
    if (message) toast.success("Password updated successfully !");
    return () => dispatch(resetMessage());
  }, [dispatch, message]);

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <h1>Forget Password</h1>
        {error && (
          <Message variant="danger">
            {error}{" "}
            <span to="/login" onClick={handleCloseClick}>
              <IoCloseSharp className="fas-danger-close" />
            </span>
          </Message>
        )}

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address *</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password *</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="otp" className="mb-3">
            <Form.Label>OTP *</Form.Label>
            <Form.Control
              type="text"
              disabled={disableOTP}
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </Form.Group>
          <Row className="py-3">
            <Col>
              Already a user ? &nbsp;
              <Link to={"/login"}>Log In</Link>
            </Col>
          </Row>
          {otpStatus && otpStatus.countDown > 0 && (
            <p>Resend OTP in {otpStatus.countDown} secs</p>
          )}
          <Button
            disabled={disableOTP || otpStatus.countDown > 0}
            onClick={otpHandler}
            type="button"
            variant="primary"
          >
            Send OTP
          </Button>
          &nbsp;&nbsp;
          <Button type="submit" variant="primary">
            Reset Password
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ForgetPassword;
