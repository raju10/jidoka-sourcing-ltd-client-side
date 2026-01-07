import { useEffect, useState } from "react";

const useCategory = () => {
  const [allCategorys, setAllCategorys] = useState([]);
  const [reload, setReload] = useState(false);

  const refetch = () => setReload(!reload);

  useEffect(() => {
    fetch("https://jidoka-sourcing-ltd-server-side.vercel.app/category")
      .then((res) => res.json())
      .then((data) => {
        setAllCategorys(data);
      })
      .catch((err) => console.log("Error loading JSON:", err));
  }, [reload]);

  return [allCategorys, refetch];
};

export default useCategory;

