import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import ProductDetail from "../components/ProductDetail";

function ProductScreen() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <ProductDetail />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default ProductScreen;
