import { useEffect, useState } from "react";

const useCategory = () => {
  const [allCategorys, setAllCategorys] = useState([]);
  const [reload, setReload] = useState(false);

  const refetch = () => setReload(!reload);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://jidoka-sourcing-ltd-server-side.vercel.app/category")
      .then((res) => res.json())
      .then((data) => {
        setAllCategorys(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error loading JSON:", err);
        setLoading(false);
      });
  }, [reload]);

  return [allCategorys, refetch, loading];
};

export default useCategory;

