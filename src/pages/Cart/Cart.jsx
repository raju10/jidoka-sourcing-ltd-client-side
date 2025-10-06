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
  console.log(location);
  const [cart, refetch] = useCart([]); // your hook data

  // local state for cart with updated qty
  const [cartData, setCartData] = useState([]);
  console.log(cartData);

  // initialize cartData when cart comes
  useEffect(() => {
    const updated = cart.map((item) => ({
      ...item,
      noOfProduct: item.noOfProduct || 1,
      totalCalculatePrice: (item.finalPrice || 0) * (item.noOfProduct || 1),
    }));
    console.log(updated);
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
          console.log(id, newQty, newTotal);

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
    console.log(e);
    const res = await axiosPublic.delete(`carts/${e}`);
    console.log(res);
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
        <title>Jidohaka LTD | Cart</title>
      </Helmet>
      <div className="min-h-screen bg-white">
        {/* Banner Section */}

        <CartBanner location={location}></CartBanner>
        {/* Cart Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 py-20 px-5 gap-4 ">
          <div className="col-span-8">
            <div className="">
              <div className="overflow-x-auto">
                <table className="table border border-gray-200 w-full grid grid-cols-12">
                  <thead className="bg-gray-50">
                    <tr className="text-lg text-black">
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.map((c) => (
                      <tr key={c._id} className="">
                        {/* Product Info */}
                        <td className="flex flex-col justify-center gap-2">
                          <img
                            src={c.image}
                            alt={c.productTitle}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div>
                            <h1 className="font-bold text-lg">
                              {c.productTitle}
                            </h1>
                            <p>Color: {c.color}</p>
                            <p>Size: {c.size}</p>
                          </div>
                        </td>

                        {/* Price */}
                        <td>${c.finalPrice}</td>

                        {/* Quantity + / - */}
                        <td>
                          <div className="border-2 border-gray-300 flex justify-evenly items-center text-lg font-semibold py-1 rounded-lg w-28">
                            <button
                              onClick={() => handleQuantityChange(c._id, "dec")}
                              className="cursor-pointer px-2"
                            >
                              -
                            </button>
                            <span>{c.noOfProduct}</span>
                            <button
                              onClick={() => handleQuantityChange(c._id, "inc")}
                              className="cursor-pointer px-2"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Total */}
                        <td>${c.totalCalculatePrice}</td>
                        <td className="">
                          <ImCross
                            onClick={() => handleDeleteItem(c._id)}
                            className="text-red-500 cursor-pointer hover:text-gray-500 "
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-span-4 ">
            <OrderSummery
              // updatedCart={updatedCart}
              // subTotal={subTotal}
              // vatCalCulate={vatCalCulate}
              // finalTotalSummeryCost={finalTotalSummeryCost}
              cartData={cartData}
            ></OrderSummery>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
