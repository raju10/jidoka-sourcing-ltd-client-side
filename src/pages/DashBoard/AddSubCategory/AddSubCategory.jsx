// import { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router";
// import useCategory from "../../../hooks/useCategory";
// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useSubCategory from "../../../hooks/useSubCategory";
// import Swal from "sweetalert2";
// import AddSubCategoryForm from "./AddSubCategoryForm";

// const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

// const AddSubCategory = () => {
//   const navigate = useNavigate();
//   const [allCategorys] = useCategory();
//   const [allSubCategorys] = useSubCategory();
//   const [findSelectedcategory, setFindSelectedcategory] = useState(null);
//   const location = useLocation();
//   const { id } = useParams();
//   console.log(id);
//   const axiosPublic = useAxiosPublic();
//   useEffect(() => {
//     const find = allCategorys?.find((f) => f._id === id);
//     setFindSelectedcategory(find);
//   }, [allCategorys, id]);
//   console.log("findSelectedcategory", findSelectedcategory);
//   //////////////////////////

//   const {
//     register,
//     handleSubmit,
//     setError,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   // // Normalize function for duplicate check: lowercase, no spaces, no special chars, no numbers
//   // const normalize = (str) => {
//   //   return str.toLowerCase().replace(/[^a-z]/g, ""); // keep only letters, no spaces, no numbers, no special chars
//   // };
//   // Capitalize first letter of each word
//   const capitalizeWords = (str) => {
//     return str.replace(
//       /\b\w+/g,
//       (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//     );
//   };

//   // Live input cleaner & formatter
//   // const handleNameChange = (e) => {
//   //   let value = e.target.value;

//   //   // Remove numbers and special chars (allow only letters and spaces)
//   //   value = value.replace(/[^a-zA-Z\s]/g, "");

//   //   // Replace multiple spaces with one
//   //   value = value.replace(/\s+/g, " ");

//   //   // Trim leading/trailing spaces
//   //   value = value.trimStart();

//   //   // Capitalize first letter of each word
//   //   value = capitalizeWords(value);

//   //   setValue("subCategoryName", value, { shouldValidate: true });
//   // };

//   // Clean and format name:
//   // - Remove any special chars and numbers
//   // - Split into words by spaces
//   // - Remove spaces inside words (fix broken words)
//   // - Capitalize first letter of each word
//   // const formatSubCategoryName = (str) => {
//   //   // Remove everything except letters and spaces
//   //   let cleaned = str.replace(/[^a-zA-Z\s]/g, "");
//   //   // Split by spaces to words
//   //   let words = cleaned.split(/\s+/);
//   //   // Remove spaces inside words: join each word's letters only (remove spaces inside word)
//   //   words = words.map((word) => word.replace(/\s+/g, ""));
//   //   // Remove empty words if any
//   //   words = words.filter(Boolean);
//   //   // Capitalize each word
//   //   words = words.map(
//   //     (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//   //   );
//   //   // Join back with single space
//   //   return words.join(" ");
//   // };
//   // Live clean input (remove special chars, extra spaces, leading spaces)
//   // const handleNameChange = (e) => {
//   //   let value = e.target.value;
//   //   value = value.replace(/[^a-zA-Z]/g, ""); // only allow letters,  & space
//   //   value = value.replace(/\s+/g, " "); // convert multiple spaces to one
//   //   value = value.replace(/^\s/, ""); // remove leading space
//   //   setValue("subCategoryName", value); // update react-hook-form field
//   // };
//   // Live input cleaner on change to prevent unwanted characters and extra spaces
//   // const handleNameChange = (e) => {
//   //   let value = e.target.value;
//   //   value = value.replace(/[^a-zA-Z\s]/g, ""); // only letters and spaces
//   //   value = value.replace(/\s+/g, " "); // multiple spaces to single space
//   //   value = value.trimStart(); // remove leading spaces
//   //   setValue("subCategoryName", value);
//   // };

//   const handleNameChange = (e) => {
//     let value = e.target.value;

//     // Remove numbers and special chars (allow only letters and spaces)
//     value = value.replace(/[^a-zA-Z\s]/g, "");

//     // Replace multiple spaces with one
//     value = value.replace(/\s+/g, " ");

//     // Trim leading/trailing spaces
//     value = value.trimStart();

//     // Capitalize first letter of each word
//     value = capitalizeWords(value);

//     setValue("subCategoryName", value, { shouldValidate: true });
//   };

//   // Normalize string for duplicate check (lowercase, remove spaces)
//   const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");
//   const onSubmit = async (data) => {
//     // const isDuplicate = allSubCategorys.some(
//     //   (item) =>
//     //     item.subCategoryName.toLowerCase() ===
//     //     data.subCategoryName.toLowerCase()
//     // );
//     // console.log(isDuplicate);
//     ////////////////////
//     // Format the input before saving & duplicate checking
//     //const formattedName = formatSubCategoryName(data.subCategoryName);

//     // Final clean before saving

//     //data.subCategoryName = data.subCategoryName.trim().replace(/\s+/g, " ");
//     // Final clean before submit
//     data.subCategoryName = capitalizeWords(
//       data.subCategoryName.trim().replace(/\s+/g, " ")
//     );
//     // Duplicate check ignoring case and special chars
//     const isDuplicate = allSubCategorys.some(
//       (item) =>
//         normalize(item.subCategoryName) === normalize(data.subCategoryName)
//     );
//     ////////////////////
//     if (isDuplicate) {
//       // Show SweetAlert error popup
//       Swal.fire({
//         icon: "error",
//         title: "Duplicate Sub Category",
//         html: `This Sub Category Name
//           <b style="color: red; font-weight: 700;">${data.subCategoryName}</b>
//          already exists. Please enter a different name.`,
//       });

//       // Set error on input field using react-hook-form
//       setError("subCategoryName", {
//         type: "manual",
//         message: "This Sub Category Name already exists.",
//       });
//       return; // Stop form submission
//     }

//     // Now set the cleaned, formatted name back to data before sending
//     // data.subCategoryName = formattedName;

//     // Proceed with image upload
//     const imageFile = { image: data.subCategoryImage[0] };

//     const res = await axiosPublic.post(img_hosting_api, imageFile, {
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//     });
//     // console.log("res", res);
//     const subCategoryItem = {
//       ...data,
//       subCategoryImage: res.data.data.display_url,
//       selectedCategoryItem: findSelectedcategory,
//     };

//     console.log(subCategoryItem);
//     const subCategoryResponse = await axiosPublic.post(
//       "/subCategory",
//       subCategoryItem
//     );
//     console.log("subCategoryResponse", subCategoryResponse);
//     const insertedId = subCategoryResponse?.data?.insertedId;
//     console.log("insertedId", insertedId);
//     if (subCategoryResponse?.data?.acknowledged === true && insertedId) {
//       return navigate(`/dashboard/addSubCategoryProduct/${insertedId}`);
//     }
//   };
//   return (
//     <div>
//       <div className="flex justify-center items-center h-full">
//         <div className="w-xl  p-8 rounded-xl border">
//           <AddSubCategoryForm
//             onSubmit={onSubmit}
//             handleNameChange={handleNameChange}
//             register={register}
//             errors={errors}
//             handleSubmit={handleSubmit}
//           ></AddSubCategoryForm>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddSubCategory;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// //
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import useCategory from "../../../hooks/useCategory";
// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useSubCategory from "../../../hooks/useSubCategory";
// import Swal from "sweetalert2";
// import AddSubCategoryForm from "./AddSubCategoryForm";

// const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

// const AddSubCategory = () => {
//   const navigate = useNavigate();
//   const [allCategorys] = useCategory();
//   const [allSubCategorys] = useSubCategory();
//   const [findSelectedcategory, setFindSelectedcategory] = useState(null);
//   const { id } = useParams();

//   const axiosPublic = useAxiosPublic();

//   useEffect(() => {
//     const find = allCategorys?.find((f) => f._id === id);
//     setFindSelectedcategory(find);
//   }, [allCategorys, id]);

//   const {
//     register,
//     handleSubmit,
//     setError,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   // Capitalize first letter of each word
//   const capitalizeWords = (str) => {
//     return str.replace(
//       /\b\w+/g,
//       (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//     );
//   };

//   // Live input cleaner & formatter
//   const handleNameChange = (e) => {
//     let value = e.target.value;

//     // Remove numbers and special chars (allow only letters and spaces)
//     value = value.replace(/[^a-zA-Z\s]/g, "");

//     // Replace multiple spaces with one
//     value = value.replace(/\s+/g, " ");

//     // Trim leading/trailing spaces
//     value = value.trimStart();

//     // Capitalize first letter of each word
//     value = capitalizeWords(value);

//     setValue("subCategoryName", value, { shouldValidate: true });
//   };

//   // Normalize string for duplicate check (lowercase, remove spaces)
//   const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

//   const onSubmit = async (data) => {
//     // Final clean before submit
//     data.subCategoryName = capitalizeWords(
//       data.subCategoryName.trim().replace(/\s+/g, " ")
//     );

//     // Check for duplicates ignoring case and spaces
//     const isDuplicate = allSubCategorys.some(
//       (item) =>
//         normalize(item.subCategoryName) === normalize(data.subCategoryName)
//     );

//     if (isDuplicate) {
//       Swal.fire({
//         icon: "error",
//         title: "Duplicate Sub Category",
//         html: `This Sub Category Name <b style="color: red;">${data.subCategoryName}</b> already exists. Please enter a different name.`,
//       });

//       setError("subCategoryName", {
//         type: "manual",
//         message: "This Sub Category Name already exists.",
//       });

//       return; // stop submission
//     }

//     // Upload image to imgbb
//     const imageFile = { image: data.subCategoryImage[0] };

//     const res = await axiosPublic.post(img_hosting_api, imageFile, {
//       headers: { "content-type": "multipart/form-data" },
//     });

//     const subCategoryItem = {
//       ...data,
//       subCategoryImage: res.data.data.display_url,
//       selectedCategoryItem: findSelectedcategory,
//     };

//     const subCategoryResponse = await axiosPublic.post(
//       "/subCategory",
//       subCategoryItem
//     );

//     if (
//       subCategoryResponse?.data?.acknowledged &&
//       subCategoryResponse?.data?.insertedId
//     ) {
//       navigate(
//         `/dashboard/addSubCategoryProduct/${subCategoryResponse.data.insertedId}`
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-full">
//       <div className="w-xl p-8 rounded-xl border">
//         <AddSubCategoryForm
//           onSubmit={onSubmit}
//           handleNameChange={handleNameChange}
//           register={register}
//           errors={errors}
//           handleSubmit={handleSubmit}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddSubCategory;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import useCategory from "../../../hooks/useCategory";
// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useSubCategory from "../../../hooks/useSubCategory";
// import Swal from "sweetalert2";
// import AddSubCategoryForm from "./AddSubCategoryForm";

// const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

// const AddSubCategory = () => {
//   const navigate = useNavigate();
//   const [allCategorys] = useCategory();
//   const [allSubCategorys] = useSubCategory();
//   const [findSelectedcategory, setFindSelectedcategory] = useState(null);
//   const { id } = useParams();

//   const axiosPublic = useAxiosPublic();

//   useEffect(() => {
//     const find = allCategorys?.find((f) => f._id === id);
//     setFindSelectedcategory(find);
//   }, [allCategorys, id]);

//   const {
//     register,
//     handleSubmit,
//     setError,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   // Capitalize first letter of each word
//   const capitalizeWords = (str) => {
//     return str.replace(
//       /\b\w+/g,
//       (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//     );
//   };

//   // Normalize string for duplicate check (lowercase, no spaces)
//   const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

//   // Live input cleaner & formatter
//   const handleNameChange = (e) => {
//     let value = e.target.value;

//     // Split by spaces, remove all non-letters inside each word, join letters to form clean words
//     let words = value
//       .split(/\s+/)
//       .map((word) => word.replace(/[^a-zA-Z]/g, ""))
//       .filter(Boolean); // remove empty strings

//     // Join clean words with single space
//     value = words.join(" ");

//     // Capitalize each word's first letter
//     value = capitalizeWords(value);

//     setValue("subCategoryName", value, { shouldValidate: true });
//   };

//   const onSubmit = async (data) => {
//     // Final clean before submit (same logic as live clean)
//     let words = data.subCategoryName
//       .split(/\s+/)
//       .map((word) => word.replace(/[^a-zA-Z]/g, ""))
//       .filter(Boolean);
//     data.subCategoryName = capitalizeWords(words.join(" "));

//     // Check duplicate ignoring case and spaces
//     const isDuplicate = allSubCategorys.some(
//       (item) =>
//         normalize(item.subCategoryName) === normalize(data.subCategoryName)
//     );

//     if (isDuplicate) {
//       Swal.fire({
//         icon: "error",
//         title: "Duplicate Sub Category",
//         html: `This Sub Category Name <b style="color: red;">${data.subCategoryName}</b> already exists. Please enter a different name.`,
//       });

//       setError("subCategoryName", {
//         type: "manual",
//         message: "This Sub Category Name already exists.",
//       });

//       return; // stop submission
//     }

//     // Upload image to imgbb
//     const imageFile = { image: data.subCategoryImage[0] };

//     const res = await axiosPublic.post(img_hosting_api, imageFile, {
//       headers: { "content-type": "multipart/form-data" },
//     });

//     const subCategoryItem = {
//       ...data,
//       subCategoryImage: res.data.data.display_url,
//       selectedCategoryItem: findSelectedcategory,
//     };

//     const subCategoryResponse = await axiosPublic.post(
//       "/subCategory",
//       subCategoryItem
//     );

//     if (
//       subCategoryResponse?.data?.acknowledged &&
//       subCategoryResponse?.data?.insertedId
//     ) {
//       navigate(
//         `/dashboard/addSubCategoryProduct/${subCategoryResponse.data.insertedId}`
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-full">
//       <div className="w-xl p-8 rounded-xl border">
//         <AddSubCategoryForm
//           onSubmit={onSubmit}
//           handleNameChange={handleNameChange}
//           register={register}
//           errors={errors}
//           handleSubmit={handleSubmit}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddSubCategory;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// //
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import useCategory from "../../../hooks/useCategory";
// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useSubCategory from "../../../hooks/useSubCategory";
// import Swal from "sweetalert2";
// import AddSubCategoryForm from "./AddSubCategoryForm";

// const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

// const AddSubCategory = () => {
//   const navigate = useNavigate();
//   const [allCategorys] = useCategory();
//   const [allSubCategorys] = useSubCategory();
//   const [findSelectedcategory, setFindSelectedcategory] = useState(null);
//   const { id } = useParams();
//   const axiosPublic = useAxiosPublic();

//   useEffect(() => {
//     const find = allCategorys?.find((f) => f._id === id);
//     setFindSelectedcategory(find);
//   }, [allCategorys, id]);

//   const {
//     register,
//     handleSubmit,
//     setError,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   // Capitalize first letter of each word
//   const capitalizeWords = (str) => {
//     return str.replace(
//       /\b\w+/g,
//       (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//     );
//   };

//   // Merge consecutive single-letter words into one word
//   const mergeSingleLetters = (words) => {
//     let mergedWords = [];
//     let temp = "";

//     for (let i = 0; i < words.length; i++) {
//       if (words[i].length === 1) {
//         temp += words[i];
//       } else {
//         if (temp.length > 0) {
//           mergedWords.push(temp);
//           temp = "";
//         }
//         mergedWords.push(words[i]);
//       }
//     }

//     if (temp.length > 0) {
//       mergedWords.push(temp);
//     }

//     return mergedWords;
//   };

//   // Normalize string for duplicate checking: lowercase, no spaces
//   const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

//   // Live input cleaner & formatter on typing
//   const handleNameChange = (e) => {
//     let value = e.target.value;

//     // Remove anything except letters and spaces
//     value = value.replace(/[^a-zA-Z\s]/g, "");

//     // Split into words, remove empty, merge single letters
//     let words = value.split(/\s+/).filter(Boolean);
//     words = mergeSingleLetters(words);

//     // Join and capitalize words
//     value = capitalizeWords(words.join(" "));

//     setValue("subCategoryName", value, { shouldValidate: true });
//   };

//   const onSubmit = async (data) => {
//     // Clean and format before submit
//     let cleaned = data.subCategoryName.replace(/[^a-zA-Z\s]/g, "");
//     let words = cleaned.split(/\s+/).filter(Boolean);
//     words = mergeSingleLetters(words);
//     data.subCategoryName = capitalizeWords(words.join(" "));

//     // Duplicate check ignoring case and spaces
//     const isDuplicate = allSubCategorys.some(
//       (item) =>
//         normalize(item.subCategoryName) === normalize(data.subCategoryName)
//     );

//     if (isDuplicate) {
//       Swal.fire({
//         icon: "error",
//         title: "Duplicate Sub Category",
//         html: `This Sub Category Name <b style="color: red;">${data.subCategoryName}</b> already exists. Please enter a different name.`,
//       });

//       setError("subCategoryName", {
//         type: "manual",
//         message: "This Sub Category Name already exists.",
//       });
//       return; // stop submission
//     }

//     // Upload image to imgbb
//     const imageFile = { image: data.subCategoryImage[0] };
//     const res = await axiosPublic.post(img_hosting_api, imageFile, {
//       headers: { "content-type": "multipart/form-data" },
//     });

//     const subCategoryItem = {
//       ...data,
//       subCategoryImage: res.data.data.display_url,
//       selectedCategoryItem: findSelectedcategory,
//     };

//     const subCategoryResponse = await axiosPublic.post(
//       "/subCategory",
//       subCategoryItem
//     );

//     if (
//       subCategoryResponse?.data?.acknowledged &&
//       subCategoryResponse?.data?.insertedId
//     ) {
//       navigate(
//         `/dashboard/addSubCategoryProduct/${subCategoryResponse.data.insertedId}`
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-full">
//       <div className="w-xl p-8 rounded-xl border">
//         <AddSubCategoryForm
//           onSubmit={onSubmit}
//           handleNameChange={handleNameChange}
//           register={register}
//           errors={errors}
//           handleSubmit={handleSubmit}
//           isSubmitting={isSubmitting}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddSubCategory;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router";
// import useCategory from "../../../hooks/useCategory";
// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useSubCategory from "../../../hooks/useSubCategory";
// import Swal from "sweetalert2";
// import AddSubCategoryForm from "./AddSubCategoryForm";

// const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

// const AddSubCategory = () => {
//   const navigate = useNavigate();
//   const [allCategorys] = useCategory();
//   const [allSubCategorys] = useSubCategory();
//   const [findSelectedcategory, setFindSelectedcategory] = useState(null);
//   const location = useLocation();
//   const { id } = useParams();
//   const axiosPublic = useAxiosPublic();

//   useEffect(() => {
//     const find = allCategorys?.find((f) => f._id === id);
//     setFindSelectedcategory(find);
//   }, [allCategorys, id]);

//   const {
//     register,
//     handleSubmit,
//     setError,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   // Remove special chars for duplicate check
//   const normalize = (str) => {
//     return str.toLowerCase().replace(/[^a-z]/g, "");
//   };

//   // Validation & formatting function
//   const validateAndFormatName = (str, allowNumbers = false) => {
//     // Remove unwanted characters
//     let cleaned = allowNumbers
//       ? str.replace(/[^a-zA-Z0-9\s]/g, "")
//       : str.replace(/[^a-zA-Z\s]/g, "");

//     // Remove multiple spaces & trim
//     cleaned = cleaned.replace(/\s+/g, " ").trim();

//     // Check if case format is valid
//     const isValidCase =
//       /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(cleaned) || // Title case
//       /^[a-z]+(\s[a-z]+)*$/.test(cleaned) || // all lowercase
//       /^[A-Z]+(\s[A-Z]+)*$/.test(cleaned); // all uppercase

//     if (!isValidCase) {
//       return { valid: false, reason: "Invalid letter casing format" };
//     }

//     return { valid: true, formatted: cleaned };
//   };

//   // Live input cleaner
//   const handleNameChange = (e) => {
//     let value = e.target.value;
//     value = value.replace(/[^a-zA-Z\s]/g, ""); // remove numbers & special chars
//     value = value.replace(/\s+/g, " "); // single space
//     value = value.trimStart();
//     setValue("subCategoryName", value);
//   };

//   const onSubmit = async (data) => {
//     const { valid, formatted, reason } = validateAndFormatName(
//       data.subCategoryName,
//       true // allowNumbers for title
//     );

//     if (!valid) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sub Category Name",
//         text: reason + ". Please correct and try again.",
//       });
//       setError("subCategoryName", { type: "manual", message: reason });
//       return;
//     }

//     // Duplicate check ignoring non-letters
//     const isDuplicate = allSubCategorys.some(
//       (item) => normalize(item.subCategoryName) === normalize(formatted)
//     );

//     if (isDuplicate) {
//       Swal.fire({
//         icon: "error",
//         title: "Duplicate Sub Category",
//         html: `The sub category <b>${formatted}</b> already exists.`,
//       });
//       setError("subCategoryName", {
//         type: "manual",
//         message: "This Sub Category Name already exists.",
//       });
//       return;
//     }

//     data.subCategoryName = formatted;

//     // Upload image
//     const imageFile = { image: data.subCategoryImage[0] };
//     const res = await axiosPublic.post(img_hosting_api, imageFile, {
//       headers: { "content-type": "multipart/form-data" },
//     });

//     const subCategoryItem = {
//       ...data,
//       subCategoryImage: res.data.data.display_url,
//       selectedCategoryItem: findSelectedcategory,
//     };

//     const subCategoryResponse = await axiosPublic.post(
//       "/subCategory",
//       subCategoryItem
//     );

//     if (
//       subCategoryResponse?.data?.acknowledged === true &&
//       subCategoryResponse?.data?.insertedId
//     ) {
//       navigate(
//         `/dashboard/addSubCategoryProduct/${subCategoryResponse.data.insertedId}`
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-full">
//       <div className="w-xl p-8 rounded-xl border">
//         <AddSubCategoryForm
//           onSubmit={onSubmit}
//           handleNameChange={handleNameChange}
//           register={register}
//           errors={errors}
//           handleSubmit={handleSubmit}
//           isSubmitting={isSubmitting}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddSubCategory;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router";
// import useCategory from "../../../hooks/useCategory";
// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useSubCategory from "../../../hooks/useSubCategory";
// import Swal from "sweetalert2";
// import AddSubCategoryForm from "./AddSubCategoryForm";

// const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

// const AddSubCategory = () => {
//   const navigate = useNavigate();
//   const [allCategorys] = useCategory();
//   const [allSubCategorys] = useSubCategory();
//   const [findSelectedcategory, setFindSelectedcategory] = useState(null);
//   const { id } = useParams();
//   const axiosPublic = useAxiosPublic();

//   const {
//     register,
//     handleSubmit,
//     setError,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   useEffect(() => {
//     const find = allCategorys?.find((f) => f._id === id);
//     setFindSelectedcategory(find);
//   }, [allCategorys, id]);

//   // Normalize for duplicate check
//   const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");

//   // === VALIDATION FUNCTIONS ===
//   const validateCaseFormat = (value) => {
//     return (
//       /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(value) || // Title case
//       /^[a-z]+(\s[a-z]+)*$/.test(value) || // All lowercase
//       /^[A-Z]+(\s[A-Z]+)*$/.test(value) // All uppercase
//     );
//   };

//   const validateName = (value) => {
//     let cleaned = value
//       .replace(/[^a-zA-Z\s]/g, "")
//       .replace(/\s+/g, " ")
//       .trim();
//     if (!validateCaseFormat(cleaned)) {
//       return { valid: false, reason: "Invalid letter casing format" };
//     }
//     return { valid: true, formatted: cleaned };
//   };

//   const validateTitle = (value) => {
//     let cleaned = value
//       .replace(/[^a-zA-Z0-9\s'"/():,.]/g, "")
//       .replace(/\s+/g, " ")
//       .trim();
//     if (!validateCaseFormat(cleaned.replace(/[^a-zA-Z\s]/g, ""))) {
//       return { valid: false, reason: "Invalid letter casing format" };
//     }
//     return { valid: true, formatted: cleaned };
//   };

//   const validatePrice = (value) => {
//     if (!/^[1-9][0-9]*$/.test(value)) {
//       return {
//         valid: false,
//         reason: "Price must be a positive number without leading zero",
//       };
//     }
//     return { valid: true, formatted: value };
//   };

//   // === SUBMIT HANDLER ===
//   const onSubmit = async (data) => {
//     // 1️⃣ Duplicate check first
//     const isDuplicate = allSubCategorys.some(
//       (item) =>
//         normalize(item.subCategoryName) === normalize(data.subCategoryName)
//     );
//     if (isDuplicate) {
//       Swal.fire({
//         icon: "error",
//         title: "Duplicate Sub Category",
//         html: `The sub category <b>${data.subCategoryName}</b> already exists.`,
//       });
//       setError("subCategoryName", {
//         type: "manual",
//         message: "Duplicate Sub Category Name",
//       });
//       return;
//     }

//     // 2️⃣ Validate subCategoryName
//     const nameCheck = validateName(data.subCategoryName);
//     if (!nameCheck.valid) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Name",
//         text: nameCheck.reason,
//       });
//       setError("subCategoryName", {
//         type: "manual",
//         message: nameCheck.reason,
//       });
//       return;
//     }

//     // 3️⃣ Validate subCategoryTitle
//     const titleCheck = validateTitle(data.subCategoryTitle);
//     if (!titleCheck.valid) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Title",
//         text: titleCheck.reason,
//       });
//       setError("subCategoryTitle", {
//         type: "manual",
//         message: titleCheck.reason,
//       });
//       return;
//     }

//     // 4️⃣ Validate Price
//     const priceCheck = validatePrice(data.price);
//     if (!priceCheck.valid) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Price",
//         text: priceCheck.reason,
//       });
//       setError("price", { type: "manual", message: priceCheck.reason });
//       return;
//     }

//     // 5️⃣ Upload Image
//     const imageFile = { image: data.subCategoryImage[0] };
//     const res = await axiosPublic.post(img_hosting_api, imageFile, {
//       headers: { "content-type": "multipart/form-data" },
//     });

//     const subCategoryItem = {
//       subCategoryName: nameCheck.formatted,
//       subCategoryTitle: titleCheck.formatted,
//       price: priceCheck.formatted,
//       subCategoryImage: res.data.data.display_url,
//       selectedCategoryItem: findSelectedcategory,
//     };

//     const subCategoryResponse = await axiosPublic.post(
//       "/subCategory",
//       subCategoryItem
//     );

//     if (
//       subCategoryResponse?.data?.acknowledged &&
//       subCategoryResponse?.data?.insertedId
//     ) {
//       navigate(
//         `/dashboard/addSubCategoryProduct/${subCategoryResponse.data.insertedId}`
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-full">
//       <div className="w-xl p-8 rounded-xl border">
//         <AddSubCategoryForm
//           onSubmit={onSubmit}
//           register={register}
//           errors={errors}
//           handleSubmit={handleSubmit}
//           isSubmitting={isSubmitting}
//           setValue={setValue}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddSubCategory;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import useCategory from "../../../hooks/useCategory";
// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useSubCategory from "../../../hooks/useSubCategory";
// import Swal from "sweetalert2";
// import AddSubCategoryForm from "./AddSubCategoryForm";

// const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

// const AddSubCategory = () => {
//   const navigate = useNavigate();
//   const [allCategorys] = useCategory();
//   const [allSubCategorys] = useSubCategory();
//   const [findSelectedcategory, setFindSelectedcategory] = useState(null);
//   const { id } = useParams();
//   const axiosPublic = useAxiosPublic();

//   const {
//     register,
//     handleSubmit,
//     setError,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   useEffect(() => {
//     const find = allCategorys?.find((f) => f._id === id);
//     setFindSelectedcategory(find);
//   }, [allCategorys, id]);

//   // Remove special chars & normalize
//   const cleanSpaces = (str) => str.replace(/\s+/g, " ").trim();
//  // const onlyLettersSpaces = (str) => /^[A-Za-z\s]+$/.test(str);
//   const onlyLettersSpaces = (str) => /^[A-Za-z\s]+$/.test(str);

//   const normalize = (str) => str.toLowerCase().replace(/[^a-z]/g, "");

//   const validateNameOrTitle = (value) => {
//     let cleaned = cleanSpaces(value);
//     if (!onlyLettersSpaces(cleaned)) {
//       return { valid: false, reason: "Only letters and spaces allowed" };
//     }
//     return { valid: true, formatted: cleaned };
//   };

//   const validatePrice = (value) => {
//     if (/\s/.test(value)) {
//       return { valid: false, reason: "No spaces allowed in price" };
//     }
//     if (!/^[1-9][0-9]*$/.test(value)) {
//       return {
//         valid: false,
//         reason: "Price must be a positive number without leading zero",
//       };
//     }
//     return { valid: true, formatted: value };
//   };

//   const onSubmit = async (data) => {
//     // 1️⃣ Duplicate check
//     const isDuplicate = allSubCategorys.some(
//       (item) =>
//         normalize(item.subCategoryName) === normalize(data.subCategoryName)
//     );
//     if (isDuplicate) {
//       Swal.fire({
//         icon: "error",
//         title: "Duplicate Sub Category",
//         html: `The sub category <b>${data.subCategoryName}</b> already exists.`,
//       });
//       setError("subCategoryName", {
//         type: "manual",
//         message: "Duplicate Sub Category Name",
//       });
//       return;
//     }

//     // 2️⃣ Validate Name
//     const nameCheck = validateNameOrTitle(data.subCategoryName);
//     if (!nameCheck.valid) {
//       setError("subCategoryName", {
//         type: "manual",
//         message: nameCheck.reason,
//       });
//       return;
//     }

//     // 3️⃣ Validate Title
//     const titleCheck = validateNameOrTitle(data.subCategoryTitle);
//     if (!titleCheck.valid) {
//       setError("subCategoryTitle", {
//         type: "manual",
//         message: titleCheck.reason,
//       });
//       return;
//     }

//     // 4️⃣ Validate Price
//     const priceCheck = validatePrice(data.price);
//     if (!priceCheck.valid) {
//       setError("price", { type: "manual", message: priceCheck.reason });
//       return;
//     }

//     // 5️⃣ Upload Image
//     const imageFile = { image: data.subCategoryImage[0] };
//     const res = await axiosPublic.post(img_hosting_api, imageFile, {
//       headers: { "content-type": "multipart/form-data" },
//     });

//     const subCategoryItem = {
//       subCategoryName: nameCheck.formatted,
//       subCategoryTitle: titleCheck.formatted,
//       price: priceCheck.formatted,
//       subCategoryImage: res.data.data.display_url,
//       selectedCategoryItem: findSelectedcategory,
//     };

//     const subCategoryResponse = await axiosPublic.post(
//       "/subCategory",
//       subCategoryItem
//     );

//     if (
//       subCategoryResponse?.data?.acknowledged &&
//       subCategoryResponse?.data?.insertedId
//     ) {
//       navigate(
//         `/dashboard/addSubCategoryProduct/${subCategoryResponse.data.insertedId}`
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-full">
//       <div className="w-xl p-8 rounded-xl border">
//         <AddSubCategoryForm
//           onSubmit={onSubmit}
//           register={register}
//           errors={errors}
//           handleSubmit={handleSubmit}
//           isSubmitting={isSubmitting}
//           setValue={setValue}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddSubCategory;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import useCategory from "../../../hooks/useCategory";
// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useSubCategory from "../../../hooks/useSubCategory";
// import Swal from "sweetalert2";
// import AddSubCategoryForm from "./AddSubCategoryForm";

// const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

// const AddSubCategory = () => {
//   const navigate = useNavigate();
//   const [allCategorys] = useCategory();
//   const [allSubCategorys] = useSubCategory();
//   const [findSelectedcategory, setFindSelectedcategory] = useState(null);
//   const { id } = useParams();
//   const axiosPublic = useAxiosPublic();

//   const {
//     register,
//     handleSubmit,
//     setError,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   useEffect(() => {
//     const find = allCategorys?.find((f) => f._id === id);
//     setFindSelectedcategory(find);
//   }, [allCategorys, id]);

//   // একাধিক স্পেস => single space, trim
//   const cleanSpaces = (str) => String(str).replace(/\s+/g, " ").trim();

//   // ডুপ্লিকেট চেকের জন্য নাম নম্বর বাদ দিয়ে lowercase
//   const normalize = (str) =>
//     String(str)
//       .toLowerCase()
//       .replace(/[^a-z]/g, "");

//   // subCategoryName: শুধু A-Z, a-z, space allowed; special chars disallowed
//   const nameAllowedRegex = /^[A-Za-z\s]+$/;

//   // subCategoryTitle: A-Z, a-z, 0-9, space, এবং নির্দিষ্ট স্পেশাল চিহ্ন allowed
//   const titleAllowedRegex = /^[A-Za-z0-9\s()%'":!\/\?.,&\-_]+$/;

//   // letters-only for case check (name & title)
//   const lettersOnly = (s) =>
//     String(s)
//       .replace(/[^A-Za-z\s]/g, "")
//       .replace(/\s+/g, " ")
//       .trim();

//   // case check helpers
//   const isAllLower = (s) => /^[a-z\s]+$/.test(s);
//   const isAllUpper = (s) => /^[A-Z\s]+$/.test(s);
//   //const isTitleCase = (s) => /^([A-Z][a-z]*)(\s[A-Z][a-z]*)*$/.test(s);
//   const onlyLettersSpaces = (s) => /^[A-Za-z\s]+$/.test(s);
//   // Validate subCategoryName
//   const validateName = (raw) => {
//     if (!nameAllowedRegex.test(raw)) {
//       return {
//         valid: false,
//         reason: "Invalid characters: Only letters (A-Z), (a-z)  ",
//       };
//     }
//     const cleaned = cleanSpaces(raw);
//     console.log(cleaned);
//     const letters = lettersOnly(cleaned);
//     if (!letters) {
//       return { valid: false, reason: "Name must contain at least one letter." };
//     }
//     //  || isTitleCase(letters)
//     if (!(isAllLower(letters) || isAllUpper(letters) || onlyLettersSpaces)) {
//       return {
//         valid: false,
//         reason:
//           "Invalid letter casing: Use all-lowercase, all-uppercase or Title Case.",
//       };
//     }
//     return { valid: true, formatted: cleaned };
//   };

//   // Validate subCategoryTitle
//   const validateTitle = (raw) => {
//     if (!titleAllowedRegex.test(raw)) {
//       return {
//         valid: false,
//         reason:
//           "Invalid characters in Title: Only letters, numbers, spaces, and ()%'\":!/?.,&-_ allowed.",
//       };
//     }
//     const cleaned = cleanSpaces(raw);
//     const letters = lettersOnly(cleaned);
//     if (!letters) {
//       return {
//         valid: false,
//         reason: "Title must contain at least one letter.",
//       };
//     }
//     if (
//       !(
//         isAllLower(letters) ||
//         isAllUpper(letters) ||
//         onlyLettersSpaces(letters)
//       )
//     ) {
//       return {
//         valid: false,
//         reason:
//           "Invalid letter casing in Title: Use all-lowercase, all-uppercase or Title Case.",
//       };
//     }
//     return { valid: true, formatted: cleaned };
//   };

//   // Validate price: no spaces, digits only, no leading zero
//   const validatePrice = (raw) => {
//     if (/\s/.test(raw)) {
//       return { valid: false, reason: "Price must not contain spaces." };
//     }
//     if (!/^[1-9][0-9]*$/.test(raw)) {
//       return {
//         valid: false,
//         reason: "Price must be a positive integer without leading zero.",
//       };
//     }
//     return { valid: true, formatted: raw };
//   };

//   const onSubmit = async (data) => {
//     // 1️⃣ Duplicate check first
//     const isDuplicate = allSubCategorys.some(
//       (item) =>
//         normalize(item.subCategoryName) === normalize(data.subCategoryName)
//     );
//     if (isDuplicate) {
//       Swal.fire({
//         icon: "error",
//         title: "Duplicate Sub Category",
//         html: `The sub category <b>${data.subCategoryName}</b> already exists.`,
//       });
//       setError("subCategoryName", {
//         type: "manual",
//         message: "Duplicate Sub Category Name",
//       });
//       return;
//     }

//     // 2️⃣ Validate subCategoryName
//     const nameCheck = validateName(data.subCategoryName);
//     if (!nameCheck.valid) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sub Category Name",
//         text: nameCheck.reason,
//       });
//       setError("subCategoryName", {
//         type: "manual",
//         message: nameCheck.reason,
//       });
//       return;
//     }

//     // 3️⃣ Validate subCategoryTitle
//     const titleCheck = validateTitle(data.subCategoryTitle);
//     if (!titleCheck.valid) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Sub Category Title",
//         text: titleCheck.reason,
//       });
//       setError("subCategoryTitle", {
//         type: "manual",
//         message: titleCheck.reason,
//       });
//       return;
//     }

//     // 4️⃣ Validate price
//     const priceCheck = validatePrice(data.price);
//     if (!priceCheck.valid) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Price",
//         text: priceCheck.reason,
//       });
//       setError("price", { type: "manual", message: priceCheck.reason });
//       return;
//     }

//     // 5️⃣ Upload Image (FormData)
//     if (!data.subCategoryImage || !data.subCategoryImage[0]) {
//       setError("subCategoryImage", {
//         type: "manual",
//         message: "Image is required",
//       });
//       return;
//     }
//     const formData = new FormData();
//     formData.append("image", data.subCategoryImage[0]);
//     const res = await axiosPublic.post(img_hosting_api, formData, {
//       headers: { "content-type": "multipart/form-data" },
//     });

//     const subCategoryItem = {
//       subCategoryName: nameCheck.formatted,
//       subCategoryTitle: titleCheck.formatted,
//       price: priceCheck.formatted,
//       subCategoryImage: res.data.data.display_url,
//       selectedCategoryItem: findSelectedcategory,
//     };
//     console.log(subCategoryItem);
//     // const subCategoryResponse = await axiosPublic.post(
//     //   "/subCategory",
//     //   subCategoryItem
//     // );

//     // if (
//     //   subCategoryResponse?.data?.acknowledged &&
//     //   subCategoryResponse?.data?.insertedId
//     // ) {
//     //   navigate(
//     //     `/dashboard/addSubCategoryProduct/${subCategoryResponse.data.insertedId}`
//     //   );
//     // }
//   };

//   return (
//     <div className="flex justify-center items-center h-full">
//       <div className="w-xl p-8 rounded-xl border">
//         <AddSubCategoryForm
//           onSubmit={onSubmit}
//           register={register}
//           errors={errors}
//           handleSubmit={handleSubmit}
//           isSubmitting={isSubmitting}
//           setValue={setValue}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddSubCategory;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//nodemon index.js
//

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useCategory from "../../../hooks/useCategory";
import useSubCategory from "../../../hooks/useSubCategory";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import AddSubCategoryForm from "./AddSubCategoryForm";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const AddSubCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Load categories and subcategories (your custom hooks)
  const [allCategorys] = useCategory();
  const [allSubCategorys] = useSubCategory();
  const axiosPublic = useAxiosPublic();

  // Find selected category by id
  const [findSelectedcategory, setFindSelectedcategory] = useState(null);
  console.log(findSelectedcategory);
  useEffect(() => {
    const category = allCategorys?.find((c) => c?._id === id);
    setFindSelectedcategory(category);
  }, [allCategorys, id]);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Normalize string: lower case and remove non-letters for duplicate check
  const normalize = (str) => str.toLowerCase().replace(/[^a-z]/g, "");

  // Validation functions similar to your pattern (simple)
  const validateName = (name) => {
    if (!/^[A-Za-z0-9\s]+$/.test(name)) {
      return {
        valid: false,
        reason: "Name can only contain letters and numbers.",
      };
    }
    return { valid: true, formatted: name.trim() };
  };

  // const validateTitle = (title) => {
  //   if (!/^[A-Za-z0-9\s()%&#'":!/?]+$/.test(title)) {
  //     return {
  //       valid: false,
  //       reason:
  //         "Title can only contain letters, numbers, spaces, and ()%&#'\":!?/ characters.",
  //     };
  //   }
  //   return { valid: true, formatted: title.trim() };
  // };

  // const validatePrice = (price) => {
  //   if (!/^[1-9][0-9]*$/.test(price)) {
  //     return {
  //       valid: false,
  //       reason: "Price must be a positive number without leading zero.",
  //     };
  //   }
  //   return { valid: true, formatted: price.trim() };
  // };
  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // onSubmit handler
  const onSubmit = async (data) => {
    // 1. Duplicate check for subCategoryName
    // const duplicate = allSubCategorys.some(
    //   (item) =>
    //     normalize(item.subCategoryName) === normalize(data.subCategoryName)
    // );
    const duplicate = allSubCategorys?.some(
      (item) =>
        item?.selectedCategoryItem?._id === findSelectedcategory?._id && // Match category
        normalize(item?.subCategoryName) === normalize(data?.subCategoryName) // Match name
    );
    if (duplicate) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Sub Category",
        html: `The sub category <b>${data.subCategoryName}</b> already exists.`,
      });
      setError("subCategoryName", {
        type: "manual",
        message: "Duplicate sub category name",
      });
      return;
    }

    // 2. Validate Name, Title, Price
    const nameCheck = validateName(data.subCategoryName);
    if (!nameCheck.valid) {
      setError("subCategoryName", {
        type: "manual",
        message: nameCheck.reason,
      });
      return;
    }

    // const titleCheck = validateTitle(data.subCategoryTitle);
    // if (!titleCheck.valid) {
    //   setError("subCategoryTitle", {
    //     type: "manual",
    //     message: titleCheck.reason,
    //   });
    //   return;
    // }

    // const priceCheck = validatePrice(data.price);
    // if (!priceCheck.valid) {
    //   setError("price", { type: "manual", message: priceCheck.reason });
    //   return;
    // }

    // 3. Check if image uploaded
    if (!data.subCategoryImage || data.subCategoryImage.length === 0) {
      setError("subCategoryImage", {
        type: "manual",
        message: "Image is required",
      });
      return;
    }

    // 4. Upload image to imgbb
    const formData = new FormData();
    formData.append("image", data.subCategoryImage[0]);

    let imgResponse;
    try {
      imgResponse = await axiosPublic.post(img_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      Swal.fire("Error", "Image upload failed, try again.", { error });
      return;
    }

    // 5. Prepare subcategory data
    const subCategoryItem = {
      subCategoryName: capitalizeFirstLetter(nameCheck.formatted),
      // subCategoryTitle: titleCheck.formatted,
      // price: priceCheck.formatted,
      subCategoryImage: imgResponse.data.data.display_url,
      selectedCategoryItem: findSelectedcategory,
    };
    console.log(subCategoryItem);
    // 6. Post subcategory to backend
    try {
      const res = await axiosPublic.post("/subCategory", subCategoryItem);

      if (res?.data?.acknowledged && res?.data?.insertedId) {
        reset();
        Swal.fire("Success", "Sub Category added!", "success");
        navigate(`/dashboard/addSubCategoryProduct/${res.data.insertedId}`);
      } else {
        Swal.fire("Error", "Failed to add sub category.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error occurred.", "error");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-xl p-8 rounded-xl border">
        <AddSubCategoryForm
          onSubmit={onSubmit}
          // register={register}
          findSelectedcategory={findSelectedcategory}
        // errors={errors}
        // handleSubmit={handleSubmit}
        // isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AddSubCategory;
