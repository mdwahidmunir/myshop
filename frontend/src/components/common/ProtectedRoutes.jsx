import { useDispatch, useSelector } from "react-redux";
import { selectAuthToken } from "../../redux/selectors/authSelector";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import cookieParser from "../../utils/cookieParser";
import { clearToken, setAuthToken } from "../../redux/slices/authSlice";
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
    if (!cookieParser().jwt) {
      dispatch(clearToken());
    }
    if (!authToken && cookieParser().jwt) {
      const currentToken = cookieParser().jwt;
      dispatch(setAuthToken(currentToken));
    }
    if (!authToken) {
      navigate(`/login?redirect=${redirect}`);
    }
  }, [navigate, authToken, dispatch, redirect]);

  return <>{authToken ? children : <LoginScreen />}</>;
};

export default ProtectedRoutes;
