import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Container } from "react-bootstrap";
import OrderDetails from "../components/OrderDetails";
import { useNavigate } from "react-router-dom";

function OrderDetailsScreen() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Button onClick={handleClick} className="btn btn-light my-3">
            Go Back
          </Button>
          <OrderDetails />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default OrderDetailsScreen;
