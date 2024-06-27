import { Link, useParams } from "react-router-dom";
import { products } from "../product";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import ProductDetail from "../components/ProductDetail";

function ProductScreen() {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <ProductDetail product={product} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default ProductScreen;
