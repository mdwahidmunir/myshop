import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import {
  selectUserInfo,
  selectUserState,
} from "../redux/selectors/userSelector";
import { setAuthError } from "../redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { updateUserAsync } from "../redux/slices/userSlice";
import "react-toastify/dist/ReactToastify.css";
import FormContainer from "./common/FormContainer";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disablePasswordSection, setDisablePasswordSection] = useState(true);
  const dispatch = useDispatch();

  const { loading } = useSelector(selectUserState);

  const areEmptyFieldsPresent = () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      !name ||
      !email ||
      (!disablePasswordSection &&
        (password.trim() === "" ||
          confirmPassword.trim() === "" ||
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

  const switchHandler = () => {
    setDisablePasswordSection((prevState) => !prevState);
  };

  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <h2>User Profile</h2>
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

          <Button type="submit" disabled={loading} variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Profile;
