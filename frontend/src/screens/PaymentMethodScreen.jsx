import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import PaymentMethod from "../components/PaymentMethod";
import CheckoutSteps from "../components/common/CheckoutSteps";
import { useSelector } from "react-redux";
import { selectShippingInfo } from "../redux/selectors/shippingSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { address } = useSelector(selectShippingInfo);

  useEffect(() => {
    if (!address) navigate("/shipping");
  }, [navigate, address]);

  return (
    <>
      <div>
        <Header />
        <main className="py-3">
          <Container>
            <CheckoutSteps step1 step2 step3 />
            <PaymentMethod />
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default PaymentMethodScreen;
