import { useEffect, useState } from "react";

const useSubCategory = () => {
  const [allSubCategorys, setSubAllCategorys] = useState([]);
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
  }, []);
  return [allSubCategorys];
};

export default useSubCategory;
