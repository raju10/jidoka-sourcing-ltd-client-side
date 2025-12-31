import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // old way
      // const res = await axiosSecure.get("/users", {
      //   headers: {
      //     authorization: `Bearer ${localStorage.getItem("access-token")}`,
      //   },
      // });

      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // handle update role
  const handleUpdateRole = (user, newRole) => {
    if (user.role === newRole) return;

    Swal.fire({
      title: "Are you sure?",
      html: `You want to change <b>${user.email}</b>'s role to <b>${newRole}</b>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, make ${newRole}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`, { role: newRole }).then((res) => {
          if (res?.data?.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Role updated!`,
              html: `<b>${user.email}</b> is now a <b>${newRole}</b>`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      } else {
        // If cancelled, reset the dropdown if needed (refetch will do it)
        refetch();
      }
    });
  };

  // delete user
  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wan't to be delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${userId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-evenly my-4">
        {" "}
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users : {users.length}</h2>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User Details</th>
              <th>Current Role</th>
              <th>Change Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td>
                  <div className="">
                    <p>
                      <b>Name : </b>
                      {user.name}{" "}
                    </p>
                    <p>
                      <b>Email : </b>
                      {user.email}{" "}
                    </p>
                  </div>
                </td>
                <td>
                  <span className={`badge ${user.role === 'Admin' ? 'badge-primary' : 'badge-ghost'}`}>
                    {user.role || 'User'}
                  </span>
                </td>
                <td>
                  <select
                    defaultValue={user.role || "User"}
                    className="select select-bordered select-sm w-full max-w-xs"
                    onChange={(e) => handleUpdateRole(user, e.target.value)}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-ghost btn-sm bg-red-600 text-white hover:bg-black"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
