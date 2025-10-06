import React from "react";

const ShopCardFiltering = ({ pro }) => {
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
    </div>
  );
};

export default ShopCardFiltering;
