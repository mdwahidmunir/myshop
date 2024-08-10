import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import { selectAuthState } from "../redux/selectors/authSelector";
import { selectUserInfo } from "../redux/selectors/userSelector";
import { logout, resetError, setAuthError } from "../redux/slices/authSlice";
import Message from "./Message";
import { ToastContainer, toast } from "react-toastify";
import { IoCloseSharp } from "react-icons/io5";
import { updateUserAsync } from "../redux/slices/userSlice";
import "react-toastify/dist/ReactToastify.css";
import { isLoggedIn } from "../utils/cookieParser";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disablePasswordSection, setDisablePasswordSection] = useState(true);
  const dispatch = useDispatch();

  const { error } = useSelector(selectAuthState);

  const areEmptyFieldsPresent = () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      !name ||
      !email ||
      (!disablePasswordSection &&
        (password.trim() === "" ||
          confirmPassword.trim() === "" ||
          !name ||
          !email ||
          !password ||
          !confirmPassword))
    ) {
      return true;
    }
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
    if (!isLoggedIn()) {
      dispatch(logout());
      return;
    }

    // Validators
    if (areEmptyFieldsPresent()) {
      dispatch(setAuthError("Fields cant be left empty"));
      return;
    }
    if (!disablePasswordSection && isLessThanRequiredLength(password, 8)) {
      dispatch(setAuthError("Password should be of minimum 8 charecters"));
      return;
    }
    if (!disablePasswordSection && isPwdAndConfPwdMismatch()) {
      dispatch(setAuthError("Password and Confirm Password does not match"));
      return;
    }

    let reqBody = {
      name,
      email,
    };
    if (!disablePasswordSection)
      reqBody = { ...reqBody, password, confirmPassword };

    const response = await dispatch(updateUserAsync(reqBody));

    // Resetting the field so as to show user some action took place
    if (!disablePasswordSection) {
      setPassword("");
      setConfirmPassword("");
    }
    if (response.type === updateUserAsync.fulfilled.toString()) {
      toast.success("Profile updated successfully!", { autoClose: 3000 });
    } else {
      toast.error("Failed to update profile", { autoClose: 3000 });
    }
  };

  const handleCloseClick = () => {
    dispatch(resetError());
  };

  const switchHandler = () => {
    setDisablePasswordSection((prevState) => !prevState);
  };

  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);

  return (
    <Row>
      <ToastContainer />
      <Col md={3}>
        <h2>User Profile</h2>
        {error && (
          <Message variant="danger">
            {error}{" "}
            <span to="/login" onClick={handleCloseClick}>
              <IoCloseSharp className="fas-danger-close" />
            </span>
          </Message>
        )}
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

          <Form.Group controlId="password-switch" className="mb-3">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Change Password ?"
              onChange={switchHandler}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              disabled={disablePasswordSection}
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password *</Form.Label>
            <Form.Control
              disabled={disablePasswordSection}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>Orders</h2>
      </Col>
    </Row>
  );
};

export default Profile;
