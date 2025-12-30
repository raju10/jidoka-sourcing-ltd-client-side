import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import useProducts from "../../../hooks/useProducts";

const ShopCardFiltering = ({ pro }) => {
  console.log(pro)
  const [allProducts] = useProducts();
  const [showFiltaringProducts, setShowFiltaringProducts] = useState([]);
  useEffect(() => {
    if (!allProducts) return;
    const filtered = allProducts.filter(
      (item) => item?.subCategoryItem?.subCategoryID === pro.subCategoryItem?.subCategoryID
    );
    setShowFiltaringProducts(filtered);
  }, [allProducts, pro.subCategoryItem?.subCategoryID]);
  console.log(showFiltaringProducts)
  return (

    <div className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition">
      <img
        src={pro.image}
        alt={pro.productTitle}
        className="w-full h-[200px] object-cover"
      />
      <div className="p-3">
        <h2 className="font-semibold text-gray-800">{pro.productTitle}</h2>
        <p className="text-gray-600 text-sm mt-1">৳ {pro.price}</p>
      </div>
      <NavLink
        to={`/product/${pro.categoryItem?._id}/${pro.subCategoryItem?.subCategoryID}/${pro._id}/${pro.productTitle}`}
        state={{ pro: pro, pData: showFiltaringProducts }}
        className="flex items-center gap-2 hover:text-green-500 cursor-pointer"
      >
        <IoCartOutline className="text-2xl" />
        <p>Read More</p>
      </NavLink>
    </div>
  );
};

export default ShopCardFiltering;
