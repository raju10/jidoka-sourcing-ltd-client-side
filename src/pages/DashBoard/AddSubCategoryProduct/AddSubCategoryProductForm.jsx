import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const sizeOptions = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
];

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

// Random code generator
const generateRandomCode = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++)
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
};

const AddSubCategoryProductForm = ({
  subCategorySelectItem,
  subCatIdFiltaringProducts,
  allSubCategorys,
  allProducts,
  // onSubmit
}) => {
  const axiosPublic = useAxiosPublic();
  const [productCode, setProductCode] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [affordableStatus, setAffordableStatus] = useState("disable");
  console.log("subCategorySelectItem", subCategorySelectItem);
  console.log("subCatIdFiltaringProducts", subCatIdFiltaringProducts);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => setProductCode(generateRandomCode()), []);

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

  // Local state for form dropdown
  const [selectedFormCategory, setSelectedFormCategory] = useState("");
  console.log(selectedFormCategory);
  const handleFormSelectChange = (e) => {
    setSelectedFormCategory(e.target?.value);
  };
  /////////////
  const onSubmit = async (data) => {
    console.log(data);
    const { parentCategory, ...filteredData } = data;
    try {
      // 1. Duplicate check for subCategoryName
      const duplicate = allProducts?.some(
        (item) => normalize(item.productTitle) === normalize(data.productTitle)
      );
      if (duplicate) {
        Swal.fire({
          icon: "error",
          title: "Duplicate product",
          html: `The Product <b>${data?.productTitle}</b> already exists.`,
        });
        setError("productTitle", {
          type: "manual",
          message: "Duplicate productTitle name",
        });
        return;
      }

      // 2. Validate Name, Title, Price
      const nameCheck = validateName(data?.productTitle);
      if (!nameCheck.valid) {
        setError("productTitle", {
          type: "manual",
          message: nameCheck.reason,
        });
        return;
      }
      // image upload
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(img_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });
      // product data validation or add to data base
      let subCategoryItem;
      let categoryItem;

      if (location?.pathname === "/dashboard/manageProducts") {
        // category যেটা dropdown থেকে আসবে সেটাকে object বানানো
        const selectedSubCategoryItems = JSON.parse(parentCategory);
        (subCategoryItem = { ...selectedSubCategoryItems }),
          (categoryItem = subCategoryItem.selectedCategoryItem);
      } else {
        subCategoryItem = { ...subCategorySelectItem };
        categoryItem = subCategoryItem.selectedCategoryItem;
      }
      // delete nested property
      // delete data.parentCategory;
      const productItem = {
        ...filteredData,

        productCode,
        size: selectedSizes.map((item) => item.value),
        price: parseFloat(data.price),
        discount: parseFloat(data.discount),
        noOfQuantity: parseFloat(data.noOfQuantity),
        mostAffordable: affordableStatus,
        image: res.data.data.display_url,
        subCategoryItem: {
          subCategoryImage: subCategoryItem.subCategoryImage,
          subCategoryName: subCategoryItem.subCategoryName,
          subCategoryID: subCategoryItem._id,
        },
        categoryItem,
      };

      const productResponse = await axiosPublic.post("/product", productItem);
      console.log(productResponse);
      reset();
      setSelectedSizes([]);
      setAffordableStatus("disable");
      setProductCode(generateRandomCode());

      if (productResponse.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error submitting subcategory:", error);
      Swal.fire({
        icon: "error",
        title: `Something went wrong! ${error}`,
        text: "Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-start">
      {/* Category Dropdown */}
      {location?.pathname === "/dashboard/manageProducts" && (
        <>
          <div className="p-4 max-w-md ">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Select Sub Category
            </label>
            <select
              {...register("parentCategory", {
                required: "Please select a category",
              })}
              value={selectedFormCategory}
              onChange={handleFormSelectChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              defaultValue=""
            >
              <option value="">-- Choose Sub Category --</option>
              {allSubCategorys?.map((cat) => (
                <option key={cat._id} value={JSON.stringify(cat)}>
                  {cat.subCategoryName}
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
      )}

      {/* Product Code (readonly) */}
      <div>
        <label className="block mb-1 font-medium">Product Code</label>
        <input
          type="text"
          disabled
          value={productCode}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
        />
      </div>

      {/* Product Title */}
      <div>
        <label className="block mb-1 font-medium">Product Title</label>
        <input
          type="text"
          {...register("productTitle", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter product title"
        />
        {errors.productTitle && (
          <p className="text-red-500 text-sm">Product title is required</p>
        )}
      </div>

      {/* Material */}
      <div>
        <label className="block mb-1 font-medium">Material</label>
        <input
          type="text"
          {...register("material", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter material"
        />
        {errors.material && (
          <p className="text-red-500 text-sm">Material is required</p>
        )}
      </div>
      {/* 🔴 Radio Button: Most Affordable */}
      <div>
        <label className="block mb-1 font-medium">🔴 Most Affordable !!!</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="disable"
              checked={affordableStatus === "disable"}
              onChange={(e) => setAffordableStatus(e.target.value)}
            />
            Disable
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="enable"
              checked={affordableStatus === "enable"}
              onChange={(e) => setAffordableStatus(e.target.value)}
            />
            Enable
          </label>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price (৳)</label>
          <input
            type="number"
            {...register("price", {
              required:
                affordableStatus === "enable" ? "Price is required" : false,
              min: { value: 1, message: "Minimum Price must be 1" },
              pattern: {
                value: /^(?:[1-9][0-9]*)$/, // no leading 0, must be positive integer
                message: "Price must, not start with 0",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder={
              affordableStatus === "disable"
                ? "Enter price (optional)"
                : "Enter price (required)"
            }
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Discount */}
        {/* <div>
          <label className="block mb-1 font-medium">Discount (%)</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            {...register("discount", {
              required: "Discount is required",
              min: { value: 1, message: "Minimum discount is 1%" },
              max: { value: 100, message: "Maximum discount is 100%" },
            })}
            placeholder="Enter discount %"
            min={1}
            max={100}
          />

          {errors.discount && (
            <p style={{ color: "red" }}>{errors.discount.message}</p>
          )}
        </div> */}

        {/* Discount */}
        <div>
          <label className="block mb-1 font-medium">Discount (%)</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            {...register("discount", {
              validate: (value) => {
                if (!value) return true; // ✅ allow empty (optional)
                if (value < 1) return "Minimum discount is 1%";
                if (value > 100) return "Maximum discount is 100%";
                return true;
              },
            })}
            placeholder="Enter discount % (optional)"
            min={1}
            max={100}
          />

          {errors.discount && (
            <p style={{ color: "red" }}>{errors.discount.message}</p>
          )}
        </div>
      </div>
      {/* No of quantity */}
      <div>
        <label className="block mb-1 font-medium">No of quantity</label>
        <input
          type="number"
          {...register("noOfQuantity", {
            required:
              affordableStatus === "enable" ? "Quantity is required" : false,
            min: { value: 1, message: "Minimum Quantity must be 1" },
            pattern: {
              value: /^(?:[1-9][0-9]*)$/, // no leading 0, must be positive integer
              message: "Quantity must, not start with 0",
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder={
            affordableStatus === "disable"
              ? "Enter Quantity (optional)"
              : "Enter Quantity (required)"
          }
        />
        {errors.noOfQuantity && (
          <p className="text-red-500 text-sm">{errors.noOfQuantity.message}</p>
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-3">
        {" "}
        {/* Size MultiSelect */}
        <div>
          <label className="block mb-1 font-medium">Sizes</label>
          <MultiSelect
            options={sizeOptions}
            value={selectedSizes}
            onChange={setSelectedSizes}
            labelledBy="Select Sizes"
            className="w-full"
            overrideStrings={{
              selectSomeItems:
                affordableStatus === "disable"
                  ? "Select sizes (optional)"
                  : "Select sizes (required)",
            }}
          />
          {affordableStatus === "enable" && selectedSizes.length === 0 && (
            <p className="text-red-500 text-sm mt-1">
              At least one size is required
            </p>
          )}
        </div>
        {/* Color */}
        <div>
          <label className="block mb-1 font-medium">Color</label>
          <input
            type="text"
            {...register("color")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter color (optional)"
          />
          {/* {errors.color && (
            <p className="text-red-500 text-sm">Color is required</p>
          )} */}
        </div>
      </div>
      {/* Image Upload */}
      <div>
        <label className="block mb-1 font-medium">Product Image</label>
        <input
          type="file"
          {...register("image", { required: true })}
          accept="image/*"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">Image is required</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          {...register("description", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
          placeholder="Enter product description"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">Description is required</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <input
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Submitting..." : "Add Product"}
          className="w-full btn bg-blue-500 mt-4 text-white hover:bg-blue-600 font-semibold"
        />
      </div>
    </form>
  );
};

export default AddSubCategoryProductForm;
