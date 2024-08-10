import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import Profile from "../components/Profile";

function ProfileScreen() {
  return (
    <>
      <div>
        <Header />
        <main className="py-3">
          <Container>
            <Profile />
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default ProfileScreen;
