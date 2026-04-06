// import { NavLink, useLocation } from "react-router";
// import pageTitle from "../../assets/New folder/page-title.png";
// import useCart from "../../hooks/useCart";
// import { useEffect, useState } from "react";
// const Cart = () => {
//   const location = useLocation();
//   console.log(location);
//   const [cart] = useCart([]);
//   const [priceAddOrLess, setPriceAddOrLess] = useState(1);
//   console.log(priceAddOrLess);
//   // keep quantities in local state (copy of cart with qty)

//   // create local state with quantity for each product
//   const [cartData, setCartData] = useState([]);
//   useEffect(() => {
//     // initialize cart with quantity and total price
//     const updated = cart.map((item) => ({
//       ...item,
//       quantity: item.noOfProduct || 1,
//       totalCalculatePrice: item.finalPrice * (item.noOfProduct || 1),
//     }));
//     setCartData(updated);
//   }, [cart]);
//   console.log(cartData);
//   // handle +/-
//   const handleQuantityChange = (id, type) => {
//     setCartData((prevCart) =>
//       prevCart.map((item) => {
//         if (item._id === id) {
//           let newQty =
//             type === "inc" ? item.noOfProduct + 1 : item.noOfProduct - 1;
//           if (newQty < 1) newQty = 1; // prevent negative or zero
//           return {
//             ...item,
//             noOfProduct: newQty,
//             total: newQty * item.totalCalculatePrice,
//           };
//         }
//         return item;
//       })
//     );
//   };
//   return (
//     <div className="min-h-screen bg-white">
//       <div className="relative">
//         <img src={pageTitle} alt="" className="w-full h-full" />

//         <div className="text-center items-center absolute top-[20%] left-0 right-0 font-bold text-xl space-x-2">
//           <div className="inline-block">
//             <h2>Cart</h2>
//           </div>
//           <div className="">
//             <NavLink to="/"> Home </NavLink>
//             {location.pathname && (
//               <NavLink to={location.pathname} className="text-blue-500">
//                 {location.pathname}
//               </NavLink>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* cart now */}
//       <div className="py-20 px-5">
//         <div className="overflow-x-auto">
//           <table className="table border-1 border-gray-200 ">
//             {/* head */}
//             <thead className="bg-gray-50 ">
//               <tr className="text-lg text-black">
//                 {/* <th></th> */}
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Total</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* row 1 */}
//               {cart.map((c, index) => (
//                 <tr key={c._id}>
//                   {/* <th>{index + 1}</th> */}
//                   <td className="flex items-center gap-2">
//                     {" "}
//                     <div className="">
//                       <img
//                         src={c.image}
//                         alt=""
//                         className="w-20 h-20 object-cover"
//                       />
//                     </div>
//                     <div className="">
//                       <h1 className="font-bold text-lg">{c.productTitle}</h1>
//                       <p>Color : {c.color}</p>
//                       <p>Size : {c.size}</p>
//                     </div>
//                   </td>
//                   <td>{c.finalPrice}</td>
//                   {/* <td>
//                     <div className="border-2 border-gray-300 flex justify-evenly list-none text-lg font-semibold py-1 rounded-lg">
//                       <li
//                         onClick={() => setPriceAddOrLess(priceAddOrLess - 1)}
//                         className="cursor-pointer"
//                       >
//                         -
//                       </li>
//                       <li>{c?.noOfProduct + priceAddOrLess}</li>
//                       <li onClick={() => setPriceAddOrLess(priceAddOrLess + 1)}>
//                         +
//                       </li>
//                     </div>
//                   </td> */}
//                   <td>
//                     <div className="border-2 border-gray-300 flex justify-evenly list-none text-lg font-semibold py-1 rounded-lg w-28">
//                       <li
//                         onClick={() => handleQuantityChange(c._id, "dec")}
//                         className="cursor-pointer"
//                       >
//                         -
//                       </li>
//                       <li>{c.noOfProduct}</li>
//                       <li
//                         onClick={() => handleQuantityChange(c._id, "inc")}
//                         className="cursor-pointer"
//                       >
//                         +
//                       </li>
//                     </div>
//                   </td>
//                   <td>{c.totalCalculatePrice}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

/////////////////////

import { Link, Navigate, NavLink, useLocation } from "react-router";

import useCart from "../../hooks/useCart";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import OrderSummery from "./OrderSummery/OrderSummery";
import CartBanner from "./CartBanner/CartBanner";
import PriceCauculate from "./OrderSummery/PriceCauculate/PriceCauculate";
import { Helmet } from "react-helmet-async";
const Cart = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  // console.log(location);
  const [cart, refetch] = useCart([]); // your hook data

  // local state for cart with updated qty
  const [cartData, setCartData] = useState([]);
  // console.log(cartData);

  // initialize cartData when cart comes
  useEffect(() => {
    const updated = cart.map((item) => ({
      ...item,
      noOfProduct: item.noOfProduct || 1,
      totalCalculatePrice: (item.finalPrice || 0) * (item.noOfProduct || 1),
    }));
    //  console.log(updated);
    setCartData(updated);
  }, [cart]);

  // handle +/- button
  const handleQuantityChange = (id, type) => {
    setCartData((prevCart) =>
      prevCart.map((item) => {
        if (item._id === id) {
          let newQty =
            type === "inc" ? item.noOfProduct + 1 : item.noOfProduct - 1;
          if (newQty < 1) newQty = 1; // prevent zero
          // calculate new total
          const newTotal = newQty * item.finalPrice;
          //  console.log(id, newQty, newTotal);

          updateCartQuantity(id, newQty, newTotal);
          return {
            ...item,
            noOfProduct: newQty,
            totalCalculatePrice: newTotal, // recalc
          };
        }
        return item;
      })
    );
  };
  // call backend API to persist quantity

  const updateCartQuantity = async (id, quantity, total) => {
    try {
      await axiosPublic.patch(`/carts/${id}`, {
        noOfProduct: quantity,
        totalCalculatePrice: total,
      });
    } catch (error) {
      console.error("Failed to update cart : ", error);
    }
  };

  // inject finalTotalSummeryCost into cartData items
  // useEffect(() => {
  //   setCartData((prev) =>
  //     prev.map((item) => ({ ...item, finalTotalSummeryCost }))
  //   );
  // }, [finalTotalSummeryCost]);

  //price calculate
  // const [updatedCart] = PriceCauculate([]);
  // console.log(updatedCart);
  // price calulation

  // const [updatedCart, setUpdatedCart] = useState([]);
  // useEffect(() => {
  //   const subTotal = cartData.reduce(
  //     (sum, item) => sum + item.totalCalculatePrice,
  //     0
  //   );
  //   const vatCalCulate = Math.round(subTotal * 0.02);
  //   const finalTotalSummeryCost = Math.round(subTotal + vatCalCulate);
  //   console.log(finalTotalSummeryCost);
  //   setUpdatedCart({
  //     ...cartData,
  //     subTotal,
  //     vatCalCulate,
  //     finalTotalSummeryCost,
  //   });
  // }, [cartData]);

  // handleDeleteItem
  const handleDeleteItem = async (e) => {
    // console.log(e);
    const res = await axiosPublic.delete(`carts/${e}`);
    // console.log(res);
    if (res.data.acknowledged > 0) {
      refetch();
      // Swal.fire({
      //   position: "top-end",
      //   icon: "success",
      //   title: "Your work has been saved",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
    }
  };
  return (
    <>
      <Helmet>
        <title>Jidoka Sourcing | Cart</title>
      </Helmet>
      <div className="min-h-screen bg-white pb-20">
        <CartBanner location={location} />

        <div className="container mx-auto px-4 py-10 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ">
            {/* Cart Items List */}
            <div className="col-span-1 lg:col-span-8">
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    {/* head */}
                    <thead className="bg-gray-50/50">
                      <tr className="text-gray-600 font-semibold border-b border-gray-100">
                        <th className="py-5 px-4 text-left">Product</th>
                        <th className="py-5 px-4 text-center hidden md:table-cell">Price</th>
                        <th className="py-5 px-4 text-center">Quantity</th>
                        <th className="py-5 px-4 text-center hidden sm:table-cell">Total</th>
                        <th className="py-5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {cartData.map((c) => (
                        <tr key={c._id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="py-5 px-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={c.image}
                                alt={c.productTitle}
                                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-sm"
                              />
                              <div className="space-y-1">
                                <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight">
                                  {c.productTitle}
                                </h3>
                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 uppercase tracking-wider font-medium">
                                  <span>Color: {c.color}</span>
                                  <span className="md:border-l md:pl-3">Size: {c.size}</span>
                                </div>
                                {/* Mobile-only price display */}
                                <p className="text-gray-900 font-bold text-sm md:hidden">
                                  ${c.finalPrice}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-5 px-4 text-center hidden md:table-cell">
                            <span className="font-medium text-gray-700">${c.finalPrice}</span>
                          </td>

                          <td className="py-5 px-4">
                            <div className="flex justify-center">
                              <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden h-9">
                                <button
                                  onClick={() => handleQuantityChange(c._id, "dec")}
                                  className="w-8 h-full flex justify-center items-center hover:bg-gray-100 transition-colors text-gray-500"
                                >
                                  -
                                </button>
                                <span className="w-10 text-center text-sm font-bold text-gray-800">
                                  {c.noOfProduct}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(c._id, "inc")}
                                  className="w-8 h-full flex justify-center items-center hover:bg-gray-100 transition-colors text-gray-500"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </td>

                          <td className="py-5 px-4 text-center hidden sm:table-cell">
                            <span className="font-bold text-gray-900">${c.totalCalculatePrice}</span>
                          </td>

                          <td className="py-5 px-4 text-right">
                            <button
                              onClick={() => handleDeleteItem(c._id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                              title="Remove item"
                            >
                              <ImCross className="text-xs" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {cartData.length === 0 && (
                  <div className="py-20 text-center">
                    <p className="text-gray-500 text-lg">Your cart is empty.</p>
                    <Link to="/shop" className="text-blue-600 hover:underline mt-2 inline-block font-medium">
                      Back to Shopping
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="col-span-1 lg:col-span-4 ">
              <OrderSummery cartData={cartData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
