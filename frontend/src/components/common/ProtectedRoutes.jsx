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
  let { loading } = useSelector(selectAuthState);

  useEffect(() => {
    // if (!cookieParser().jwt) {
    //   dispatch(logout());
    // }
    // if (!authToken && cookieParser().jwt) {
    //   const currentToken = cookieParser().jwt;
    //   dispatch(setAuthToken(currentToken));
    // }

    if (!loading && !authToken) {
      dispatch(logout());
      return;
    }

    if (!authToken) {
      navigate(`/login?redirect=${redirect}`);
    }
  }, [dispatch, navigate, authToken, redirect, loading]);

  return <>{authToken ? children : <LoginScreen />}</>;
};

export default ProtectedRoutes;
