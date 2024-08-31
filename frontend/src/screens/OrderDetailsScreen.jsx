import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import OrderDetails from "../components/OrderDetails";

function OrderDetailsScreen() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <OrderDetails />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default OrderDetailsScreen;
