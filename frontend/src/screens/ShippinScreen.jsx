import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import Shipping from "../components/Shipping";

const ShippinScreen = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Shipping />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default ShippinScreen;
