// import useSubCategory from "../../../../hooks/useSubCategory";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { useForm } from "react-hook-form";
// import useCategory from "../../../../hooks/useCategory";
// import { useEffect, useState } from "react";
// import useAxiosPublic from "../../../../hooks/useAxiosPublic";

// const MySwal = withReactContent(Swal);

// //img api
// const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

// const ManageSubCategorys = () => {
//   const axiosPublic = useAxiosPublic();
//   const [allSubCategorys] = useSubCategory();
//   const [allCategorys] = useCategory();
//   //console.log(allCategorys);
//   const [allCat, setAllCat] = useState([]);
//   const [selcedCategory, setSelectedCatagory] = useState(null);
//   console.log(selcedCategory);
//   useEffect(() => {
//     allCategorys?.map((cat) => setAllCat(cat));
//   }, [allCategorys, allCat]);
//   // console.log(allCat);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setError,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     const selectedCategoryItem = JSON.parse(data.parentCategory); // 👈 parse string back to object
//     // duplicate name detact
//     const isDuplicate = allSubCategorys.some(
//       (item) =>
//         item.subCategoryName.toLowerCase() ===
//         data.subCategoryName.toLowerCase()
//     );
//     console.log(isDuplicate);
//     if (isDuplicate) {
//       // Show SweetAlert error popup
//       Swal.fire({
//         icon: "error",
//         title: "Duplicate Sub Category",
//         html: `This Sub Category Name
//              <b style="color: red; font-weight: 700;">${data.subCategoryName}</b>
//             already exists. Please enter a different name.`,
//       });

//       // Set error on input field using react-hook-form
//       setError("subCategoryName", {
//         type: "manual",
//         message: "This Sub Category Name already exists.",
//       });
//       return; // Stop form submission
//     }
//     // duplicate name detact close
//     //  img upload to imgbb and then get an url
//     const imageFile = { image: data.subCategoryImage[0] };

//     const res = await axiosPublic.post(img_hosting_api, imageFile, {
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//     });
//     console.log("res", res);
//     const subCategoryItem = {
//       subCategoryName: data.subCategoryName,
//       subCategoryImage: res.data.data.display_url,
//       selectedCategoryItem,
//     };

//     console.log("Final Subcategory Data:", subCategoryItem);
//     const subCategoryResponse = await axiosPublic.post(
//       "/subCategory",
//       subCategoryItem
//     );

//     const insertedId = subCategoryResponse?.data?.insertedId;
//     console.log("insertedId", insertedId);
//     if (subCategoryResponse?.data?.acknowledged === true && insertedId) {
//       console.log("subCategoryResponse", subCategoryResponse);
//       // reset();
//       MySwal.close(), // Close the modal after successful submission
//         Swal.fire({
//           icon: "success",
//           title: "Subcategory Added!",
//           text: `"${data.subCategoryName}" has been added successfully.`,
//         });
//     }

//     // optional
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
//               {allCategorys?.map((cat) => (
//                 <option key={cat._id} value={JSON.stringify(cat)}>
//                   {cat.categoryName}
//                 </option>
//               ))}
//             </select>
//             {errors.parentCategory && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.parentCategory.message}
//               </p>
//             )}
//           </div>
//           {/* Category Name Field */}
//           <div className="mb-6">
//             <label className="text-start block mb-1 text-gray-700">
//               Category Name
//             </label>
//             <input
//               type="text"
//               {...register("subCategoryName", {
//                 required: "Sub Category Name is required",
//               })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your Sub Category Name"
//             />
//             {errors.subCategoryName && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.subCategoryName.message}
//               </p>
//             )}
//           </div>

//           {/* Category img Field */}
//           <div className="mb-6">
//             <label className="text-start block mb-1 text-gray-700">
//               Category Image
//             </label>
//             <input
//               type="file"
//               {...register("subCategoryImage", { required: true })}
//               className="mb-2 file-input file-input-ghost"
//             />
//             {errors.subCategoryImage && (
//               <span className="text-red-500 text-sm block">
//                 Please upload a file
//               </span>
//             )}
//           </div>

//           {/* submit btn */}
//           {/* <Link to={`/dashboard/addSubCategory/${creacteCategoryId}`}> */}
//           <input
//             type="submit"
//             value="Add Sub Category"
//             className="w-full btn bg-blue-500 mt-4 text-white hover:bg-blue-600 font-semibold"
//           />
//           {/* </Link> */}
//         </form>
//       ),
//       showConfirmButton: false,
//       showCancelButton: true,
//       focusConfirm: false,
//     });
//   };
//   // When selected from dropdown
//   const handleSelectChange = (e) => {
//     // const selectedValue = e.target.value;
//     // const selectedObj = JSON.parse(selectedValue);
//     // setSelectedCatagory(selectedObj);
//     const selectedValue = e.target.value;
//     if (selectedValue === "all") {
//       setSelectedCatagory(null); // Clear selectedCategory so all data shows
//     } else {
//       const selectedObj = JSON.parse(selectedValue);
//       setSelectedCatagory(selectedObj);
//     }
//   };
//   // filter

//   //   const filter = allSubCategorys?.filter((cat) => {
//   //     return cat?.selectedCategoryItem?._id === selcedCategory?._id;
//   //   });
//   const filter = selcedCategory
//     ? allSubCategorys?.filter(
//         (cat) => cat?.selectedCategoryItem?._id === selcedCategory?._id
//       )
//     : allSubCategorys; // Show all if no category is selected
//   console.log(filter);
//   return (
//     <div className="">
//       <div className="text-end my-10">
//         {" "}
//         <button className="btn btn-primary" onClick={showFormModal}>
//           Add New Sub category
//         </button>{" "}
//       </div>
//       <div className="p-4 max-w-md ">
//         <label className="block mb-2 text-lg font-medium text-gray-700">
//           Select Category
//         </label>

//         <select
//           onChange={handleSelectChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
//           defaultValue=""
//         >
//           <option value="">-- Choose Category --</option>
//           <option value="all">All</option> {/* 👈 This is the new option */}
//           {allCategorys.map((cat) => (
//             <option key={cat._id} value={JSON.stringify(cat)}>
//               {cat.categoryName}
//             </option>
//           ))}
//         </select>
//       </div>
//       <table className="table min-w-full">
//         {/* head */}
//         <thead>
//           <tr>
//             <th></th>
//             <th> Image</th>
//             <th>Title</th>

//             <th>Action</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filter.map((item, index) => (
//             <tr key={item._id}>
//               <td>{index + 1}</td>
//               <td>
//                 <div className="">
//                   {" "}
//                   <img
//                     src={item.subCategoryImage}
//                     alt=""
//                     className="w-25 h-20 rounded object-cover"
//                   />
//                 </div>
//               </td>
//               <td>
//                 <p>{item.subCategoryName}</p>
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

// export default ManageSubCategorys;

/////////////////////////
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

// import useSubCategory from "../../../../hooks/useSubCategory";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { useForm } from "react-hook-form";
// import useCategory from "../../../../hooks/useCategory";
// import { useEffect, useState } from "react";
// import useAxiosPublic from "../../../../hooks/useAxiosPublic";
// import { useLocation } from "react-router";
// import AddSubCategoryForm from "../../AddSubCategory/AddSubCategoryForm";

// const MySwal = withReactContent(Swal);

// //img api
// const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

// const ManageSubCategorys = () => {
//   const axiosPublic = useAxiosPublic();
//   const [allSubCategorys] = useSubCategory();
//   const [allCategorys] = useCategory();
//   const [selcedCategory, setSelectedCatagory] = useState(null);
//   const location = useLocation();
//   console.log(selcedCategory);
//   //console.log(location);
//   // ✅ react-hook-form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   // duplicatte test or some validation add

//   // Normalize string: lower case and remove non-letters for duplicate check
//   // const normalize = (str) => str.toLowerCase().replace(/[^a-z]/g, "");

//   // // Validation functions similar to your pattern (simple)
//   // const validateName = (name) => {
//   //   if (!/^[A-Za-z0-9\s]+$/.test(name)) {
//   //     return {
//   //       valid: false,
//   //       reason: "Name can only contain letters and numbers.",
//   //     };
//   //   }
//   //   return { valid: true, formatted: name.trim() };
//   // };

//   /////
//   // -------------------- SUBMIT --------------------
//   const onSubmit = async (data) => {
//     console.log(data);
//     // const selectedCategoryItem = JSON.parse(data.parentCategory);
//     // ✅ make sure selectedCategoryItem is not null
//     if (!selcedCategory) {
//       Swal.fire({
//         icon: "error",
//         title: "Category Required",
//         text: "Please select a category before submitting.",
//       });
//       return;
//     }
//     // ✅ check duplicate
//     const isDuplicate = allSubCategorys.some(
//       (item) =>
//         item.subCategoryName.toLowerCase() ===
//         data.subCategoryName.toLowerCase()
//     );
//     if (isDuplicate) {
//       Swal.fire({
//         icon: "error",
//         title: "Duplicate Sub Category",
//         html: `This Sub Category Name
//              <b style="color: red; font-weight: 700;">${data.subCategoryName}</b>
//             already exists. Please enter a different name.`,
//       });
//       return;
//     }
//     //////////
//     // 1. Duplicate check for subCategoryName
//     // const duplicate =
//     //   allCategorys.length > 0 &&
//     //   allCategorys.some(
//     //     (item) => normalize(item.categoryName) === normalize(data.categoryName)
//     //   );
//     // if (duplicate) {
//     //   Swal.fire({
//     //     icon: "error",
//     //     title: "Duplicate  Category",
//     //     html: `This Category <b>${data.categoryName}</b> already exists.`,
//     //   });
//     //   setError("categoryName", {
//     //     type: "manual",
//     //     message: "Duplicate Category name",
//     //   });
//     //   return;
//     // }
//     // // 2. Validate  productTitle,
//     // const nameCheck = validateName(data.categoryName);
//     // if (!nameCheck.valid) {
//     //   setError("categoryName", {
//     //     type: "manual",
//     //     message: nameCheck.reason,
//     //   });
//     //   return;
//     // }

//     ////////////////////////////

//     // ✅ upload image

//     //  img upload to imgbb and then get an url
//     // ✅ upload image
//     const imageFile = new FormData();
//     imageFile.append("image", data.subCategoryImage[0]);

//     const res = await axiosPublic.post(img_hosting_api, imageFile, {
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//     });
//     const subCategoryItem = {
//       subCategoryName: data.subCategoryName,
//       subCategoryImage: res.data.data.display_url,
//       selectedCategoryItem: selcedCategory,
//     };

//     const subCategoryResponse = await axiosPublic.post(
//       "/subCategory",
//       subCategoryItem
//     );
//     console.log(subCategoryResponse);
//     const insertedId = subCategoryResponse?.data?.insertedId;

//     if (subCategoryResponse?.data?.acknowledged === true && insertedId) {
//       MySwal.close();
//       Swal.fire({
//         icon: "success",
//         title: "Subcategory Added!",
//         text: `"${data.subCategoryName}" has been added successfully.`,
//       });
//     }
//   };

//   // -------------------- FORM COMPONENT --------------------
//   // const SubCategoryForm = ({ onSubmit }) => {
//   //   // console.log(onSubmit);
//   //   const {
//   //     register,
//   //     handleSubmit,
//   //     setError,
//   //     formState: { errors, isSubmitting },
//   //   } = useForm();

//   //   return (
//   //     <form onSubmit={handleSubmit(onSubmit)} className="">
//   //       {/* Category Dropdown Field */}
//   //       <div className="mb-6">
//   //         <label className="block mb-1 text-gray-700">Select Category</label>
//   //         <select
//   //           {...register("parentCategory", {
//   //             required: "Please select a category",
//   //           })}
//   //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//   //         >
//   //           <option value="">-- Select a Category --</option>
//   //           {allCategorys?.map((cat) => (
//   //             <option key={cat._id} value={JSON.stringify(cat)}>
//   //               {cat.categoryName}
//   //             </option>
//   //           ))}
//   //         </select>
//   //         {errors.parentCategory && (
//   //           <p className="text-red-500 text-sm mt-1">
//   //             {errors.parentCategory.message}
//   //           </p>
//   //         )}
//   //       </div>

//   //       {/* Sub Category Name Field */}
//   //       <div className="mb-6">
//   //         <label className="text-start block mb-1 text-gray-700">
//   //           Sub Category Name
//   //         </label>
//   //         <input
//   //           type="text"
//   //           {...register("subCategoryName", {
//   //             required: "Sub Category Name is required",
//   //           })}
//   //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//   //           placeholder="Enter your Sub Category Name"
//   //         />
//   //         {errors.subCategoryName && (
//   //           <p className="text-red-500 text-sm mt-1">
//   //             {errors.subCategoryName.message}
//   //           </p>
//   //         )}
//   //       </div>

//   //       {/* Image Field */}
//   //       <div className="mb-6">
//   //         <label className="text-start block mb-1 text-gray-700">
//   //           Category Image
//   //         </label>
//   //         <input
//   //           type="file"
//   //           {...register("subCategoryImage", { required: true })}
//   //           className="mb-2 file-input file-input-ghost"
//   //         />
//   //         {errors.subCategoryImage && (
//   //           <span className="text-red-500 text-sm block">
//   //             Please upload a file
//   //           </span>
//   //         )}
//   //       </div>

//   //       <input
//   //         type="submit"
//   //         value="Add Sub Category"
//   //         className="w-full btn bg-blue-500 mt-4 text-white hover:bg-blue-600 font-semibold"
//   //       />
//   //     </form>
//   //     ////////////

//   //   );
//   // };
//   // const [value,setValue]=useState(null)
//   // -------------------- CATEGORY FILTER --------------------
//   // ✅ fixed category selection
//   const handleSelectChange = (e) => {
//     const selectedValue = e.target.value;
//     if (!selectedValue) {
//       setSelectedCatagory(null);
//     } else {
//       try {
//         const selectedObj = JSON.parse(selectedValue);
//         setSelectedCatagory(selectedObj); // ✅ now always object
//       } catch (err) {
//         console.error("Invalid JSON value:", selectedValue);
//       }
//     }
//   };

//   const filter = selcedCategory
//     ? allSubCategorys?.filter(
//         (cat) => cat?.selectedCategoryItem?._id === selcedCategory?._id
//       )
//     : allSubCategorys;
//   console.log(filter);
//   // -------------------- MODAL SHOW --------------------
//   const showFormModal = () => {
//     MySwal.fire({
//       title: "Add Sub Category",
//       // html: <SubCategoryForm onSubmit={onSubmit} />,
//       html: (
//         <AddSubCategoryForm
//           onSubmit={onSubmit}
//           register={register}
//           errors={errors}
//           handleSubmit={handleSubmit}
//           isSubmitting={isSubmitting}
//           allCategorys={allCategorys}
//           handleSelectChange={handleSelectChange}
//         />
//       ),
//       showConfirmButton: false,
//       showCancelButton: true,
//       focusConfirm: false,
//     });
//   };

//   // -------------------- RENDER --------------------
//   return (
//     <div className="">
//       <div className="text-end my-10">
//         <button className="btn btn-primary" onClick={showFormModal}>
//           Add New Sub category
//         </button>
//       </div>

//       <div className="p-4 max-w-md ">
//         <label className="block mb-2 text-lg font-medium text-gray-700">
//           Select Category
//         </label>
//         <select
//           onChange={handleSelectChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
//           defaultValue=""
//         >
//           <option value="">-- Choose Category --</option>
//           <option value="all">All</option>
//           {allCategorys.map((cat) => (
//             <option key={cat._id} value={JSON.stringify(cat)}>
//               {cat.categoryName}
//             </option>
//           ))}
//         </select>
//       </div>

//       <table className="table min-w-full">
//         <thead>
//           <tr>
//             <th></th>
//             <th>Image</th>
//             <th>Title</th>
//             <th>Action</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filter.map((item, index) => (
//             <tr key={item._id}>
//               <td>{index + 1}</td>
//               <td>
//                 <div>
//                   <img
//                     src={item.subCategoryImage}
//                     alt=""
//                     className="w-25 h-20 rounded object-cover"
//                   />
//                 </div>
//               </td>
//               <td>
//                 <p>{item.subCategoryName}</p>
//               </td>
//               <td>
//                 <button className="btn bg-[#D1A054] text-white hover:bg-black ">
//                   <FaEdit />
//                 </button>
//               </td>
//               <td>
//                 <button className="btn bg-red-600 text-white hover:bg-black">
//                   <FaTrashAlt />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageSubCategorys;

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
import useSubCategory from "../../../../hooks/useSubCategory";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
import useCategory from "../../../../hooks/useCategory";
import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import AddSubCategoryForm from "../../AddSubCategory/AddSubCategoryForm";
import { useLocation } from "react-router";

const MySwal = withReactContent(Swal);

//img api
const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const ManageSubCategorys = () => {
  const axiosPublic = useAxiosPublic();
  const [allSubCategorys] = useSubCategory();
  const [allCategorys] = useCategory();
  // const [selcedCategory, setSelectedCatagory] = useState(null);
  // For table filtering
  const [selectedFilterCategory, setSelectedFilterCategory] = useState(null);
  console.log(selectedFilterCategory);
  const location = useLocation();
  // React Hook Form
  const { register, handleSubmit } = useForm();

  // -------------------- SUBMIT --------------------
  const onSubmit = async (data) => {
    console.log(data);
    try {
      // category যেটা dropdown থেকে আসবে সেটাকে object বানানো
      const selectedCategoryItem = JSON.parse(data.parentCategory);

      // ✅ check duplicate
      const isDuplicate = allSubCategorys.some(
        (item) =>
          item.subCategoryName.toLowerCase() ===
          data.subCategoryName.toLowerCase()
      );
      if (isDuplicate) {
        Swal.fire({
          icon: "error",
          title: "Duplicate Sub Category",
          html: `This Sub Category Name 
               <b style="color: red; font-weight: 700;">${data.subCategoryName}</b>
              already exists. Please enter a different name.`,
        });
        return;
      }

      // ✅ upload image
      const imageFile = new FormData();
      imageFile.append("image", data.subCategoryImage[0]);

      const res = await axiosPublic.post(img_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const subCategoryItem = {
        subCategoryName: data.subCategoryName,
        subCategoryImage: res.data.data.display_url,
        selectedCategoryItem,
      };

      const subCategoryResponse = await axiosPublic.post(
        "/subCategory",
        subCategoryItem
      );
      console.log(subCategoryResponse);
      const insertedId = subCategoryResponse?.data?.insertedId;

      if (subCategoryResponse?.data?.acknowledged === true && insertedId) {
        MySwal.close();
        Swal.fire({
          icon: "success",
          title: "Subcategory Added!",
          text: `"${data.subCategoryName}" has been added successfully.`,
        });
      }
    } catch (err) {
      console.error("Error submitting subcategory:", err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please try again.",
      });
    }
  };

  // -------------------- MODAL SHOW --------------------
  const showFormModal = () => {
    MySwal.fire({
      title: "Add Sub Category",
      html: (
        <AddSubCategoryForm
          onSubmit={onSubmit}
          // register={register}
          // errors={errors}
          // handleSubmit={handleSubmit}
          // isSubmitting={isSubmitting}
          allCategorys={allCategorys}
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

  // -------------------- CATEGORY FILTER --------------------
  const handleTableFilterChange = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value === "all") {
      setSelectedFilterCategory(null);
    } else {
      const selectedObj = JSON.parse(value);
      console.log(selectedObj);
      setSelectedFilterCategory(selectedObj);
    }
  };

  const filter = selectedFilterCategory
    ? allSubCategorys?.filter(
        (cat) => cat?.selectedCategoryItem?._id === selectedFilterCategory?._id
      )
    : allSubCategorys;

  // -------------------- RENDER --------------------
  return (
    <div className="">
      <div className="grid sm:grid-cols-2 gap-4 items-end   m-10 ">
        <div className=" max-w-sm ">
          <label className="block pb-2 text-lg font-medium text-gray-700">
            Select Category
          </label>
          <select
            onChange={handleTableFilterChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md "
            defaultValue=""
          >
            <option value="">-- Choose Category --</option>
            <option value="all">All</option>
            {allCategorys.map((cat) => (
              <option key={cat._id} value={JSON.stringify(cat)}>
                {cat.categoryName}
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
      <table className="table min-w-full">
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Title</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filter.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <div>
                  <img
                    src={item.subCategoryImage}
                    alt=""
                    className="w-25 h-20 rounded object-cover"
                  />
                </div>
              </td>
              <td>
                <p>{item.subCategoryName}</p>
              </td>
              <td>
                <button className="btn bg-[#D1A054] text-white hover:bg-black ">
                  <FaEdit />
                </button>
              </td>
              <td>
                <button className="btn bg-red-600 text-white hover:bg-black">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSubCategorys;

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
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { AiOutlineClose } from "react-icons/ai";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import AddSubCategory from "../../AddSubCategory/AddSubCategory";
// import AddSubCategoryForm from "../../AddSubCategory/AddSubCategoryForm";

// const MySwal = withReactContent(Swal);
// const ManageSubCategorys = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [showForm, setShowForm] = useState(false);
//   const onSubmit = (data) => {
//     console.log(data);
//     MySwal.fire(
//       "Success",
//       "Product added successfully!",
//       "success"
//       //   "showCancelButton"
//     );
//     reset();

//     setShowForm(false);
//   };
//   return (
//     <div>
//       <div className="min-h-screen ">
//         <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 justify-end items-center px-7 py-5 rounded-lg sticky top-5 bg-gray-100 lg:mx-20 -space-y-2 lg:space-y-0 mb-20 ">
//           {showForm ? (
//             <button
//               className="btn  bg-black text-white hover:bg-red-600 "
//               style={{ display: "none" }}
//               onClick={() => setShowForm(false)}
//             >
//               Cancel <AiOutlineClose />
//             </button>
//           ) : (
//             <button
//               className="btn btn-primary "
//               onClick={() => setShowForm(true)}
//             >
//               Add new product
//             </button>
//           )}
//         </div>
//         {showForm && (
//           // <form onSubmit={handleSubmit(onSubmit)} className="">
//           //   {/* cancel field */}
//           //   <div className="pb-10">
//           //     {" "}
//           //     <button
//           //       className="btn absolute top-0 right-0 bg-black text-white hover:bg-red-600"
//           //       onClick={() => setShowForm(false)}
//           //     >
//           //       <AiOutlineClose />
//           //     </button>
//           //   </div>
//           //   <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           //     Sub Category Add
//           //   </h2>
//           //   {/* Category Name Field */}
//           //   <div className="mb-6">
//           //     <label className="block mb-1 text-gray-700 text-start">
//           //       Category Name
//           //     </label>
//           //     <input
//           //       type="text"
//           //       {...register("subCategoryName", {
//           //         required: "Sub Category Name is required",
//           //       })}
//           //       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           //       placeholder="Enter your Sub Category Name"
//           //     />
//           //     {errors.subCategoryName && (
//           //       <p className="text-red-500 text-sm mt-1">
//           //         {errors.subCategoryName.message}
//           //       </p>
//           //     )}
//           //   </div>

//           //   {/* Category img Field */}
//           //   <div className="mb-6">
//           //     <label className="text-start block mb-1 text-gray-700">
//           //       Category Image
//           //     </label>
//           //     <input
//           //       type="file"
//           //       {...register("subCategoryImage", { required: true })}
//           //       className=" mb-2 file-input file-input-ghost"
//           //     />
//           //     {errors.subCategoryImage && (
//           //       <span className="text-red-500 text-sm block">
//           //         Please upload a file
//           //       </span>
//           //     )}
//           //   </div>

//           //   {/* submit btn */}
//           //   {/* <Link to={`/dashboard/addSubCategory/${creacteCategoryId}`}> */}
//           //   <input
//           //     type="submit"
//           //     value="Add Sub Category"
//           //     className="w-full btn bg-blue-500 mt-4 text-white hover:bg-blue-600 font-semibold"
//           //   />
//           //   {/* </Link> */}
//           // </form>
//           <AddSubCategoryForm onSubmit={onSubmit} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageSubCategorys;
