import { FaHeart, FaEye } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { Link, NavLink, useLocation, useParams } from "react-router";
import { delay } from "motion";

const ProductsAllRelated = ({ pro, productData }) => {
  console.log(pro, productData)
  // console.log("jahid", pro, productData);
  const { id, id1 } = useParams();
  //console.log(id, id1);

  //const location = useLocation();

  // const productData = location.state?.sCatagory;
  // console.log(productData);
  const priceCalculate = Math.round(pro.price * (pro.discount / 100));
  const finalPrice = pro.price - priceCalculate;
  return (
    <div>
      <div className="">
        <div className="relative overflow-hidden group w-full h-[300px]">
          {/* Product Image with zoom */}
          <motion.img
            src={pro.image}
            alt={pro.productTitle}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Discount Badge */}
          {pro.discount && (
            <p className="bg-red-400 text-white absolute top-0 right-0 px-4 py-1 rounded text-[14px] z-10">
              - {pro.discount} %
            </p>
          )}

          {/* Overlay: hidden by default */}
          <div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="absolute inset-0 bg-[#1b1a1a50] flex items-end pb-5 justify-center z-20 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out"
          >
            <div className="flex gap-6 text-white">
              {/* Read More */}
              <NavLink
                to={`/product/${id}/${id1}/${pro._id}/${pro.productTitle}`}
                state={{ pro: pro, pData: productData }}
                className="flex items-center gap-2 hover:text-green-500 cursor-pointer"
              >
                <IoCartOutline className="text-2xl" />
                <p>Read More</p>
              </NavLink>

              {/* Heart */}
              <div className="hidden md:block hover:text-red-500 cursor-pointer">
                <FaHeart className="text-2xl" />
              </div>

              {/* Eye */}
              <div className="hover:text-blue-400 cursor-pointer">
                <FaEye className="text-2xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center h-full leading-10 py-5">
          <h2 className=" text-lg font-bold ">{pro.productTitle} </h2>
          <p className="text-sm">
            {" "}
            {pro.discount ? (
              <motion.p>
                {" "}
                <small className="line-through px-2 text-gray-400">
                  ${pro.price}
                </small>{" "}
                ${finalPrice}
              </motion.p>
            ) : (
              pro.price && <motion.p> ${pro.price}</motion.p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsAllRelated;
