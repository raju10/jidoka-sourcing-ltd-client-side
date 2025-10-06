import { motion } from "framer-motion";

const ProductDetails = ({
  spData,
  finalPrice,
  addOrLessProduct,
  setAddOrLessProduct,
  handleAddToCart,
  handleSizeSelect,
  sizeSelect,
}) => {
  return (
    <motion.div
      className="sProductCotain space-y-7 col-span-6"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-[30px] font-bold">{spData?.productTitle}</h1>

      {/* Price */}
      {spData?.price &&
        (spData?.discount ? (
          <p className="font-semibold flex gap-5 items-center">
            <span className="text-gray-500 line-through">
              $ {spData?.price}
            </span>
            <span className="text-xl text-black">
              ${addOrLessProduct * finalPrice}
            </span>
          </p>
        ) : (
          <p className="font-semibold flex gap-5 items-center">
            <span className="text-black ">
              $ {addOrLessProduct * spData?.price}
            </span>
          </p>
        ))}

      {/* Quantity */}
      {spData?.noOfQuantity ? (
        <p>
          No of Quantity : <b className="text-black">{spData?.noOfQuantity}</b>
        </p>
      ) : (
        <p>
          <b className="text-black">Quantity Available</b>
        </p>
      )}

      {/* Add to Cart */}
      {spData?.mostAffordable !== "disable" && (
        <div className="flex items-center gap-5">
          <button className="flex items-center border">
            <span className="px-8 py-0">{addOrLessProduct}</span>
            <div>
              <p
                className="border-b border-l py-0 px-3 cursor-pointer hover:bg-black hover:text-white"
                onClick={() => setAddOrLessProduct(addOrLessProduct + 1)}
              >
                +
              </p>
              {addOrLessProduct === 1 ? (
                <p className="border-l py-0 px-3">-</p>
              ) : (
                <p
                  className="border-l py-0 px-3 cursor-pointer hover:bg-black hover:text-white"
                  onClick={() => setAddOrLessProduct(addOrLessProduct - 1)}
                >
                  -
                </p>
              )}
            </div>
          </button>

          <button
            onClick={() => handleAddToCart(spData)}
            className="btn bg-[#41a28e] text-white uppercase font-[200] hover:bg-black"
          >
            Add To Cart
          </button>
        </div>
      )}

      <p>
        <b className="text-xl">Code : </b> <i>{spData?.productCode}</i>
      </p>
      <p>
        Donec quam felis, ultricies nec, and pellentesque eu, pretium quis, sem.
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        commodo ligula eget dolor. Aenean massa.
      </p>
      {/* <p>
                   <b>Code : </b> <i>{spData?.productCode}</i>
                 </p> */}
      <p>
        {" "}
        <b>Categories : </b> {spData?.categoryItem?.categoryName} ,{" "}
        {spData?.subCategoryItem?.subCategoryName}
      </p>
      <p>
        {" "}
        <b>Tags : </b> Art, Fashion, Lifestyle
      </p>

      {/* Sizes */}
      {spData?.mostAffordable !== "disable" && (
        <>
          <p>
            {" "}
            <b>Product Size :</b>{" "}
          </p>
          <ul className="flex gap-3">
            {spData?.size?.map((s) => (
              <li
                key={s}
                onClick={() => handleSizeSelect(s)}
                className={`${
                  sizeSelect === s
                    ? "py-2 px-4 rounded-sm bg-white text-black border-2"
                    : "py-2 px-4 rounded-sm bg-[#41a28e] text-white"
                }`}
              >
                {s}
              </li>
            ))}
          </ul>
        </>
      )}
    </motion.div>
  );
};

export default ProductDetails;
