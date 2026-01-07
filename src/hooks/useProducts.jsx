import { useEffect, useState } from "react";

const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const refetch = () => setReload(!reload);

  useEffect(() => {
    fetch("https://jidoka-sourcing-ltd-server-side.vercel.app/product")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log("Error loading JSON:", err));
  }, [reload]);

  return [allProducts, refetch];
};

export default useProducts;

