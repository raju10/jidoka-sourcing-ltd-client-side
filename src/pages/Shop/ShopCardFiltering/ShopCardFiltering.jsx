import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import useProducts from "../../../hooks/useProducts";

const ShopCardFiltering = ({ pro }) => {
  // console.log(pro)
  const [allProducts] = useProducts();
  const [showFiltaringProducts, setShowFiltaringProducts] = useState([]);
  useEffect(() => {
    if (!allProducts) return;
    const filtered = allProducts.filter(
      (item) => item?.subCategoryItem?.subCategoryID === pro.subCategoryItem?.subCategoryID
    );
    setShowFiltaringProducts(filtered);
  }, [allProducts, pro.subCategoryItem?.subCategoryID]);
  //console.log(showFiltaringProducts)

  return (

    <div className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition">
      <div className="relative">
        <img
          src={pro.image}
          alt={pro.productTitle}
          className="w-full h-[200px] object-cover"
        />
        {pro.discount && (

          <p className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-[12px] rounded">
            - {pro.discount} %

          </p>
        )}
      </div>
      <div className="px-4 py-5">
        <h2 className="font-semibold text-gray-800">{pro.productTitle}</h2>
        {/* <p className="text-gray-600 text-sm mt-1">৳ {pro.price}</p> */}
        <div className="flex gap-3">
          {pro.price ? (
            <div className="">
              {pro.discount ? <small className="line-through text-gray-500 text-xs">$ {pro.price} </small> : <b>$ {pro.price}</b>}
              {pro.discount && <small className="text-[16px] font-semibold p-2">$ {Math.round(pro.price - (pro.price * pro.discount / 100))}</small>}
            </div>
          ) : (
            <b> Price not add</b>
          )}

        </div>
        <NavLink
          to={`/product/${pro.categoryItem?._id}/${pro.subCategoryItem?.subCategoryID}/${pro._id}/${pro.productTitle}`}
          state={{ pro: pro, pData: showFiltaringProducts }}
          className="flex items-center gap-2 hover:text-green-500 cursor-pointer font-semibold text-md pt-3"
        >
          <IoCartOutline className="text-2xl" />
          <p>Read More</p>
        </NavLink>
      </div>

    </div>
  );
};

export default ShopCardFiltering;
