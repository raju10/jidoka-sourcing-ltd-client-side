import React, { useEffect, useState } from "react";
import CartBanner from "../Cart/CartBanner/CartBanner";
import { useLocation } from "react-router";
import useProducts from "../../hooks/useProducts";
import ShopFiltering from "./ShopFiltering/ShopFiltering";
import ShopCardFiltering from "./ShopCardFiltering/ShopCardFiltering";
import { Helmet } from "react-helmet-async";

const Shop = () => {
  const location = useLocation();
  const [allProducts] = useProducts();
  console.log(allProducts);
  const [filter, setFilter] = useState(null);

  const [seeFilterDatas, setSeeFilterDatas] = useState([]);
  useEffect(() => {
    const data = allProducts?.filter(
      (pro) => pro?.categoryItem?._id === filter
    );
    setSeeFilterDatas(data);
  }, [allProducts, filter]);
  console.log(filter, seeFilterDatas);
  const all = { ...seeFilterDatas, seeFilterDatas };
  console.log(all);
  return (
    <div>
      <Helmet>
        <title>Jidohaka LTD | Shop</title>
      </Helmet>
      <CartBanner location={location}></CartBanner>
      <div className="grid grid-cols-12 gap-5 ">
        <div className="col-span-3  p-5 ">
          {/* {allProducts.map((pro) => ( */}
          <ShopFiltering setFilter={setFilter}></ShopFiltering>
          {/* ))} */}
        </div>
        <div className="col-span-9">
          <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {allProducts.map((pro) => (
              <ShopCardFiltering key={pro._id} pro={pro}></ShopCardFiltering>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
