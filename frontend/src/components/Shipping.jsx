import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { logout, setAuthError, setAuthToken } from "../redux/slices/authSlice";
import { selectAuthToken } from "../redux/selectors/authSelector";
import {
  resetError,
  setShippingError,
  setShippingInfo,
} from "../redux/slices/shippingSlice";
import { selectShippingInfo } from "../redux/selectors/shippingSelector";
import { getShippingInfo } from "../redux/slices/shippingSlice";
import cookieParser, { isLoggedIn } from "../utils/cookieParser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormContainer from "./common/FormContainer";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let authToken = useSelector(selectAuthToken);
  const {
    error,
    address: _address,
    city: _city,
    postalCode: _postalCode,
    country: _country,
  } = useSelector(selectShippingInfo);

  const areEmptyFieldsPresent = () => {
    if (
      address.trim() === "" ||
      city.trim() === "" ||
      country.trim() === "" ||
      postalCode.trim() === "" ||
      !address ||
      !city ||
      !country ||
      !postalCode
    )
      return true;
    return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Validators
    if (areEmptyFieldsPresent()) {
      dispatch(setShippingError("Fields cant be left empty !"));
      return;
    }

    // Set the addresses in Backend only if they are different than inital state
    if (
      _address !== address ||
      _city !== city ||
      _postalCode !== postalCode ||
      _country !== country
    )
      dispatch(setShippingInfo({ address, city, country, postalCode }));
    navigate("/payment-method");
  };

  useEffect(() => {
    if (authToken && !_address) dispatch(getShippingInfo());
  }, [authToken, dispatch, _address]);

  useEffect(() => {
    if (error) toast.error(error, { autoClose: 3000 });
    return () => {
      dispatch(resetError());
    };
  }, [dispatch, error, authToken]);

  useEffect(() => {
    if (_address && _city && _country && _postalCode) {
      setAddress(_address);
      setCity(_city);
      setCountry(_country);
      setPostalCode(_postalCode);
    }
  }, [_address, _city, _postalCode, _country]);

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <h1>Shipping Information</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address" className="mb-3">
            <Form.Label>Address *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="postalCode" className="mb-3">
            <Form.Label>Postal Code *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="city" className="mb-3">
            <Form.Label>City *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="country" className="mb-3">
            <Form.Label>Country *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Shipping;
