import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router";
import useCategory from "../../../hooks/useCategory";
import Swal from "sweetalert2";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const AddCategory = () => {
  const navigate = useNavigate();
  const [allCategorys] = useCategory();
  console.log(allCategorys);
  // img upload to imgbb and then get an url

  const axiosPublic = useAxiosPublic();
  //console.log(axiosPublic);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  // duplicatte test or some validation add

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

  /////
  const onSubmit = async (data) => {
    // 1. Duplicate check for CategoryName
    const duplicate =
      allCategorys.length > 0 &&
      allCategorys.some(
        (item) => normalize(item.categoryName) === normalize(data.categoryName)
      );
    if (duplicate) {
      Swal.fire({
        icon: "error",
        title: "Duplicate  Category",
        html: `This Category <b>${data.categoryName}</b> already exists.`,
      });
      setError("categoryName", {
        type: "manual",
        message: "Duplicate Category name",
      });
      return;
    }
    // 2. Validate  productTitle,
    const nameCheck = validateName(data.categoryName);
    if (!nameCheck.valid) {
      setError("categoryName", {
        type: "manual",
        message: nameCheck.reason,
      });
      return;
    }
    // img upload to imgbb and then get an url
    const imageFile = { image: data.categoryImage[0] };

    const res = await axiosPublic.post(img_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    //console.log("res", res);

    const categoryItem = {
      ...data,
      categoryImage: res.data.data.display_url,
    };

    const categoryResponse = await axiosPublic.post("/category", categoryItem);

    const insertedId = categoryResponse?.data?.insertedId;
    console.log("insertedId", insertedId);
    if (categoryResponse?.data?.acknowledged === true && insertedId) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      return navigate(`/dashboard/addSubCategory/${insertedId}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-xl  p-8 rounded-xl border">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Category Add
          </h2>

          {/* Category Name Field */}
          <div className="mb-6">
            <label className="block mb-1 text-gray-700">Category Name</label>
            <input
              type="text"
              {...register("categoryName", {
                required: "categoryName is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Category Name"
            />
            {errors.categoryName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryName.message}
              </p>
            )}
          </div>

          {/* Category img Field */}
          <div className="mb-6">
            <label className="block mb-1 text-gray-700">Category Image</label>
            <input
              type="file"
              {...register("categoryImage", { required: true })}
              className="mb-2 file-input file-input-ghost"
            />
            {errors.categoryImage && (
              <span className="text-red-500 text-sm block">
                Please upload a file
              </span>
            )}
          </div>

          {/* submit btn */}
          {/* <Link to={`/dashboard/addSubCategory/${creacteCategoryId}`}> */}
          <input
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Submitting..." : "Add Category"}
            className="w-full btn bg-blue-500 mt-4 text-white hover:bg-blue-600 font-semibold"
          />
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
