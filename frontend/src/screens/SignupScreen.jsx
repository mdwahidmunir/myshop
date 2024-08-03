import Header from "../components/Header";
import Signup from "../components/Signup";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";

const SignupScreen = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Signup />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default SignupScreen;
