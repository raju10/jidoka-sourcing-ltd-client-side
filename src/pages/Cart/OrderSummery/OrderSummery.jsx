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
  // console.log(location);
  // console.log(cartData);
  const subTotal = cartData.reduce(
    (sum, item) => sum + item.totalCalculatePrice,
    0
  );
  const vatCalCulate = Math.round(subTotal * 0.02);
  const finalTotalSummeryCost = Math.round(subTotal + vatCalCulate);
  // console.log(finalTotalSummeryCost);
  const [updatedCart] = PriceCauculate([]);
  // console.log(updatedCart);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6 sticky top-20">
      <h2 className="text-xl font-bold text-gray-800 border-b border-gray-50 pb-4">
        Order Summary
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between text-gray-600 font-medium">
          <span>Subtotal</span>
          <span className="text-gray-900 font-bold">${subTotal}</span>
        </div>
        <div className="flex justify-between text-gray-600 font-medium">
          <span>
            VAT <small className="text-blue-500 font-bold ml-1">(2%)</small>
          </span>
          <span className="text-gray-900 font-bold">+ ${vatCalCulate}</span>
        </div>
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-2xl font-black text-blue-600">
            ${finalTotalSummeryCost}
          </span>
        </div>
      </div>

      {location.pathname === "/cart" && (
        <div className="space-y-3 pt-4">
          {cartData.length !== 0 ? (
            <Link
              to="/checkOut"
              state={{
                cartData: cartData,
                finalTotalSummeryCost: finalTotalSummeryCost,
              }}
              className="block"
            >
              <button className="w-full bg-black hover:bg-zinc-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] uppercase tracking-wider text-sm">
                Proceed to Checkout
              </button>
            </Link>
          ) : (
            <button className="w-full bg-gray-100 text-gray-400 font-bold py-4 rounded-xl cursor-not-allowed uppercase text-sm" disabled>
              Cart is Empty
            </button>
          )}
          <Link
            to="/"
            className="block text-center text-gray-500 hover:text-black font-medium text-sm transition-colors py-2 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderSummery;
