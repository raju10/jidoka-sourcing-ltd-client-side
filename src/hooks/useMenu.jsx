import { useEffect, useState } from "react";

const useMenu = () => {
  const [allCategory, setAllCategory] = useState([]);
  console.log(allCategory);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("../../../../product.json")
      .then((res) => res.json())
      .then((data) => {
        setAllCategory(data);
        setLoading(false);
      })
      .catch((err) => console.log("Error loading JSON:", err));
  }, []);
  return [allCategory, loading];
};

export default useMenu;
