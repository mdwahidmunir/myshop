import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import ForgetPassword from "../components/ForgetPassword";

const ForgetPasswordScreen = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <ForgetPassword />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default ForgetPasswordScreen;
