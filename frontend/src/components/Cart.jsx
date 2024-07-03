import React from "react";
import { useParams } from "react-router-dom";

const Cart = () => {
  const { id } = useParams();
  return (
    <div>
      <h3>Cart :: {id}</h3>{" "}
    </div>
  );
};

export default Cart;
