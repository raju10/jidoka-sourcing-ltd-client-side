import { Outlet, useLocation } from "react-router";
import SideNav from "./SideNav";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const location = useLocation();
  console.log(location);
  //     get isAdmain value from the database

  //   const links = (
  //     <>
  //       <Link to="/dashboard/addCategory">Add Category</Link>,
  //       <Link to="/dashboard/addSubCategory">Add Sub-Category</Link>
  //     </>
  //   );
  return (
    <div className="flex min-h-full">
      {/* <div className="w-64 min-h-screen bg-amber-500 text-white text-lg list-none text-start pl-2 "> */}
      {/* <li>
          <Link to="/dashboard/addCategory">Add Category</Link>
        </li> */}
      {/*  */}
      {/* <li>
          <Link to="/dashboard/addSubCategory/:id">Add Sub-Category</Link>
        </li>
        <li>
          <Link to="/dashboard/addSubCategoryProduct/:id">Add Product</Link>
        </li> */}
      {/*  */}
      {/* <li>
          <Link to="/dashboard/manageSubCategorys">Mannage Sub-Category</Link>
        </li>
        <li>
          <Link to="/dashboard/manageProducts">Manage Products</Link>
        </li> */}

      <SideNav></SideNav>

      {/* </div> */}
      <div className="ml-50 flex-1 min-h-screen p-5 bg-gray-100 overflow-y-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
