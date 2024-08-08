import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import Loader from "../components/Loader";
const LazyProductList = React.lazy(() => import("../components/ProductList"));

function HomeScreen() {
  return (
    <>
      <div>
        <Header />
        <main className="py-3">
          <Container>
            <React.Suspense fallback={<Loader />}>
              <LazyProductList />
            </React.Suspense>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default HomeScreen;
