import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import CheckoutSteps from "../components/common/CheckoutSteps";
import PlaceOrder from "../components/PlaceOrder";

const PlaceOrderScreen = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <CheckoutSteps step1 step2 step3 step4 />
          <PlaceOrder />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceOrderScreen;
