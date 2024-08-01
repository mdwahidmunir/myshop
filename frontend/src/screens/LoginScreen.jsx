import Header from "../components/Header";
import Login from "../components/Login";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Login />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default LoginScreen;
