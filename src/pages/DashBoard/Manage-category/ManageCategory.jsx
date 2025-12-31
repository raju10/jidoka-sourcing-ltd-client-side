import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useCategory from "../../../hooks/useCategory";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AddCategoryForm from "./AddCategoryForm";

const MySwal = withReactContent(Swal);

// imgbb api
const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const ManageCategory = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [allCategorys, refetch] = useCategory();
    const [searchTerm, setSearchTerm] = useState("");

    // -------------------- VIEW --------------------
    const handleViewCategory = (item) => {
        Swal.fire({
            title: `<span class="text-2xl font-bold text-[#41a28e]">${item.categoryName}</span>`,
            html: `
        <div class="text-center p-4">
          <img src="${item.categoryImage}" alt="${item.categoryName}" class="w-full max-w-[300px] h-[300px] object-cover rounded-xl shadow-lg border border-gray-200 mx-auto mb-4" />
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-4">
            <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Category ID</p>
            <p class="font-mono text-gray-700 font-bold">${item._id}</p>
          </div>
        </div>
      `,
            showCloseButton: true,
            confirmButtonText: "Close",
            confirmButtonColor: "#41a28e",
        });
    };

    // -------------------- DELETE --------------------
    const handleDeleteCategory = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete the category "${item.categoryName}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/category/${item._id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Deleted!", "Category has been deleted.", "success");
                    }
                } catch (error) {
                    console.error("Delete Error:", error);
                    Swal.fire("Error", "Could not delete category.", "error");
                }
            }
        });
    };

    // -------------------- ADD / EDIT SUBMIT --------------------
    const handleFormSubmit = async (data, isEdit = false, originalItem = null) => {
        try {
            let imageUrl = originalItem?.categoryImage;

            // Image upload if new image selected
            if (data.categoryImage && data.categoryImage[0] instanceof File) {
                const imageFile = new FormData();
                imageFile.append("image", data.categoryImage[0]);
                const res = await axiosPublic.post(img_hosting_api, imageFile, {
                    headers: { "content-type": "multipart/form-data" },
                });
                imageUrl = res.data.data.display_url;
            }

            const categoryData = {
                categoryName: data.categoryName,
                categoryImage: imageUrl,
            };

            let response;
            if (isEdit) {
                response = await axiosSecure.put(`/category/${originalItem._id}`, categoryData);
            } else {
                response = await axiosSecure.post("/category", categoryData);
            }

            if (response.data.insertedId || response.data.modifiedCount > 0) {
                refetch();
                MySwal.close();
                Swal.fire({
                    icon: "success",
                    title: `Category ${isEdit ? "Updated" : "Added"}!`,
                    text: `"${data.categoryName}" has been ${isEdit ? "updated" : "added"} successfully.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Form Submit Error:", error);
            Swal.fire("Error", `Could not ${isEdit ? "update" : "add"} category.`, "error");
        }
    };

    // -------------------- SHOW FORMS --------------------
    const showAddModal = () => {
        MySwal.fire({
            title: "Add New Category",
            html: <AddCategoryForm onSubmit={(data) => handleFormSubmit(data)} />,
            showConfirmButton: false,
            showCancelButton: true,
            width: "500px",
        });
    };

    const showEditModal = (item) => {
        MySwal.fire({
            title: "Edit Category",
            html: (
                <AddCategoryForm
                    onSubmit={(data) => handleFormSubmit(data, true, item)}
                    defaultValues={item}
                />
            ),
            showConfirmButton: false,
            showCancelButton: true,
            width: "500px",
        });
    };

    // -------------------- SEARCH LOGIC --------------------
    const filteredCategories = allCategorys?.filter((cat) =>
        cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 mx-4 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">Manage Categories</h2>
                <div className="flex gap-4 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full md:w-64 focus:border-[#41a28e]"
                    />
                    <button onClick={showAddModal} className="btn bg-[#41a28e] text-white border-none hover:bg-[#348e7b]">
                        <FaPlus className="mr-2" /> Add Category
                    </button>
                </div>
            </div>

            <div className=" border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="rounded-tl-xl">#</th>
                            <th>Image</th>
                            <th>Category Name</th>
                            <th className="text-center rounded-tr-xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories?.length > 0 ? (
                            filteredCategories.map((item, index) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="font-medium text-gray-500">{index + 1}</td>
                                    <td>
                                        <img
                                            src={item.categoryImage}
                                            alt={item.categoryName}
                                            className="w-16 h-16 rounded-lg object-cover shadow-sm border border-gray-100"
                                        />
                                    </td>
                                    <td>
                                        <p className="font-bold text-gray-700 text-lg">{item.categoryName}</p>
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => handleViewCategory(item)}
                                                className="btn btn-sm bg-[#41a28e] text-white hover:bg-black border-none px-4"
                                                title="View Details"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => showEditModal(item)}
                                                className="btn btn-sm bg-[#D1A054] text-white hover:bg-black border-none px-4"
                                                title="Edit Category"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(item)}
                                                className="btn btn-sm bg-red-600 text-white hover:bg-black border-none px-4"
                                                title="Delete Category"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-10 text-gray-400 font-medium text-lg">
                                    No categories found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCategory;