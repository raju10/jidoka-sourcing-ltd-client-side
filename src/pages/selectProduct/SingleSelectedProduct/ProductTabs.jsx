import { motion } from "framer-motion";

const ProductTabs = ({ activeTab, handleClick, moreDetlsInfo }) => {
  return (
    <motion.div
      className="my-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="more-info font-marcellus flex gap-6">
        {moreDetlsInfo?.map((detls) => (
          <li
            key={detls.id_m}
            onClick={() => handleClick(detls.id_m)}
            className={`cursor-pointer hover:text-[#41a28e] transition ${
              activeTab === detls.id_m && "border-b-2 text-[#41a28e]"
            }`}
          >
            {detls.name}
          </li>
        ))}
      </div>

      <div className="pt-10">
        {activeTab === 1 && <p>{moreDetlsInfo[0].detls}</p>}
        {activeTab === 2 && (
          <div className="space-y-4 text-lg">
            <p>Quantity : {moreDetlsInfo[1].quantity}</p>
            <p>Color : {moreDetlsInfo[1].color}</p>
            <p className="flex gap-2">
              Size :
              {moreDetlsInfo[1]?.size?.map((s) => (
                <span
                  key={s}
                  className="px-2 rounded-sm bg-[#41a28e] text-white"
                >
                  {s}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductTabs;
