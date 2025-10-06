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
  // handle make admin
  const handleMakeAdmin = (user) => {
    ////////////////////

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        html: `You won't to add this email : 
       <b> ${user.email}</b>
        for a new admin !`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Admin!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
            console.log(res.data);
            if (res?.data?.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                html: `<b>${user.email}</b> is an admain now`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });

    ////////////////////////////

    // .catch((err) => {
    //   console.error(err);
    // });
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
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>User</th>

            <th>Role</th>
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
                {
                  user.role === "Admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-[#D1A054] text-white hover:bg-black text-xl"
                    >
                      <FaUsers></FaUsers>
                    </button>
                  )
                  //"User"
                }
                {/* <input
                  type="checkbox"
                  checked={user.role === "Admin"}
                  onClick={() => handleMakeAdmin(user)}
                  className="toggle toggle-success"
                /> */}
              </td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="btn bg-red-600 text-white hover:bg-black"
                >
                  <FaTrashAlt></FaTrashAlt>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
