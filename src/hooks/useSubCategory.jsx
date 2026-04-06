import { useEffect, useState } from "react";

const useSubCategory = () => {
  const [allSubCategorys, setSubAllCategorys] = useState([]);
  const [reload, setReload] = useState(false);

  const refetch = () => setReload(!reload);
  //console.log(allCategorys);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("https://jidoka-sourcing-ltd-server-side.vercel.app/subCategory")
      .then((res) => res.json())
      .then((data) => {
        setSubAllCategorys(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error loading JSON:", err);
        setLoading(false);
      });
  }, [reload]); // Reload when this trigger changes
  return [allSubCategorys, refetch, loading];
};

export default useSubCategory;
