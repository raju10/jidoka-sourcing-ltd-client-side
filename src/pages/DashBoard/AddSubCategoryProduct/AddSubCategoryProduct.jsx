// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { MultiSelect } from "react-multi-select-component";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import { useParams } from "react-router";
// import useSubCategory from "../../../hooks/useSubCategory";
// import Swal from "sweetalert2";
// import useProducts from "../../../hooks/useProducts";

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
// ////////////
// const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

// //////////////
// const AddSubCategoryProduct = () => {
//   const { id } = useParams();
//   // console.log(id);
//   const axiosPublic = useAxiosPublic();
//   const [allSubCategorys] = useSubCategory();
//   const [allProducts] = useProducts();

//   const [subCategorySelectItem, setSubCategorySelectItem] = useState(null);
//   const [subCatIdFiltaringProducts, setSubCatIdFiltaringProducts] = useState(
//     []
//   );

//   //////finding////////////

//   useEffect(() => {
//     const find = allSubCategorys?.find((f) => f?._id === id);
//     setSubCategorySelectItem(find);
//   }, [allSubCategorys, id]);
//   console.log(subCategorySelectItem);
//   //// filtering///
//   useEffect(() => {
//     const filter = allProducts?.filter(
//       (pro) => pro?.subCategoryItem?.subCategoryID === id
//     );
//     setSubCatIdFiltaringProducts(filter);
//   }, [allProducts, id]);
//   console.log(subCatIdFiltaringProducts);
//   ////////////////
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setError,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const [productCode, setProductCode] = useState("");
//   const [selectedSizes, setSelectedSizes] = useState([]);
//   const [affordableStatus, setAffordableStatus] = useState("disable"); // default disable

//   useEffect(() => {
//     setProductCode(generateRandomCode());
//   }, []);
//   // form submit
//   // Normalize string: lower case and remove non-letters for duplicate check
//   const normalize = (str) => str.toLowerCase().replace(/[^a-z]/g, "");

//   // Validation functions similar to your pattern (simple)
//   const validateName = (name) => {
//     if (!/^[A-Za-z0-9\s]+$/.test(name)) {
//       return {
//         valid: false,
//         reason: "Name can only contain letters and numbers.",
//       };
//     }
//     return { valid: true, formatted: name.trim() };
//   };
//   const onSubmit = async (data) => {
//     // 1. Duplicate check for subCategoryName
//     const duplicate =
//       subCatIdFiltaringProducts.length > 0 &&
//       subCatIdFiltaringProducts.some(
//         (item) => normalize(item.productTitle) === normalize(data.productTitle)
//       );
//     if (duplicate) {
//       Swal.fire({
//         icon: "error",
//         title: "Duplicate Sub Category",
//         html: `The sub category <b>${data.productTitle}</b> already exists.`,
//       });
//       setError("productTitle", {
//         type: "manual",
//         message: "Duplicate sub category name",
//       });
//       return;
//     }
//     // 2. Validate  productTitle,
//     const nameCheck = validateName(data.productTitle);
//     if (!nameCheck.valid) {
//       setError("productTitle", {
//         type: "manual",
//         message: nameCheck.reason,
//       });
//       return;
//     }
//     // img upload to imgbb and then get an url
//     const imageFile = { image: data.image[0] };

//     const res = await axiosPublic.post(img_hosting_api, imageFile, {
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//     });
//     // 3. Check if image uploaded
//     // if (!data.subCategoryImage || data.subCategoryImage.length === 0) {
//     //   setError("subCategoryImage", {
//     //     type: "manual",
//     //     message: "Image is required",
//     //   });
//     //   return;
//     // }
//     console.log(res);
//     // Build Product Object
//     data.productCode = productCode;
//     data.size = selectedSizes.map((item) => item.value); // Add selected sizes to data
//     const subCategoryItem = { ...subCategorySelectItem };
//     const categoryItem = subCategoryItem.selectedCategoryItem;
//     console.log(subCategoryItem, categoryItem);
//     const productItem = {
//       ...data,
//       price: parseFloat(data.price),
//       discount: parseFloat(data.discount),
//       noOfQuantity: parseFloat(data.noOfQuantity),
//       image: res.data.data.display_url,
//       mostAffordable: affordableStatus, // ✅ add radio value
//       subCategoryItem: {
//         subCategoryImage: subCategoryItem.subCategoryImage,
//         subCategoryName: subCategoryItem.subCategoryName,
//         subCategoryID: subCategoryItem._id,
//       },
//       categoryItem,
//     };
//     console.log("productItems", productItem);

//     // Submit to backend

//     const productResponse = await axiosPublic.post("/product", productItem);
//     reset();
//     console.log(productResponse);
//     if (productResponse.data.insertedId) {
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Your work has been saved",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md">
//       <h2 className="text-2xl font-semibold mb-6 text-center">
//         Add Clothing Product
//       </h2>
//       <h6 className="py-5">
//         {" "}
//         Category / Sub-Category :{" "}
//         <b className=" text-lg text-blue-600 ">
//           {subCategorySelectItem?.selectedCategoryItem?.categoryName} /{" "}
//           {subCategorySelectItem?.subCategoryName}
//         </b>
//       </h6>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Product Code (readonly) */}
//         <div>
//           <label className="block mb-1 font-medium">Product Code</label>
//           <input
//             type="text"
//             disabled
//             value={productCode}
//             readOnly
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
//           />
//         </div>

//         {/* Product Title */}
//         <div>
//           <label className="block mb-1 font-medium">Product Title</label>
//           <input
//             type="text"
//             {...register("productTitle", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter product title"
//           />
//           {errors.productTitle && (
//             <p className="text-red-500 text-sm">Product title is required</p>
//           )}
//         </div>

//         {/* Material */}
//         <div>
//           <label className="block mb-1 font-medium">Material</label>
//           <input
//             type="text"
//             {...register("material", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter material"
//           />
//           {errors.material && (
//             <p className="text-red-500 text-sm">Material is required</p>
//           )}
//         </div>
//         {/* 🔴 Radio Button: Most Affordable */}
//         <div>
//           <label className="block mb-1 font-medium">
//             🔴 Most Affordable !!!
//           </label>
//           <div className="flex gap-6">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 value="disable"
//                 checked={affordableStatus === "disable"}
//                 onChange={(e) => setAffordableStatus(e.target.value)}
//               />
//               Disable
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 value="enable"
//                 checked={affordableStatus === "enable"}
//                 onChange={(e) => setAffordableStatus(e.target.value)}
//               />
//               Enable
//             </label>
//           </div>
//         </div>

//         <div className="grid sm:grid-cols-2 gap-3">
//           {/* Price */}
//           <div>
//             <label className="block mb-1 font-medium">Price (৳)</label>
//             <input
//               type="number"
//               {...register("price", {
//                 required:
//                   affordableStatus === "enable" ? "Price is required" : false,
//                 min: { value: 1, message: "Minimum Price must be 1" },
//                 pattern: {
//                   value: /^(?:[1-9][0-9]*)$/, // no leading 0, must be positive integer
//                   message: "Price must, not start with 0",
//                 },
//               })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               placeholder={
//                 affordableStatus === "disable"
//                   ? "Enter price (optional)"
//                   : "Enter price (required)"
//               }
//             />
//             {errors.price && (
//               <p className="text-red-500 text-sm">{errors.price.message}</p>
//             )}
//           </div>

//           {/* Discount */}
//           {/* <div>
//           <label className="block mb-1 font-medium">Discount (%)</label>
//           <input
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             type="number"
//             {...register("discount", {
//               required: "Discount is required",
//               min: { value: 1, message: "Minimum discount is 1%" },
//               max: { value: 100, message: "Maximum discount is 100%" },
//             })}
//             placeholder="Enter discount %"
//             min={1}
//             max={100}
//           />

//           {errors.discount && (
//             <p style={{ color: "red" }}>{errors.discount.message}</p>
//           )}
//         </div> */}

//           {/* Discount */}
//           <div>
//             <label className="block mb-1 font-medium">Discount (%)</label>
//             <input
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               type="number"
//               {...register("discount", {
//                 validate: (value) => {
//                   if (!value) return true; // ✅ allow empty (optional)
//                   if (value < 1) return "Minimum discount is 1%";
//                   if (value > 100) return "Maximum discount is 100%";
//                   return true;
//                 },
//               })}
//               placeholder="Enter discount % (optional)"
//               min={1}
//               max={100}
//             />

//             {errors.discount && (
//               <p style={{ color: "red" }}>{errors.discount.message}</p>
//             )}
//           </div>
//         </div>
//         {/* No of quantity */}
//         <div>
//           <label className="block mb-1 font-medium">No of quantity</label>
//           <input
//             type="number"
//             {...register("noOfQuantity", {
//               required:
//                 affordableStatus === "enable" ? "Quantity is required" : false,
//               min: { value: 1, message: "Minimum Quantity must be 1" },
//               pattern: {
//                 value: /^(?:[1-9][0-9]*)$/, // no leading 0, must be positive integer
//                 message: "Quantity must, not start with 0",
//               },
//             })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             placeholder={
//               affordableStatus === "disable"
//                 ? "Enter Quantity (optional)"
//                 : "Enter Quantity (required)"
//             }
//           />
//           {errors.noOfQuantity && (
//             <p className="text-red-500 text-sm">
//               {errors.noOfQuantity.message}
//             </p>
//           )}
//         </div>
//         <div className="grid lg:grid-cols-2 gap-3">
//           {" "}
//           {/* Size MultiSelect */}
//           <div>
//             <label className="block mb-1 font-medium">Sizes</label>
//             <MultiSelect
//               options={sizeOptions}
//               value={selectedSizes}
//               onChange={setSelectedSizes}
//               labelledBy="Select Sizes"
//               className="w-full"
//               overrideStrings={{
//                 selectSomeItems:
//                   affordableStatus === "disable"
//                     ? "Select sizes (optional)"
//                     : "Select sizes (required)",
//               }}
//             />
//             {affordableStatus === "enable" && selectedSizes.length === 0 && (
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
//               {...register("color")}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter color (optional)"
//             />
//             {/* {errors.color && (
//             <p className="text-red-500 text-sm">Color is required</p>
//           )} */}
//           </div>
//         </div>
//         {/* Image Upload */}
//         <div>
//           <label className="block mb-1 font-medium">Product Image</label>
//           <input
//             type="file"
//             {...register("image", { required: true })}
//             accept="image/*"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.image && (
//             <p className="text-red-500 text-sm">Image is required</p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block mb-1 font-medium">Description</label>
//           <textarea
//             {...register("description", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             rows="4"
//             placeholder="Enter product description"
//           ></textarea>
//           {errors.description && (
//             <p className="text-red-500 text-sm">Description is required</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <div>
//           <input
//             type="submit"
//             disabled={isSubmitting}
//             value={isSubmitting ? "Submitting..." : "Add Product"}
//             className="w-full btn bg-blue-500 mt-4 text-white hover:bg-blue-600 font-semibold"
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddSubCategoryProduct;
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
import { useParams } from "react-router";
import useSubCategory from "../../../hooks/useSubCategory";
import useProducts from "../../../hooks/useProducts";
import AddSubCategoryProductForm from "./AddSubCategoryProductForm";

const AddSubCategoryProduct = () => {
  const { id } = useParams(); // Get subcategory ID from route
  const [allSubCategorys] = useSubCategory();
  const [allProducts] = useProducts();
  // console.log(allProducts);
  const [subCategorySelectItem, setSubCategorySelectItem] = useState(null);
  console.log("subCategorySelectItem", subCategorySelectItem);
  const [subCatIdFiltaringProducts, setSubCatIdFiltaringProducts] = useState(
    []
  );
  console.log("subCatIdFiltaringProducts", subCatIdFiltaringProducts);
  useEffect(() => {
    const find = allSubCategorys?.find((f) => f?._id === id);
    setSubCategorySelectItem(find);
  }, [allSubCategorys, id]);

  useEffect(() => {
    const filter = allProducts?.filter(
      (pro) => pro?.subCategoryItem?.subCategoryID === id
    );
    setSubCatIdFiltaringProducts(filter);
  }, [allProducts, id]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add Product Page
      </h2>
      <h6 className="py-5">
        {" "}
        Category / Sub-Category :{" "}
        <b className=" text-lg text-blue-600 ">
          {subCategorySelectItem?.selectedCategoryItem?.categoryName} /{" "}
          {subCategorySelectItem?.subCategoryName}
        </b>
      </h6>
      {subCategorySelectItem && (
        <AddSubCategoryProductForm
          allProducts={allProducts}
          subCategorySelectItem={subCategorySelectItem}
          subCatIdFiltaringProducts={subCatIdFiltaringProducts}
        />
      )}
    </div>
  );
};

export default AddSubCategoryProduct;
