import { motion } from "framer-motion";

const ProductImage = ({ spData }) => {
  return (
    <motion.div
      className="sPImg relative w-full h-full object-cover lg:col-span-4 col-span-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        className="w-full h-full object-cover rounded-sm"
        src={spData?.image}
        alt={spData?.productTitle}
      />
      {spData?.discount && (
        <p className="absolute top-0 right-0 bg-red-400 text-white py-2 px-3 rounded-sm">
          <b>- {spData?.discount} %</b>
        </p>
      )}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(360deg, #00000038, #00000029, #00000045, #0000005e))",
          zIndex: 1,
        }}
      ></div>
    </motion.div>
  );
};

export default ProductImage;
