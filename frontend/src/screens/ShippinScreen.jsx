import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import Shipping from "../components/Shipping";
import CheckoutSteps from "../components/common/CheckoutSteps";

const ShippinScreen = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <CheckoutSteps step1 step2 />
          <Shipping />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default ShippinScreen;
