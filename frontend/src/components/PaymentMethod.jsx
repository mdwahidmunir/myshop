import { Button, Col, Form } from "react-bootstrap";
import FormContainer from "./common/FormContainer";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPaymentMethod } from "../redux/slices/paymentSlice";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState("online");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Inside Payment paymentMode :", paymentMode);
    dispatch(setPaymentMethod(paymentMode));
    navigate("/place-order");
  };

  return (
    <>
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Group>
            <Form.Label as="label">Select Payment Method</Form.Label>
            <Col className="my-3">
              <Form.Check
                type="radio"
                label="UPI/NetBanking"
                id="online"
                name="paymentMethod"
                value="online"
                checked={paymentMode === "online"}
                onChange={(e) => setPaymentMode(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Cash"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={paymentMode === "cash"}
                onChange={(e) => setPaymentMode(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentMethod;
