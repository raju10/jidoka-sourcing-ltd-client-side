import React, { useEffect, useState } from "react";

const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  //console.log(allCategorys);
  //const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:4000/product")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        // setLoading(false);
      })
      .catch((err) => console.log("Error loading JSON:", err));
  }, []);
  return [allProducts];
};

export default useProducts;
