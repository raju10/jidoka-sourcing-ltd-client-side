// import { useContext, useEffect, useState } from "react";
// import "./SingleSelectedProduct.css";
// import headBgImg from "../../../assets/New folder/stylish-young-man-choosing-fashionable-shirts-in-boutique-1024x684.jpg";
// import emailjs from "@emailjs/browser";
// import {
//   Link,
//   NavLink,
//   useLocation,
//   useNavigate,
//   useParams,
// } from "react-router";
// import ProductsAllRelated from "../../../shared/ProductsAllRelated/ProductsAllRelated";
// import Swal from "sweetalert2";
// import {
//   IoIosArrowRoundBack,
//   IoMdCheckmarkCircleOutline,
// } from "react-icons/io";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import { AuthContext } from "../../../providers/AuthProvider";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useCart from "../../../hooks/useCart";
// import { BiLogoGmail } from "react-icons/bi";
// import { FaWhatsapp } from "react-icons/fa6";
// //service_wfcf35f
// //template_3qxqqo9
// //public key ----  3uPCx4qUSql2TD_vK
// const SingleSelectedProduct = () => {
//   const { user, loading } = useContext(AuthContext);
//   console.log(user);
//   const navigate = useNavigate();

//   const { id, id1, id2, title } = useParams();
//   console.log(id, id1, id2, title);
//   const location = useLocation();
//   console.log(location);
//   const [, refetch] = useCart();
//   const spData = location.state?.pro;
//   const spAllData = location.state?.pData;
//   console.log("spData", spData);
//   console.log("location.state", location.state);
//   const axiosSecure = useAxiosSecure();
//   const [activeTab, setActibeTab] = useState(1);
//   const [addOrLessProduct, setAddOrLessProduct] = useState(1);
//   const [sizeSelect, setSizeSelect] = useState(null);
//   // console.log(addOrLessProduct);
//   //const [successfullId, setSuccessFullId] = useState(null);
//   const moreDetlsInfo = [
//     {
//       id_m: 1,
//       name: "Description",
//       detls:
//         "Donec quam felis, ultricies nec, and pellentesque eu, pretium quis, sem. penatibus et magnis dis parturient montes, nascetur ridiculus mus. commodo ligula eget dolor. Aenean massa.",
//     },
//     {
//       id_m: 2,
//       name: "Additional information",
//       w: "1.2 kg",
//       color: spData?.color,
//       size: spData?.size,
//     },
//     {
//       id_m: 3,
//       name: "Reviews(1)",
//     },
//   ];
//   //console.log(moreDetlsInfo);

//   const handleClick = (c) => {
//     setActibeTab(c);
//   };
//   ///

//   const handleSizeSelect = (e) => {
//     setSizeSelect(e);
//   };
//   console.log(sizeSelect);
//   ///
//   //////////////

//   const searchRelatedData = spAllData?.filter(
//     (sAllData) => sAllData._id !== spData._id
//   );
//   console.log(searchRelatedData);
//   // discount price calculation
//   const discountPrice = (spData?.discount / 100) * spData?.price;
//   console.log("discountPrice", discountPrice);
//   const finalPrice = Math.round(spData?.price - discountPrice);
//   console.log(finalPrice);
//   // //// handleAddToCart
//   const handleAddToCart = (products) => {
//     if (user && user.email) {
//       // sizeSelect condition check ,,,must 1 size selected
//       if (!sizeSelect) {
//         Swal.fire({
//           icon: "warning",
//           title: "Select Size",
//           text: "Please select a size before adding to cart!",
//           confirmButtonColor: "#41a28e",
//         });
//         return; // stop execution
//       }
//       const { _id, ...rest } = products;
//       const productAddTocart = {
//         ...rest,
//         finalPrice,
//         productId: products._id,
//         noOfProduct: addOrLessProduct,
//         totalCalculatePrice: products.discount
//           ? addOrLessProduct * finalPrice
//           : addOrLessProduct * spData.price,

//         size: sizeSelect,

//         user: {
//           email: user.email,
//           name: user.displayName,
//           photo: user.photoURL,
//           number: user.phoneNumber,
//         },
//       };
//       console.log(productAddTocart);
//       axiosSecure
//         .post("/carts", productAddTocart)
//         .then((result) => {
//           console.log("result", result);
//           //   setSuccessFullId(result?.data?.insertedId);
//           if (result?.data?.insertedId) {
//             Swal.fire({
//               position: "top-end",
//               icon: "success",
//               title: `${products.productTitle} addaded to ur cart`,
//               showConfirmButton: false,
//               timer: 1500,
//             });
//             // refetch cart to update the cart items
//             refetch();
//           }
//           //  result.status === 200 && window.location.reload();
//         })
//         .catch((err) => console.log(err));
//     } else {
//       Swal.fire({
//         title: "You are not logged In",
//         text: "Please login to add to the cart?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, Login!",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // send the user to the login page
//           //   navigate("/login", { state: { from: location } });
//           navigate("/login", {
//             state: { from: location, pro: spData, pData: spAllData },
//           });
//         }
//       });
//     }
//   };
//   ///////////////contact byer email//////////////////////

//   const [message, setMessage] = useState("");
//   const [isSent, setIsSent] = useState(false);
//   console.log(message);
//   // Check if user already contacted
//   useEffect(() => {
//     if (user?.email) {
//       axiosSecure
//         .get(`/users/contact/status/${spData._id}?email=${user.email}`)
//         .then((res) => {
//           if (res.data.isSent) {
//             setIsSent(true);
//             // Optionally set the message
//             setMessage(res.data.userMessage || ""); // show previously sent message
//           }
//         })
//         .catch((err) => console.error(err));
//     }
//   }, [axiosSecure, spData._id, user?.email]);

//   const handleContactSeller = async (product) => {
//     console.log(product);
//     if (!message.trim()) {
//       Swal.fire({
//         icon: "warning",
//         title: "Empty Message",
//         text: "Please write a message before contacting the seller.",
//       });
//       return;
//     }

//     const templateParams = {
//       to_email: "trolltube272@gmail.com", // your Gmail
//       productTitle: product.productTitle,
//       price: product.price || "N/A",
//       no_of_quantity: product.noOfQuantity || "N/A",
//       discount: product.discount || "N/A",
//       material: product.material || "N/A",
//       description: product.description || "N/A",
//       productCode: product.productCode,
//       userName: user?.displayName || "Guest",
//       userEmail: user?.email || "No email",
//       userMessage: message,
//     };
//     //  .send(
//     //         "YOUR_SERVICE_ID", // from EmailJS dashboard
//     //         "YOUR_TEMPLATE_ID", // from EmailJS template
//     //         templateParams,
//     //         "YOUR_PUBLIC_KEY" // from EmailJS account
//     //       )
//     try {
//       const response = await emailjs.send(
//         "service_wfcf35f", // from EmailJS dashboard
//         "template_1bvnn9r", // from EmailJS template
//         templateParams,
//         "3uPCx4qUSql2TD_vK" // from EmailJS account
//       );
//       if (response.status === 200) {
//         // Save contacted product in backend
//         await axiosSecure.post(`/users/contact/${spData._id}`, {
//           userEmail: user.email,
//           userMessage: message,
//         });

//         Swal.fire({
//           icon: "success",
//           title: "Message Sent!",
//           text: "The seller has received your request.",
//         });
//         setIsSent(true);
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Failed to send message. Try again.",
//       });
//     }
//   };
//   // whats app contact

//   const handleWhatsAppContact = (spData, user, message) => {
//     if (!message.trim()) {
//       Swal.fire({
//         icon: "warning",
//         title: "Empty Message",
//         text: "Please write a message before contacting the seller.",
//       });
//       return;
//     }
//     const phone = "8801814265958"; // admin WhatsApp number
//     const text = encodeURIComponent(
//       `📩 New Product Inquiry\n
// 🛒 Product: ${spData?.productTitle}
// 💰 Price: ${spData?.price || "N/A"}
// 📦 Quantity: ${spData?.noOfQuantity || "N/A"}
// 🎯 Discount: ${spData?.discount || "N/A"}
// 🏗️ Material: ${spData?.material || "N/A"}
// 📝 Description: ${spData?.description || "N/A"}
// 🔖 Product Code: ${spData?.productCode || "N/A"}

// 👤 User: ${user?.displayName || "Guest"}
// 📧 Email: ${user?.email || "N/A"}
// 💬 Bayar-Message: ${message || "No message provided"}`
//     );

//     const url = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
//     window.open(url, "_blank");
//   };

//   ////////// ///////////////contact byer whatsapp//////////////////////////////////
//   // const phone = "8801814265958"; // your WhatsApp number with country code
//   // const text = encodeURIComponent(
//   //   `Hi, I am interested in your product: "${spData?.productTitle}". ${
//   //     message ? `My message: "${message}"` : ""
//   //   }`
//   // );
//   // const url = `https://wa.me/${phone}?text=${text}`;
//   // window.open(url, "_blank"); // opens WhatsApp in a new tab
//   //////////////////////////////////

//   return (
//     <div className="w-full min-h-screen box-border mt-20">
//       <div className="w-full max-w-[1600px] mx-auto ">
//         {/* go beck */}
//         <div className=" px-10 pb-3">
//           <button
//             className="flex items-center gap-1 bg-[#41a28e] text-white font-semibold px-5 py-1 rounded-xl cursor-pointer hover:bg-black"
//             onClick={() => navigate(-1)}
//           >
//             <IoIosArrowRoundBack className="text-2xl" /> Go Back
//           </button>
//         </div>
//         {/*  */}
//         <div className="grid xl:grid-cols-12 gap-15  px-10  ">
//           <div className=" sPImg relative w-full h-full object-cover  lg:col-span-4 col-span-6">
//             <img
//               className="w-full h-full object-cover rounded-sm"
//               src={spData?.image}
//             />
//             {spData?.discount && (
//               <p className="absolute top-0   right-0 bg-red-400 text-white   py-2 px-3 rounded-sm">
//                 <b className="">- {spData?.discount} %</b>{" "}
//               </p>
//             )}
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 background:
//                   "linear-gradient(360deg, #00000038, #00000029, #00000045, #0000005e))",
//                 zIndex: 1,
//                 objectFit: "cover",
//               }}
//               //  className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10"
//             ></div>
//           </div>

//           <div className=" col-span-8">
//             <div className="grid sm:grid-cols-12 gap-4">
//               <div className="sProductCotain space-y-7 col-span-6 ">
//                 <h1 className="text-[30px] font-bold">
//                   {spData?.productTitle}
//                 </h1>
//                 {spData?.price &&
//                   (spData?.discount ? (
//                     <p className="font-semibold  flex gap-5 items-center">
//                       <span className="text-gray-500 line-through">
//                         $ {spData?.price}
//                       </span>
//                       <span className="text-xl text-black">
//                         ${addOrLessProduct * finalPrice}
//                       </span>
//                     </p>
//                   ) : (
//                     <p className="font-semibold  flex gap-5 items-center">
//                       <span className="text-black ">
//                         $ {addOrLessProduct * spData?.price}
//                       </span>
//                     </p>
//                   ))}
//                 {spData?.noOfQuantity ? (
//                   <p>
//                     {" "}
//                     No of Quantity :
//                     <b className="text-black">{spData?.noOfQuantity}</b>
//                   </p>
//                 ) : (
//                   <p>
//                     <b className="text-black">Quantity Avalable</b>
//                   </p>
//                 )}
//                 {spData?.mostAffordable !== "disable" && (
//                   <div className="flex items-center gap-5">
//                     <button className=" flex items-center border">
//                       <span className="px-8 py-0 ">{addOrLessProduct}</span>
//                       <div className="">
//                         <p
//                           className="border-b border-l py-0 px-3 cursor-pointer hover:bg-black hover:text-white"
//                           onClick={() =>
//                             setAddOrLessProduct(addOrLessProduct + 1)
//                           }
//                         >
//                           +
//                         </p>
//                         {addOrLessProduct === 1 ? (
//                           <p className="border-l py-0 px-3 " disabled>
//                             -
//                           </p>
//                         ) : (
//                           <p
//                             className="border-l py-0 px-3 cursor-pointer hover:bg-black hover:text-white"
//                             onClick={() =>
//                               setAddOrLessProduct(addOrLessProduct - 1)
//                             }
//                           >
//                             -
//                           </p>
//                         )}
//                       </div>
//                     </button>
//                     {/* {successfullId ? (
//                   <Link to="/cart">
//                     {" "}
//                     <button className="btn bg-blue-400 text-white uppercase  hover:bg-white hover:text-black flex items-center">
//                       {" "}
//                       <IoMdCheckmarkCircleOutline />
//                       Go to Cart
//                     </button>{" "}
//                   </Link>
//                 ) : ( */}
//                     {/* <Link to="/cart"> */}
//                     <button
//                       onClick={() => handleAddToCart(spData)}
//                       className="btn bg-[#41a28e] text-white uppercase font-[200] hover:bg-black"
//                     >
//                       Add To Cart
//                     </button>
//                     {/* </Link> */}
//                     {/* )} */}
//                   </div>
//                 )}
//                 <p>
//                   Donec quam felis, ultricies nec, and pellentesque eu, pretium
//                   quis, sem. penatibus et magnis dis parturient montes, nascetur
//                   ridiculus mus. commodo ligula eget dolor. Aenean massa.
//                 </p>
//                 <p>
//                   <b>Code : </b> <i>{spData?.productCode}</i>
//                 </p>
//                 <p>Categories: Barcelona, Berlin, Milano, Sydney</p>
//                 <p>Tags: Art, Fashion, Lifestyle</p>

//                 {spData?.mostAffordable !== "disable" && (
//                   <>
//                     <p>Product Size :</p>
//                     <ul className="flex gap-3">
//                       {spData?.size?.map((s) => (
//                         <li
//                           key={s}
//                           onClick={() => handleSizeSelect(s)}
//                           className={`${
//                             sizeSelect === s
//                               ? "py-2 px-4 rounded-sm bg-white  text-black border-2"
//                               : "py-2 px-4 rounded-sm bg-[#41a28e] text-white"
//                           }`}
//                         >
//                           {s}
//                         </li>
//                       ))}
//                     </ul>
//                   </>
//                 )}
//               </div>

//               {/* // contact me  */}
//               <div className="col-span-6">
//                 {/* <button
//                   onClick={() => handleContactSeller(spData)}
//                   className="btn bg-blue-500 text-white hover:bg-black"
//                 >
//                   Contact Seller
//                 </button> */}

//                 <div className="p-4 bg-white shadow rounded-lg max-w-md mx-auto">
//                   <h2 className="text-xl font-semibold mb-2">
//                     Directly Contact the Seller
//                   </h2>
//                   <p className="mb-4 text-gray-600">
//                     You can get in touch with the seller regarding this product
//                     via email or WhatsApp. Simply click on the email link to
//                     send a message, or start a chat on WhatsApp for an instant
//                     response.
//                   </p>

//                   <div className=" ">
//                     <p className="flex items-center gap-1">
//                       {" "}
//                       <BiLogoGmail /> alloo@gmail.com
//                     </p>

//                     <p className="flex items-center gap-1">
//                       {" "}
//                       <FaWhatsapp /> +88 01814265958
//                     </p>
//                   </div>
//                   <div className="divider"></div>
//                   <input
//                     className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none text-gray-400"
//                     type="email"
//                     name=""
//                     id=""
//                     disabled
//                     defaultValue={user?.email}
//                   />
//                   <textarea
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Write your message here..."
//                     rows={5}
//                     className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
//                     disabled={isSent}
//                   />
//                   <div className="divider">Diract Contact Seller </div>
//                   <div className="flex gap-3">
//                     {/* email btn */}
//                     <button
//                       onClick={() => handleContactSeller(spData)}
//                       className={`cursor-pointer w-full px-3 py-1 text-white font-semibold rounded ${
//                         isSent
//                           ? "bg-green-500 cursor-not-allowed"
//                           : "bg-blue-500 hover:bg-black"
//                       }`}
//                       disabled={isSent}
//                     >
//                       {isSent ? (
//                         "Contacted Successfully"
//                       ) : (
//                         <div className="flex justify-center items-center gap-1">
//                           <BiLogoGmail /> Mail
//                         </div>
//                       )}
//                     </button>
//                     {/* whats app btn */}

//                     <button
//                       onClick={() =>
//                         handleWhatsAppContact(spData, user, message)
//                       }
//                       className="flex justify-center items-center gap-1 w-full p-3 text-white font-semibold rounded bg-green-500 hover:bg-green-700 transition duration-200 cursor-pointer"
//                     >
//                       <FaWhatsapp /> WhatsApp
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* des/additional info/ review */}

//         <div className="my-10">
//           <div className="more-info font-marcellus">
//             {moreDetlsInfo?.map((detls) => (
//               <li
//                 key={detls.id_m}
//                 onClick={() => handleClick(detls.id_m)}
//                 className={`cursor-pointer hover:text-[#41a28e]  transition duration-200 ${
//                   activeTab === detls.id_m && "border-b-1 text-[#41a28e] "
//                 }`}
//               >
//                 {detls.name}{" "}
//               </li>
//             ))}
//           </div>
//           {/*  // condition add */}
//           <div className="">
//             {activeTab === 1 && (
//               <p className="pt-10">{moreDetlsInfo[0].detls}</p>
//             )}
//             {/*  */}

//             {activeTab === 2 && (
//               <div className="space-y-4 text-lg pt-10">
//                 <p className="">Weight : {moreDetlsInfo[1].w}</p>
//                 <p className="">Color : {moreDetlsInfo[1].color}</p>
//                 <p className="flex gap-2 ">
//                   Size :
//                   {moreDetlsInfo[1]?.size?.map((s) => (
//                     <span className="px-2 rounded-sm bg-[#41a28e] text-white">
//                       {s}
//                     </span>
//                   ))}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/*  */}
//         </div>

//         {/*  */}
//         {/* Related product */}
//         <div className="px-10 py-20">
//           <h2 className="text-center text-3xl font-bold py-30 divider">
//             Realated Product
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
//             {searchRelatedData?.map((pro) => (
//               <ProductsAllRelated
//                 key={pro?._id}
//                 pro={pro}
//                 productData={spAllData}
//               ></ProductsAllRelated>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleSelectedProduct;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

import { useContext, useEffect, useState } from "react";
import "./SingleSelectedProduct.css";
import { useLocation, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { IoIosArrowRoundBack } from "react-icons/io";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../providers/AuthProvider";
import emailjs from "@emailjs/browser";

// Sub-components
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductContact from "./ProductContact";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";

const SingleSelectedProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id, id1, id2, title } = useParams();
  const location = useLocation();
  const [, refetch] = useCart();
  const spData = location.state?.pro;
  const spAllData = location.state?.pData;
  const axiosSecure = useAxiosSecure();

  const [activeTab, setActiveTab] = useState(1);
  const [addOrLessProduct, setAddOrLessProduct] = useState(1);
  const [sizeSelect, setSizeSelect] = useState(null);
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const moreDetlsInfo = [
    {
      id_m: 1,
      name: "Description",
      detls: spData?.description || "No description available.",
    },
    {
      id_m: 2,
      name: "Additional information",
      quantity: spData?.noOfQuantity,
      color: spData?.color,
      size: spData?.size,
    },
    { id_m: 3, name: "Reviews(1)" },
  ];

  const searchRelatedData = spAllData?.filter(
    (sAllData) => sAllData._id !== spData._id
  );

  const discountPrice = (spData?.discount / 100) * spData?.price;
  const finalPrice = Math.round(spData?.price - discountPrice);

  // 🛒 Add to Cart
  const handleAddToCart = (products) => {
    if (user && user.email) {
      if (!sizeSelect) {
        Swal.fire({
          icon: "warning",
          title: "Select Size",
          text: "Please select a size before adding to cart!",
          confirmButtonColor: "#41a28e",
        });
        return;
      }

      const { _id, ...rest } = products;
      const productAddTocart = {
        ...rest,
        finalPrice,
        productId: products._id,
        noOfProduct: addOrLessProduct,
        totalCalculatePrice: products.discount
          ? addOrLessProduct * finalPrice
          : addOrLessProduct * spData.price,
        size: sizeSelect,
        user: {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          number: user.phoneNumber,
        },
      };

      axiosSecure.post("/carts", productAddTocart).then((result) => {
        if (result?.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${products.productTitle} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged In",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {
            state: { from: location, pro: spData, pData: spAllData },
          });
        }
      });
    }
  };

  ///////////////contact byer email//////////////////////

  // Check if user already contacted
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/contact/status/${spData._id}?email=${user.email}`)
        .then((res) => {
          if (res.data.isSent) {
            setIsSent(true);
            // Optionally set the message
            setMessage(res.data.userMessage || ""); // show previously sent message
          }
        })
        .catch((err) => console.error(err));
    }
  }, [axiosSecure, spData._id, user?.email]);

  const handleContactSeller = async (product) => {
    console.log(product);
    if (!message.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Message",
        text: "Please write a message before contacting the seller.",
      });
      return;
    }

    const templateParams = {
      to_email: "trolltube272@gmail.com", // your Gmail
      productTitle: product.productTitle,
      price: product.price || "N/A",
      no_of_quantity: product.noOfQuantity || "N/A",
      discount: product.discount || "N/A",
      material: product.material || "N/A",
      description: product.description || "N/A",
      productCode: product.productCode,
      userName: user?.displayName || "Guest",
      userEmail: user?.email || "No email",
      userMessage: message,
    };
    //  .send(
    //         "YOUR_SERVICE_ID", // from EmailJS dashboard
    //         "YOUR_TEMPLATE_ID", // from EmailJS template
    //         templateParams,
    //         "YOUR_PUBLIC_KEY" // from EmailJS account
    //       )
    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // ✅ service
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // ✅ template
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // ✅ public key
      );
      if (response.status === 200) {
        // Save contacted product in backend
        await axiosSecure.post(`/users/contact/${spData._id}`, {
          userEmail: user.email,
          userMessage: message,
        });

        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "The seller has received your request.",
        });
        setIsSent(true);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to send message. Try again.",
      });
    }
  };
  // whats app contact

  const handleWhatsAppContact = (spData, user, message) => {
    if (!message.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Message",
        text: "Please write a message before contacting the seller.",
      });
      return;
    }
    const phone = "8801619755755"; // admin WhatsApp number
    const text = encodeURIComponent(
      `📩 New Product Inquiry\n
🛒 Product: ${spData?.productTitle}
💰 Price: ${spData?.price || "N/A"}
📦 Quantity: ${spData?.noOfQuantity || "N/A"}
🎯 Discount: ${spData?.discount || "N/A"}
🏗️ Material: ${spData?.material || "N/A"}
📝 Description: ${spData?.description || "N/A"}
🔖 Product Code: ${spData?.productCode || "N/A"}

👤 User: ${user?.displayName || "Guest"}
📧 Email: ${user?.email || "N/A"}
💬 Bayar-Message: ${message || "No message provided"}`
    );

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
    window.open(url, "_blank");
  };

  ////////// ///////////////contact byer whatsapp//////////////////////////////////
  // const phone = "8801814265958"; // your WhatsApp number with country code
  // const text = encodeURIComponent(
  //   `Hi, I am interested in your product: "${spData?.productTitle}". ${
  //     message ? `My message: "${message}"` : ""
  //   }`
  // );
  // const url = `https://wa.me/${phone}?text=${text}`;
  // window.open(url, "_blank"); // opens WhatsApp in a new tab
  //////////////////////////////////

  return (
    <div className=" mt-20">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* 🔙 Back button */}
        <div className="px-10 pb-3">
          <button
            className="flex items-center gap-1 bg-[#41a28e] text-white px-5 py-1 rounded-xl hover:bg-black"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowRoundBack className="text-2xl" /> Go Back
          </button>
        </div>

        {/* 🖼️ Image + Details + Contact */}
        <div className="grid xl:grid-cols-12 gap-15 px-10">
          <ProductImage spData={spData} />
          <div className="col-span-8 grid sm:grid-cols-12 gap-4">
            <ProductDetails
              spData={spData}
              finalPrice={finalPrice}
              addOrLessProduct={addOrLessProduct}
              setAddOrLessProduct={setAddOrLessProduct}
              handleAddToCart={handleAddToCart}
              handleSizeSelect={setSizeSelect}
              sizeSelect={sizeSelect}
            />
            <ProductContact
              spData={spData}
              user={user}
              message={message}
              setMessage={setMessage}
              isSent={isSent}
              handleContactSeller={handleContactSeller}
              handleWhatsAppContact={handleWhatsAppContact}
            />
          </div>
        </div>

        {/* 📑 Tabs */}
        <div className="px-10">
          <ProductTabs
            activeTab={activeTab}
            handleClick={setActiveTab}
            moreDetlsInfo={moreDetlsInfo}
          />
        </div>

        {/* 🔗 Related */}
        <RelatedProducts
          searchRelatedData={searchRelatedData}
          spAllData={spAllData}
        />
      </div>
    </div>
  );
};

export default SingleSelectedProduct;
