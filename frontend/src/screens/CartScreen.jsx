import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import CheckoutSteps from "../components/common/CheckoutSteps";

const CartScreen = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <CheckoutSteps step1 />
          <h3>Shopping Cart</h3>
          <Cart />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default CartScreen;
