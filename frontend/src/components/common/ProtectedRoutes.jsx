import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthState,
  selectAuthToken,
} from "../../redux/selectors/authSelector";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import cookieParser from "../../utils/cookieParser";
import { logout, setAuthToken } from "../../redux/slices/authSlice";
import LoginScreen from "../../screens/LoginScreen";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.pathname
    ? location.pathname + location.search
    : "/";

  let authToken = useSelector(selectAuthToken);

  useEffect(() => {
    if (!authToken) {
      navigate(`/login?redirect=${redirect}`);
    }
  }, [navigate, authToken, redirect]);

  return <>{authToken ? children : <LoginScreen />}</>;
};

export default ProtectedRoutes;
