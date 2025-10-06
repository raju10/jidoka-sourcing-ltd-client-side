import { motion } from "framer-motion";
import ProductsAllRelated from "../../../shared/ProductsAllRelated/ProductsAllRelated";

const RelatedProducts = ({ searchRelatedData, spAllData }) => {
  return (
    <motion.div
      className="px-10 py-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-center text-3xl font-bold py-30 divider">
        Related Product
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {searchRelatedData?.map((pro) => (
          <ProductsAllRelated
            key={pro?._id}
            pro={pro}
            productData={spAllData}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedProducts;
