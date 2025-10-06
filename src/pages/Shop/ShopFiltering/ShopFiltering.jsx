// import useProducts from "../../../hooks/useProducts";

// const ShopFiltering = () => {
//   const [allProducts] = useProducts();
//   console.log(allProducts);
//   return (
//     <div className=" ">
//       <div className="h-[40vh]  overflow-auto">
//         {allProducts.map((pro) => (
//           <div className="flex items-center gap-2">
//             <input
//               className="text-black"
//               type="checkbox"
//               name={pro.categoryItem.categoryName}
//               id=""
//               value={pro.categoryItem.categoryName}
//             />
//             <label htmlFor={pro.categoryItem._id}>
//               {pro.categoryItem.categoryName}
//             </label>
//           </div>
//         ))}
//       </div>
//       <div className="h-[30vh] border"></div>
//       <div className="h-[20vh] border"></div>
//       <div className="h-[10vh] border"></div>
//     </div>
//   );
// };

// export default ShopFiltering;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import useProducts from "../../../hooks/useProducts";

const ShopFiltering = ({ setFilter }) => {
  const [allProducts] = useProducts();
  console.log(allProducts);
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState({
    category: true,
    color: true,
    size: true,
    price: true,
  });

  const onSubmit = (data) => {
    console.log("Filter Data:", data);
  };
  const seeValue = (e) => {
    console.log(e);
    setFilter(e);
  };
  return (
    <div className=" sticky top-20 bg-gray-50 border-r p-4 max-h-screen overflow-y-auto shadow-md">
      {/* Clear Filter */}
      <button
        onClick={() => reset()}
        className="w-full bg-red-600 text-white py-2 rounded mb-4 hover:bg-red-700"
      >
        Clear Filter
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* CATEGORY */}
        <div>
          <button
            type="button"
            onClick={() => setOpen({ ...open, category: !open.category })}
            className="w-full flex justify-between items-center font-semibold border-b py-2"
          >
            CATEGORY
            {open?.category ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {open?.category && (
            <div className="mt-2 ml-2 space-y-2 max-h-[20vh] overflow-auto">
              {allProducts?.map((pro) => (
                <label key={pro._id} className="flex items-center gap-2">
                  <input
                    onClick={() => seeValue(pro?.categoryItem?._id)}
                    type="checkbox"
                    {...register("category")}
                    value={pro?.categoryItem?._id}
                    className="h-4 w-4 "
                  />
                  {pro?.categoryItem?.categoryName}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* COLOR */}
        <div>
          <button
            type="button"
            onClick={() => setOpen({ ...open, color: !open.color })}
            className="w-full flex justify-between items-center font-semibold border-b py-2"
          >
            COLOR
            {open.color ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {open.color && (
            <div className="mt-2 ml-2 max-h-40 overflow-y-auto space-y-2">
              {["Black", "Blue", "Green", "Red", "White"].map((color) => (
                <label key={color} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("color")}
                    value={color}
                    className="h-4 w-4"
                  />
                  {color}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* SIZE */}
        <div>
          <button
            type="button"
            onClick={() => setOpen({ ...open, size: !open.size })}
            className="w-full flex justify-between items-center font-semibold border-b py-2"
          >
            SIZE
            {open.size ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {open.size && (
            <div className="mt-2 ml-2 space-y-2">
              {["S", "M", "L", "XL"].map((size) => (
                <label key={size} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("size")}
                    value={size}
                    className="h-4 w-4"
                  />
                  {size}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* PRICE */}
        <div>
          <button
            type="button"
            onClick={() => setOpen({ ...open, price: !open.price })}
            className="w-full flex justify-between items-center font-semibold border-b py-2"
          >
            PRICE
            {open.price ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {open.price && (
            <div className="mt-2">
              <input
                type="range"
                min="0"
                max="3000"
                step="100"
                {...register("price")}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-sm mt-1">
                <span>₹0.00</span>
                <span>₹3,000.00</span>
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Filter Price
        </button>
      </form>
    </div>
  );
};

export default ShopFiltering;
