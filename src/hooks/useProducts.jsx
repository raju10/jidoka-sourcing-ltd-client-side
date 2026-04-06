import { useEffect, useState } from "react";

const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const refetch = () => setReload(!reload);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://jidoka-sourcing-ltd-server-side.vercel.app/product")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error loading JSON:", err);
        setLoading(false);
      });
  }, [reload]);

  return [allProducts, refetch, loading];
};

export default useProducts;

