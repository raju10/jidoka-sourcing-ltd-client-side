// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import useSubCategory from "../../../hooks/useSubCategory";
// import { MultiSelect } from "react-multi-select-component";

// const MySwal = withReactContent(Swal);
// //////////////
// const generateRandomCode = () => {
//   const chars =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < 6; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return result;
// };
// const sizeOptions = [
//   { label: "S", value: "S" },
//   { label: "M", value: "M" },
//   { label: "L", value: "L" },
//   { label: "XL", value: "XL" },
//   { label: "XXL", value: "XXL" },
// ];

// ////////////////
// const ManageProducts = () => {
//   const [allSubCategorys] = useSubCategory();
//   console.log(allSubCategorys);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [productCode, setProductCode] = useState("");
//   const [selectedSizes, setSelectedSizes] = useState([]);
//   console.log(selectedSizes);
//   useEffect(() => {
//     setProductCode(generateRandomCode());
//   }, []);
//   const onSubmit = (data) => {
//     console.log(data);
//     data.productCode = productCode;
//     data.size = selectedSizes.map((item) => item.value); // Add selected sizes to data
//   };

//   const showFormModal = () => {
//     MySwal.fire({
//       title: "Add Sub Category",
//       html: (
//         <form onSubmit={handleSubmit(onSubmit)} className="">
//           {/* Category Dropdown Field */}
//           <div className="mb-6">
//             <label className="block mb-1 text-gray-700">Select Category</label>
//             <select
//               {...register("parentCategory", {
//                 required: "Please select a category",
//               })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="">-- Select a Category --</option>
//               {allSubCategorys?.map((cat) => (
//                 <option key={cat._id} value={JSON.stringify(cat)}>
//                   {cat.subCategoryName}
//                 </option>
//               ))}
//             </select>
//             {errors.parentCategory && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.parentCategory.message}
//               </p>
//             )}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Product Code</label>
//             <input
//               type="text"
//               disabled
//               value={productCode}
//               readOnly
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
//             />
//           </div>

//           {/* Product Title */}
//           <div>
//             <label className="block mb-1 font-medium">Product Title</label>
//             <input
//               type="text"
//               {...register("productTitle", { required: true })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter product title"
//             />
//             {errors.productTitle && (
//               <p className="text-red-500 text-sm">Product title is required</p>
//             )}
//           </div>

//           {/* Material */}
//           <div>
//             <label className="block mb-1 font-medium">Material</label>
//             <input
//               type="text"
//               {...register("material", { required: true })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter material"
//             />
//             {errors.material && (
//               <p className="text-red-500 text-sm">Material is required</p>
//             )}
//           </div>

//           {/* Price */}
//           <div>
//             <label className="block mb-1 font-medium">Price (৳)</label>
//             <input
//               type="number"
//               {...register("price", { required: true })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter price"
//             />
//             {errors.price && (
//               <p className="text-red-500 text-sm">Price is required</p>
//             )}
//           </div>

//           {/* Discount */}
//           <div>
//             <label className="block mb-1 font-medium">Discount (%)</label>
//             <input
//               type="number"
//               {...register("discount")}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter discount"
//             />
//           </div>

//           {/* Size (MultiSelect) */}
//           <div>
//             <label className="block mb-1 font-medium">
//               Sizes (Select multiple)
//             </label>
//             <MultiSelect
//               options={sizeOptions}
//               value={selectedSizes}
//               onChange={setSelectedSizes}
//               labelledBy="Select Sizes"
//               className="w-full"
//             />
//             {selectedSizes.length === 0 && (
//               <p className="text-red-500 text-sm mt-1">
//                 At least one size is required
//               </p>
//             )}
//           </div>

//           {/* Color */}
//           <div>
//             <label className="block mb-1 font-medium">Color</label>
//             <input
//               type="text"
//               {...register("color", { required: true })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter color"
//             />
//             {errors.color && (
//               <p className="text-red-500 text-sm">Color is required</p>
//             )}
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block mb-1 font-medium">Product Image</label>
//             <input
//               type="file"
//               {...register("image", { required: true })}
//               accept="image/*"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             {errors.image && (
//               <p className="text-red-500 text-sm">Image is required</p>
//             )}
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block mb-1 font-medium">Description</label>
//             <textarea
//               {...register("description", { required: true })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               rows="4"
//               placeholder="Enter product description"
//             ></textarea>
//             {errors.description && (
//               <p className="text-red-500 text-sm">Description is required</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
//             >
//               Submit Product
//             </button>
//           </div>
//         </form>
//       ),
//       showConfirmButton: false,
//       showCancelButton: true,
//       focusConfirm: false,
//     });
//   };
//   return (
//     <div>
//       {" "}
//       <div className="text-end my-10">
//         <button className="btn btn-primary" onClick={showFormModal}>
//           Add New Product
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ManageProducts;

//////////////////////////
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
//
//
//
//
//
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import useSubCategory from "../../../hooks/useSubCategory";
// import { MultiSelect } from "react-multi-select-component";
// import { AiOutlineClose } from "react-icons/ai";
// import useProducts from "../../../hooks/useProducts";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";

// const MySwal = withReactContent(Swal);

// const generateRandomCode = () => {
//   const chars =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < 6; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return result;
// };

// const sizeOptions = [
//   { label: "S", value: "S" },
//   { label: "M", value: "M" },
//   { label: "L", value: "L" },
//   { label: "XL", value: "XL" },
//   { label: "XXL", value: "XXL" },
// ];

// const ManageProducts = () => {
//   const [allSubCategorys] = useSubCategory();
//   const [allProducts] = useProducts();
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   console.log(selectedProduct);
//   console.log(allProducts);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [productCode, setProductCode] = useState("");
//   const [selectedSizes, setSelectedSizes] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     setProductCode(generateRandomCode());
//   }, []);

//   const onSubmit = (data) => {
//     data.productCode = productCode;
//     data.size = selectedSizes.map((item) => item.value);

//     if (data.size.length === 0) {
//       MySwal.fire("Error", "Please select at least one size", "error");
//       return;
//     }

//     console.log("Final Data:", data);

//     // Send data to API here...

//     MySwal.fire(
//       "Success",
//       "Product added successfully!",
//       "success"
//       //   "showCancelButton"
//     );
//     reset();
//     setSelectedSizes([]);
//     setShowForm(false);
//   };

//   const handleSelectChange = (e) => {
//     const selectedValue = e.target.value;

//     if (selectedValue === "all") {
//       setSelectedProduct(null); // Clear selectedCategory so all data shows
//     } else {
//       const selectedObj = JSON.parse(selectedValue);
//       setSelectedProduct(selectedObj);
//     }
//   };
//   const filter = selectedProduct
//     ? allProducts?.filter(
//         (cat) => cat?.subCategoryItem?.subCategoryID === selectedProduct?._id
//       )
//     : allProducts; // Show all if no category is selected
//   console.log(filter);

//   return (
//     <div className="min-h-screen ">
//       <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 justify-end items-center px-7 py-5 rounded-lg sticky top-5 bg-gray-100 lg:mx-20 -space-y-2 lg:space-y-0 mb-20 z-10">
//         <div className="w-full">
//           <input
//             type="search"
//             name=""
//             id=""
//             placeholder="Search"
//             className=" w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
//           />
//         </div>
//         <div className=" ">
//           {/* <label className="blocktext-lg font-medium text-gray-700">
//             Select Category
//           </label> */}

//           <select
//             onChange={handleSelectChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
//             defaultValue=""
//           >
//             <option value="">-- Choose Product --</option>
//             <option value="all">All</option> {/* 👈 This is the new option */}
//             {allSubCategorys.map((cat) => (
//               <option key={cat._id} value={JSON.stringify(cat)}>
//                 {cat.subCategoryName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {showForm ? (
//           <button
//             className="btn  bg-black text-white hover:bg-red-600 "
//             style={{ display: "none" }}
//             onClick={() => setShowForm(false)}
//           >
//             Cancel <AiOutlineClose />
//           </button>
//         ) : (
//           <button
//             className="btn btn-primary "
//             onClick={() => setShowForm(true)}
//           >
//             Add new product
//           </button>
//         )}
//       </div>
//       {showForm && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0,0,0,0.3)", // Optional dim background
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//             overflowX: "auto",
//           }}
//           className=""
//           onClick={() => setShowForm(false)}
//         >
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="p-4 border rounded-md bg-white relative mb-5"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* cancel field */}
//             <div className="pb-10">
//               {" "}
//               <button
//                 className="btn absolute top-0 right-0 bg-black text-white hover:bg-red-600"
//                 onClick={() => setShowForm(false)}
//               >
//                 <AiOutlineClose />
//               </button>
//             </div>
//             {/* Category */}
//             <div className="mb-6">
//               <label className="block mb-1 text-gray-700">
//                 Select Category
//               </label>
//               <select
//                 {...register("parentCategory", {
//                   required: "Please select a category",
//                 })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">-- Select Sub-Category --</option>
//                 {allSubCategorys?.map((cat) => (
//                   <option key={cat._id} value={JSON.stringify(cat)}>
//                     {cat.subCategoryName}
//                   </option>
//                 ))}
//               </select>
//               {errors.parentCategory && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.parentCategory.message}
//                 </p>
//               )}
//             </div>

//             {/* Product Code */}
//             <div>
//               <label className="block mb-1 font-medium">Product Code</label>
//               <input
//                 type="text"
//                 disabled
//                 value={productCode}
//                 readOnly
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
//               />
//             </div>

//             {/* Product Title */}
//             <div>
//               <label className="block mb-1 font-medium">Product Title</label>
//               <input
//                 type="text"
//                 {...register("productTitle", { required: true })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 placeholder="Enter product title"
//               />
//               {errors.productTitle && (
//                 <p className="text-red-500 text-sm">
//                   Product title is required
//                 </p>
//               )}
//             </div>

//             {/* Material */}
//             <div>
//               <label className="block mb-1 font-medium">Material</label>
//               <input
//                 type="text"
//                 {...register("material", { required: true })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 placeholder="Enter material"
//               />
//               {errors.material && (
//                 <p className="text-red-500 text-sm">Material is required</p>
//               )}
//             </div>

//             <div className="grid grid-cols-2 gap-5">
//               {/* Price */}
//               <div>
//                 <label className="block mb-1 font-medium">Price (৳)</label>
//                 <input
//                   type="number"
//                   {...register("price", { required: true })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                   placeholder="Enter price"
//                 />
//                 {errors.price && (
//                   <p className="text-red-500 text-sm">Price is required</p>
//                 )}
//               </div>

//               {/* Discount */}
//               {/* <div>
//             <label className="block mb-1 font-medium">Discount (%)</label>
//             <input
//               type="number"
//               {...register("discount")}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               placeholder="Enter discount"
//             />
//           </div> */}
//               <div>
//                 <label className="block mb-1 font-medium">Discount (%)</label>
//                 <input
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                   type="number"
//                   {...register("discount", {
//                     required: "Discount is required",
//                     min: { value: 1, message: "Minimum discount is 1%" },
//                     max: { value: 100, message: "Maximum discount is 100%" },
//                   })}
//                   placeholder="Enter discount %"
//                   min={1}
//                   max={100}
//                 />

//                 {errors.discount && (
//                   <p style={{ color: "red" }}>{errors.discount.message}</p>
//                 )}
//               </div>
//             </div>
//             {/* Size (MultiSelect) */}
//             <div>
//               <label className="block mb-1 font-medium">
//                 Sizes (Select multiple)
//               </label>
//               <MultiSelect
//                 options={sizeOptions}
//                 value={selectedSizes}
//                 onChange={setSelectedSizes}
//                 labelledBy="Select Sizes"
//                 className="w-full"
//               />
//             </div>

//             {/* Color */}
//             <div>
//               <label className="block mb-1 font-medium">Color</label>
//               <input
//                 type="text"
//                 {...register("color", { required: true })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 placeholder="Enter color"
//               />
//               {errors.color && (
//                 <p className="text-red-500 text-sm">Color is required</p>
//               )}
//             </div>

//             {/* Image Upload */}
//             <div>
//               <label className="block mb-1 font-medium">Product Image</label>
//               <input
//                 type="file"
//                 {...register("image", { required: true })}
//                 accept="image/*"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               />
//               {errors.image && (
//                 <p className="text-red-500 text-sm">Image is required</p>
//               )}
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block mb-1 font-medium">Description</label>
//               <textarea
//                 {...register("description", { required: true })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 rows="4"
//                 placeholder="Enter product description"
//               ></textarea>
//               {errors.description && (
//                 <p className="text-red-500 text-sm">Description is required</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
//               >
//                 Submit Product
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//       product data
//       <table className="table min-w-full">
//         {/* head */}
//         <thead>
//           <tr>
//             <th></th>
//             <th> Product Code</th>
//             <th> Image</th>
//             <th>Title</th>
//             <th>Price</th>

//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filter.map((item, index) => (
//             <tr key={item._id}>
//               <td>{index + 1}</td>
//               <td>
//                 <p>{item.productCode}</p>
//               </td>
//               <td>
//                 <div className="">
//                   {" "}
//                   <img
//                     src={item.image}
//                     alt=""
//                     className="w-25 h-20 rounded object-cover"
//                   />
//                 </div>
//               </td>
//               <td>
//                 <p>{item.productTitle}</p>
//               </td>
//               <td>
//                 <p>{item.price}</p>
//               </td>

//               <td>
//                 <button className="btn bg-[#D1A054] text-white hover:bg-black ">
//                   <FaEdit></FaEdit>
//                 </button>
//               </td>
//               <td>
//                 <button
//                   //  onClick={() => handleDeleteItem(item)}
//                   className="btn bg-red-600 text-white hover:bg-black"
//                 >
//                   <FaTrashAlt></FaTrashAlt>
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageProducts;
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

import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import useSubCategory from "../../../hooks/useSubCategory";
import { useLocation } from "react-router";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
import useProducts from "../../../hooks/useProducts";
import AddSubCategoryProductForm from "../AddSubCategoryProduct/AddSubCategoryProductForm";

const MySwal = withReactContent(Swal);

const ManageProducts = () => {
  //  subCategorySelectItem,
  // subCatIdFiltaringProducts,
  const [allSubCategorys] = useSubCategory();

  const [allProducts] = useProducts();
  const [selectedFilterSubCategory, setSelectedFilterSubCategory] =
    useState(null);
  console.log(selectedFilterSubCategory);
  const [searchCode, setSearchCode] = useState(""); // 👈 for search
  const location = useLocation();
  const { register, handleSubmit } = useForm();

  // -------------------- MODAL SHOW --------------------
  const showFormModal = () => {
    MySwal.fire({
      title: "Add Product",
      html: (
        <AddSubCategoryProductForm
          // register={register}
          // errors={errors}
          // handleSubmit={handleSubmit}
          // isSubmitting={isSubmitting}
          allSubCategorys={allSubCategorys}
          subCategorySelectItem={selectedFilterSubCategory}
          allProducts={allProducts}
          // handleSelectChange={handleSelectChange}
          location={location}
        />
      ),
      showConfirmButton: false,
      showCancelButton: true,
      focusConfirm: false,
      width: "600px",
    });
  };

  // --------------------SUB CATEGORY FILTER --------------------
  const handleTableFilterChange = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value === "all") {
      setSelectedFilterSubCategory(null);
    } else {
      const selectedObj = JSON.parse(value);
      console.log(selectedObj);
      setSelectedFilterSubCategory(selectedObj);
    }
  };

  // const filter = selectedFilterSubCategory
  //   ? allProducts?.filter(
  //       (cat) =>
  //         cat?.subCategoryItem.subCategoryID === selectedFilterSubCategory?._id
  //     )
  //   : allProducts;
  // console.log(filter);
  // --------------------PRODUCT CODE SEARCH --------------------
  const handleProductCode = (e) => {
    setSearchCode(e.target.value.trim().toLowerCase());
  };
  // -------------------- FILTER LOGIC --------------------
  const filteredProducts = useMemo(() => {
    let filtered = allProducts || [];

    // Filter by subcategory
    if (selectedFilterSubCategory) {
      filtered = filtered.filter(
        (cat) =>
          cat?.subCategoryItem?.subCategoryID === selectedFilterSubCategory?._id
      );
    }

    // Filter by product code search
    if (searchCode) {
      filtered = filtered.filter((f) =>
        f?.productCode?.toLowerCase().includes(searchCode)
      );
    }

    return filtered;
  }, [allProducts, selectedFilterSubCategory, searchCode]);

  // -------------------- RENDER --------------------
  return (
    <div className="">
      {/*     <label className="block mb-2 text-lg font-medium text-gray-700">
          Select Sub Category
        </label>
        <select
          onChange={handleTableFilterChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          defaultValue=""
        >
          <option value="">-- Choose Sub Category --</option>
          <option value="all">All</option>
          {allSubCategorys.map((cat) => (
            <option key={cat._id} value={JSON.stringify(cat)}>
              {cat.subCategoryName}
            </option>
          ))}
        </select> */}
      <div className="grid sm:grid-cols-2 gap-4 items-end   m-10 ">
        <div className=" max-w-sm ">
          <label className="block pb-2 text-lg font-medium text-gray-700">
            Select Sub-Category
          </label>
          <select
            onChange={handleTableFilterChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md "
            defaultValue="all"
          >
            <option value="" disabled>
              -- Choose Sub-Category --
            </option>
            <option value="all">All</option>
            {allSubCategorys?.map((cat) => (
              <option key={cat._id} value={JSON.stringify(cat)}>
                {cat.subCategoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="text-end">
          <button className="btn btn-primary" onClick={showFormModal}>
            <FaPlus /> Add New Sub category
          </button>
        </div>
      </div>
      {/* Product Code Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="🔍 Search by product code..."
          onChange={handleProductCode}
          className="border border-gray-400 px-4 py-2 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Products Table */}
      <table className="table min-w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th> Product </th>
            <th>Items</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length <= 0 ? (
            <p className="font-bold text-lg text-red-400 text-center py-10">
              Product not avalible this category
            </p>
          ) : (
            filteredProducts?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                {/* <td>
                <p>{item.productCode}</p>
              </td> */}
                <td>
                  <div className="md:flex gap-5 items-center">
                    <div className="">
                      <img
                        src={item.image}
                        alt=""
                        className="w-25 h-20 rounded object-cover"
                      />
                    </div>
                    <div className="">
                      <p>
                        code :{" "}
                        <i className="text-[#b67718] font-medium font-serif text-[16px]">
                          {item.productCode}
                        </i>{" "}
                      </p>
                      <p className="text-lg font-semibold">
                        {item.productTitle}
                      </p>
                      <div className="flex gap-3">
                        {item.price ? (
                          <b>$ {item.price}</b>
                        ) : (
                          <b> Price not add</b>
                        )}
                        {item.discount && (
                          <p className="text-red-500"> - {item.discount} % </p>
                        )}
                      </div>
                      {item.noOfQuantity ? (
                        <p>Quantity : {item.noOfQuantity}</p>
                      ) : (
                        <p>Quantity Available</p>
                      )}
                      {/* size */}

                      {item.size && (
                        <div className="flex gap-3">
                          <b> Size :</b>
                          {item.size.map((s) => (
                            <i className="" key={s}>
                              {s}
                            </i>
                          ))}{" "}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="">
                    <p>
                      {" "}
                      <b>Category :</b> {item?.categoryItem?.categoryName}
                    </p>
                    <p>
                      {" "}
                      <b>Sub Category :</b>{" "}
                      {item.subCategoryItem.subCategoryName}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn bg-[#D1A054] text-white hover:bg-black ">
                      <FaEdit></FaEdit>
                    </button>
                    <button
                      //  onClick={() => handleDeleteItem(item)}
                      className="btn bg-red-600 text-white hover:bg-black"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
