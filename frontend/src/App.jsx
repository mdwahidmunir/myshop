import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import store from "./redux/store";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import ProfileScreen from "./screens/ProfileScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import ShippinScreen from "./screens/ShippinScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrdersScreen from "./screens/OrdersScreen";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route
              path="/cart/:id?"
              element={
                <ProtectedRoutes>
                  <CartScreen />
                </ProtectedRoutes>
              }
            />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<SignupScreen />} />
            <Route path="/forget-password" element={<ForgetPasswordScreen />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <ProfileScreen />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/shipping"
              element={
                <ProtectedRoutes>
                  <ShippinScreen />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/payment-method"
              element={
                <ProtectedRoutes>
                  <PaymentMethodScreen />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/place-order"
              element={
                <ProtectedRoutes>
                  <PlaceOrderScreen />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoutes>
                  <OrdersScreen />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
