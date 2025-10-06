import { Link, useLocation } from "react-router";
import PriceCauculate from "./PriceCauculate/PriceCauculate";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const OrderSummery = ({
  //   subTotal,
  cartData,
  //   vatCalCulate,
  //   finalTotalSummeryCost,
  //   updatedCart,
}) => {
  const location = useLocation();
  console.log(location);
  console.log(cartData);
  const subTotal = cartData.reduce(
    (sum, item) => sum + item.totalCalculatePrice,
    0
  );
  const vatCalCulate = Math.round(subTotal * 0.02);
  const finalTotalSummeryCost = Math.round(subTotal + vatCalCulate);
  console.log(finalTotalSummeryCost);
  const [updatedCart] = PriceCauculate([]);
  console.log(updatedCart);

  return (
    <div className="bg-gray-50 p-5 rounded-md shadow space-y-6 sticky top-22">
      <p>
        <b>Order Summery</b>
      </p>
      <div className="space-y-4">
        <p className="flex justify-between">
          <span>Subtotal</span> <span>$ {subTotal}</span>
        </p>
        <p className="flex justify-between">
          <span>
            Vat <small className="font-bold">(2%)</small>
          </span>{" "}
          <span> + ${vatCalCulate}</span>
        </p>
        <p className="flex justify-between">
          <span>Total</span>
          <span>${finalTotalSummeryCost}</span>
        </p>
      </div>
      {location.pathname === "/cart" && (
        <div className="">
          {cartData.length !== 0 ? (
            <Link
              to="/checkOut"
              state={{
                cartData: cartData,
                finalTotalSummeryCost: finalTotalSummeryCost,
              }}
            >
              <button className="btn bg-black text-white font-bold rounded-lg tracking-[20] w-full hover:bg-white hover:text-black">
                Proceed to Checkout
              </button>
            </Link>
          ) : (
            <button className="cursor-default btn">...loading</button>
          )}
          <button className="w-full hover:underline">
            {" "}
            <Link to="/">Continue Shopping</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSummery;
