import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Container } from "react-bootstrap";
import ProductDetail from "../components/ProductDetail";

function ProductScreen() {
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
          <ProductDetail />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default ProductScreen;
