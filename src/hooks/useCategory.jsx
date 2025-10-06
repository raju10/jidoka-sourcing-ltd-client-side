import React, { useEffect, useState } from "react";

const useCategory = () => {
  const [allCategorys, setAllCategorys] = useState([]);
  //console.log(allCategorys);
  //const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:4000/category")
      .then((res) => res.json())
      .then((data) => {
        setAllCategorys(data);
        // setLoading(false);
      })
      .catch((err) => console.log("Error loading JSON:", err));
  }, []);
  return [allCategorys];
};

export default useCategory;
