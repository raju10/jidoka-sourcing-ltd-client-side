import { useEffect, useState } from "react";

const useSubCategory = () => {
  const [allSubCategorys, setSubAllCategorys] = useState([]);
  const [reload, setReload] = useState(false);

  const refetch = () => setReload(!reload);
  //console.log(allCategorys);
  //const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:4000/subCategory")
      .then((res) => res.json())
      .then((data) => {
        setSubAllCategorys(data);
        // setLoading(false);
      })
      .catch((err) => console.log("Error loading JSON:", err));
  }, [reload]); // Reload when this trigger changes
  return [allSubCategorys, refetch];
};

export default useSubCategory;
