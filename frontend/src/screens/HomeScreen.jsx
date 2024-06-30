import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import { Container } from "react-bootstrap";

function HomeScreen() {
  return (
    <>
      <div>
        <Header />
        <main className="py-3">
          <Container>
            <ProductList />
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default HomeScreen;
