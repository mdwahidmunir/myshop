import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    dispatch(addToCart({ id, qty }));
  }, [dispatch, id, qty]);

  return (
    <div>
      <h3>Cart :: {id}</h3>{" "}
    </div>
  );
};

export default Cart;
