import { Link, useLocation, useNavigate, useParams } from "react-router";
import "./Products.scss";
import { motion } from "motion/react";
import ProductsAllRelated from "../../../shared/ProductsAllRelated/ProductsAllRelated";
import useProducts from "../../../hooks/useProducts";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import { FaSpinner } from "react-icons/fa";

const Products = () => {
  const { id, id1 } = useParams();
  const navigate = useNavigate();

  const [allProducts, , loading] = useProducts();
  const [showFiltaringProducts, setShowFiltaringProducts] = useState([]);
  const location = useLocation();
  const selectedSubCategoryID = location.state?.sCatagory?._id;

  useEffect(() => {
    const filter = allProducts?.filter(
      (pro) => pro?.subCategoryItem?.subCategoryID === id1
    );
    setShowFiltaringProducts(filter);
  }, [allProducts, id1, id]);

  return (
    <>
      <Helmet>
        <title>Jidoka Sourcing | Products</title>
      </Helmet>
      <motion.div className="selectedAllCategoryProduct px-5">
        {/* go beck */}
        <div className=" pb-3 pt-20">
          <button
            className="flex items-center gap-1 bg-[#41a28e] text-white font-semibold px-5 py-1 rounded-xl cursor-pointer hover:bg-black"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowRoundBack className="text-2xl" /> Go Back
          </button>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="text-4xl text-[#41a28e] animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading products...</p>
          </div>
        ) : showFiltaringProducts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {showFiltaringProducts?.map((pro) => (
              <ProductsAllRelated
                key={pro._id}
                pro={pro}
                productData={showFiltaringProducts}
              ></ProductsAllRelated>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              No Products Found
            </h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
              We couldn't find any products in this subcategory at the moment. Please check back later or explore our other collections.
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Products;
