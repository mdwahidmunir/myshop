import React from "react";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const CartScreen = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <Cart />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default CartScreen;
