import { Link, useLocation, useNavigate, useParams } from "react-router";
import "./Products.scss";
import { motion } from "motion/react";
import ProductsAllRelated from "../../../shared/ProductsAllRelated/ProductsAllRelated";
import useProducts from "../../../hooks/useProducts";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
const Products = () => {
  const { id, id1 } = useParams();
  console.log(id, id1);
  const navigate = useNavigate();

  const [allProducts] = useProducts();
  console.log(allProducts);
  const [showFiltaringProducts, setShowFiltaringProducts] = useState([]);
  const location = useLocation();
  console.log(location);
  //console.log(location);
  const selectedSubCategoryID = location.state?.sCatagory?._id;
  // console.log(productData);
  //const pDatas = productData?.products;
  //const hover = <button className="btn">Read More</button>;
  console.log(selectedSubCategoryID);
  useEffect(() => {
    const filter = allProducts?.filter(
      (pro) => pro?.subCategoryItem?.subCategoryID === id1
    );
    setShowFiltaringProducts(filter);
  }, [allProducts, id1, id]);
  console.log(showFiltaringProducts);
  return (
    <motion.div className="selectedAllCategoryProduct px-5">
      {/* go beck */}
      <div className=" pb-3 pt-15">
        <button
          className="flex items-center gap-1 bg-[#41a28e] text-white font-semibold px-5 py-1 rounded-xl cursor-pointer hover:bg-black"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowRoundBack className="text-2xl" /> Go Back
        </button>
      </div>
      {/*  */}
      <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {showFiltaringProducts?.map((pro) => (
          //  console.log(pro),
          <ProductsAllRelated
            key={pro._id}
            pro={pro}
            productData={showFiltaringProducts}
          ></ProductsAllRelated>
        ))}
      </div>
    </motion.div>
  );
};

export default Products;
