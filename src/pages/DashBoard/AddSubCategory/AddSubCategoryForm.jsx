// const AddSubCategoryForm = ({
//   onSubmit,
//   handleNameChange,
//   register,
//   errors,
//   handleSubmit,
//   isSubmitting,
// }) => {
//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)} className="" noValidate>
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Sub Category Add
//         </h2>
//         {/* Category Name Field */}
//         <div className="mb-6">
//           <label className="block mb-1 text-gray-700 text-start">
//             Category Name
//           </label>
//           <input
//             onChange={handleNameChange}
//             type="text"
//             {...register("subCategoryName", {
//               required: "Sub Category Name is required",
//             })}
//             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//               errors.subCategoryName
//                 ? "border-red-500 focus:ring-red-400"
//                 : "border-gray-300 focus:ring-blue-400"
//             }`}
//             placeholder="Enter your Sub Category Name"
//             autoComplete="off"
//           />
//           {errors.subCategoryName && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.subCategoryName.message}
//             </p>
//           )}
//         </div>

//         {/* Category img Field */}
//         <div className="mb-6">
//           <label className="text-start block mb-1 text-gray-700">
//             Category Image
//           </label>
//           <input
//             type="file"
//             {...register("subCategoryImage", { required: true })}
//             className=" mb-2 file-input file-input-ghost"
//           />
//           {errors.subCategoryImage && (
//             <span className="text-red-500 text-sm block">
//               Please upload a file
//             </span>
//           )}
//         </div>

//         {/* submit btn */}
//         {/* <Link to={`/dashboard/addSubCategory/${creacteCategoryId}`}> */}
//         <input
//           type="submit"
//           disabled={isSubmitting}
//           value={isSubmitting ? "Submatting..." : "Add Sub Category"}
//           className="w-full btn bg-blue-500 mt-4 text-white hover:bg-blue-600 font-semibold"
//         />
//         {/* </Link> */}
//       </form>
//     </div>
//   );
// };

// export default AddSubCategoryForm;
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const AddSubCategoryForm = ({
  onSubmit,
  // register,
  //errors,
  //handleSubmit,
  //isSubmitting,
  //handleSelectChange,
  findSelectedcategory,
  allCategorys,
  location,
  defaultValues, // New prop for editing
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues || {}, // Initialize with default values if provided
  });
  // console.log(location);
  // Local state for form dropdown
  const [selectedFormCategory, setSelectedFormCategory] = useState("");

  // Sync selectedFormCategory with defaultValues if provided (for editing)
  useEffect(() => {
    if (defaultValues?.parentCategory) {
      setSelectedFormCategory(defaultValues.parentCategory);
    }
  }, [defaultValues]);

  console.log(selectedFormCategory);
  const handleFormSelectChange = (e) => {
    setSelectedFormCategory(e.target.value);
  };
  return (
    <form className="text-start" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Category Dropdown */}
      {location?.pathname === "/dashboard/manageSubCategorys" ? (
        <>
          <div className="p-4 max-w-md ">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Select Category
            </label>
            <select
              {...register("parentCategory", {
                required: "Please select a category",
              })}
              disabled={!!defaultValues} // 👈 Lock during edit mode
              value={selectedFormCategory}
              onChange={handleFormSelectChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              defaultValue=""
            >
              <option value="">-- Choose Category --</option>
              {allCategorys?.map((cat) => (
                <option key={cat._id} value={JSON.stringify(cat)}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
            {errors.parentCategory && (
              <p className="text-red-500 text-sm mt-1">
                {errors.parentCategory.message}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Sub Category Add
          </h2>
          <h6 className="py-5">
            {" "}
            Category Name :{" "}
            <b className=" text-lg text-blue-600 ">
              {findSelectedcategory?.categoryName}
            </b>
          </h6>
        </>
      )}

      {/* Sub Category Name */}
      <div className="mb-6">
        <label className="block mb-1 text-gray-700">Sub Category Name</label>
        <input
          type="text"
          {...register("subCategoryName", {
            required: "Sub Category Name is required",
          })}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.subCategoryName
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-400"
            }`}
          placeholder="Enter Sub Category Name"
          autoComplete="off"
        />
        {errors.subCategoryName && (
          <p className="text-red-500 text-sm">
            {errors.subCategoryName.message}
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="text-start block mb-1 text-gray-700">
          Category Image
        </label>
        <input
          type="file"
          {...register("subCategoryImage", { required: true })}
          className="file-input file-input-ghost"
        />
        {errors.subCategoryImage && (
          <span className="text-red-500 text-sm block">
            Please upload a file
          </span>
        )}
      </div>

      {/* Submit */}
      <input
        type="submit"
        disabled={isSubmitting}
        value={isSubmitting ? "Submitting..." : "Add Sub Category"}
        className="w-full btn bg-blue-500 mt-4 text-white hover:bg-blue-600 font-semibold"
      />
    </form>
  );
};

export default AddSubCategoryForm;

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
