import React, { useEffect, useState } from "react";
import useCart from "../../../../hooks/useCart";

const PriceCauculate = () => {
  const [cart] = useCart([]);
  const [updatedCart, setUpdatedCart] = useState([]);
  useEffect(() => {
    const subTotal = cart.reduce(
      (sum, item) => sum + item.totalCalculatePrice,
      0
    );
    const vatCalCulate = Math.round(subTotal * 0.02);
    const finalTotalSummeryCost = Math.round(subTotal + vatCalCulate);
    console.log(finalTotalSummeryCost);
    setUpdatedCart({
      ...cart,
      subTotal,
      vatCalCulate,
      finalTotalSummeryCost,
    });
  }, [cart]);
  return [updatedCart];
};

export default PriceCauculate;
