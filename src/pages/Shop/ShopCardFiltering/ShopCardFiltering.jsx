import React from "react";

const ShopCardFiltering = ({ pro }) => {
  return (
    <div className="border border-gray-400">
      <img src={pro.image} alt="" className="w-full h-[200px] object-cover" />
      <div className="p-3">
        <h2>{pro.productTitle}</h2>
      </div>
    </div>
  );
};

export default ShopCardFiltering;
