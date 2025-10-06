import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router";
import {
  FaFolderPlus,
  FaBoxes,
  FaThList,
  FaChevronDown,
  FaChevronRight,
  FaTasks,
  FaHome,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";

const SideNav = () => {
  const [isManageOpen, setIsManageOpen] = useState(false);
  const location = useLocation();
  const [isAdmain] = useAdmin();
  console.log(isAdmain);
  const isActive = (path) =>
    location.pathname === path ? "bg-gray-800 text-yellow-400" : "";
  return (
    <div className="fixed h-screen w-50 bg-gray-900 text-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        🛠 My Admin
      </div>
      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {isAdmain && (
          <div className="">
            {/* Admin Home */}
            <Link
              to="/dashboard/adminHome"
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                "/dashboard/adminHome"
              )}`}
            >
              <FaHome /> Admin Home
            </Link>
            {/* All Users */}
            <Link
              to="/dashboard/allUsers"
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                "/dashboard/allUsers"
              )}`}
            >
              <FaUsers /> All Users
            </Link>
            {/* Add Category */}
            <Link
              to="/dashboard/addCategory"
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                "/dashboard/addCategory"
              )}`}
            >
              <FaFolderPlus /> Add Category
            </Link>

            {/* Manage (Dropdown) */}
            <div>
              <button
                onClick={() => setIsManageOpen(!isManageOpen)}
                className="flex justify-between items-center w-full p-2 rounded-lg hover:bg-gray-800 transition"
              >
                <span className="flex items-center gap-2">
                  <FaTasks /> Manage
                </span>
                {isManageOpen ? <FaChevronDown /> : <FaChevronRight />}
              </button>

              {/* Sub menu */}
              <AnimatePresence>
                {isManageOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-6 mt-2 space-y-1 overflow-hidden"
                  >
                    <li>
                      <Link
                        to="/dashboard/manageSubCategorys"
                        className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                          "/dashboard/manageSubCategorys"
                        )}`}
                      >
                        <FaThList /> Manage Sub Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/manageProducts"
                        className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                          "/dashboard/manageProducts"
                        )}`}
                      >
                        <FaBoxes /> Manage Products
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        <div className="">
          <div className="divider my-10  text-gray-400 before:bg-white after:bg-white">
            or
          </div>
          <Link
            to="/"
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
              "/"
            )}`}
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/contact"
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
              "/contact"
            )}`}
          >
            <FaEnvelope /> Contact
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
