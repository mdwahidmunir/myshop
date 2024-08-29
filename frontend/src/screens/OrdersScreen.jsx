import { Container } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
import OrdersPlaceholder from "../components/OrdersPlaceholder";
const LazyOrders = React.lazy(() => import("../components/Orders"));

const OrdersScreen = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <React.Suspense fallback={<OrdersPlaceholder />}>
            <LazyOrders />
          </React.Suspense>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default OrdersScreen;
