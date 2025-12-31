import { useForm } from "react-hook-form";

const AddCategoryForm = ({
    onSubmit,
    defaultValues,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: defaultValues || {},
    });

    return (
        <form className="text-start p-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                {defaultValues ? "Edit Category" : "Add Category"}
            </h2>

            {/* Category Name */}
            <div className="mb-6">
                <label className="block mb-1 text-gray-700 font-medium">Category Name</label>
                <input
                    type="text"
                    {...register("categoryName", {
                        required: "Category Name is required",
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.categoryName
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-[#41a28e]"
                        }`}
                    placeholder="Enter Category Name"
                    autoComplete="off"
                />
                {errors.categoryName && (
                    <p className="text-red-500 text-sm mt-1">{errors.categoryName.message}</p>
                )}
            </div>

            {/* Image Upload */}
            <div className="mb-6">
                <label className="block mb-1 text-gray-700 font-medium">Category Image</label>
                <input
                    type="file"
                    {...register("categoryImage", { required: !defaultValues })}
                    className="file-input file-input-bordered file-input-primary w-full"
                    accept="image/*"
                />
                {errors.categoryImage && (
                    <span className="text-red-500 text-sm block mt-1">Please select an image file</span>
                )}
                {defaultValues?.categoryImage && (
                    <p className="mt-2 text-xs text-gray-500 italic">Current image: {defaultValues.categoryImage.split('/').pop()}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn bg-[#41a28e] border-none text-white hover:bg-[#348e7b] font-semibold transition-all duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
            >
                {isSubmitting ? "Processing..." : defaultValues ? "Update Category" : "Add Category"}
            </button>
        </form>
    );
};

export default AddCategoryForm;
