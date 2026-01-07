import { useEffect, useState } from "react";

const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const refetch = () => setReload(!reload);

  useEffect(() => {
    fetch("http://localhost:4000/product")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log("Error loading JSON:", err));
  }, [reload]);

  return [allProducts, refetch];
};

export default useProducts;

