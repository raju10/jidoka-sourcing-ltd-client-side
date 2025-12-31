import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router";
import logo from "../../assets/logo/final-logo.jpeg";
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
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";

const SideNav = () => {
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [isAdmin] = useAdmin();

  const isActive = (path) =>
    location.pathname === path ? "bg-gray-800 text-yellow-400" : "";

  return (
    <>
      {/* 🌐 Top Navbar (mobile only) */}
      <div className="fixed top-0 left-0 w-full bg-gray-900 text-white flex items-center justify-between p-4 shadow-md z-50 lg:hidden">
        <div className="font-bold text-xl flex items-center gap-2">
          <NavLink to="/">
            <img
              src={logo}
              alt=""
              className="w-17 h-full  object-cover xl:ml-35"
            />
          </NavLink>
        </div>

        {/* Toggle ↔ Cross button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-800 transition"
        >
          {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* 🌙 Sidebar (mobile animated, lg static) */}
      <div className="lg:flex">
        {/* Sidebar for mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.aside
                key="mobileSidebar"
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                exit={{ x: -250 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg flex flex-col z-40 lg:hidden"
              >
                <div className="p-4 text-2xl font-bold border-b border-gray-700 flex justify-between items-center">
                  {/* <NavLink to="/">
                    <img
                      src={logo}
                      alt=""
                      className="w-17 h-full  object-cover xl:ml-35"
                    />
                  </NavLink> */}
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-gray-300 hover:text-yellow-400"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Menu */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                  {isAdmin && (
                    <div className="pt-10">
                      <Link
                        to="/dashboard/adminHome"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                          "/dashboard/adminHome"
                        )}`}
                      >
                        <FaHome /> Admin Home
                      </Link>

                      <Link
                        to="/dashboard/allUsers"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                          "/dashboard/allUsers"
                        )}`}
                      >
                        <FaUsers /> All Users
                      </Link>

                      <Link
                        to="/dashboard/addCategory"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                          "/dashboard/addCategory"
                        )}`}
                      >
                        <FaFolderPlus /> Add Category
                      </Link>

                      {/* Manage Dropdown */}
                      <div>
                        <button
                          onClick={() => setIsManageOpen(!isManageOpen)}
                          className="flex justify-between items-center w-full p-2 rounded-lg hover:bg-gray-800 transition"
                        >
                          <span className="flex items-center gap-2">
                            <FaTasks /> Manage
                          </span>
                          {isManageOpen ? (
                            <FaChevronDown />
                          ) : (
                            <FaChevronRight />
                          )}
                        </button>

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
                                  to="/dashboard/manageCategorys"
                                  onClick={() => setIsSidebarOpen(false)}
                                  className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                                    "/dashboard/manageCategorys"
                                  )}`}
                                >
                                  <FaThList /> Manage Category
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/dashboard/manageSubCategorys"
                                  onClick={() => setIsSidebarOpen(false)}
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
                                  onClick={() => setIsSidebarOpen(false)}
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

                  {/* Divider */}
                  <div className="divider my-10 text-gray-400 before:bg-white after:bg-white">
                    or
                  </div>

                  <Link
                    to="/"
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                      "/"
                    )}`}
                  >
                    <FaHome /> Home
                  </Link>

                  <Link
                    to="/contactUs"
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                      "/contactUs"
                    )}`}
                  >
                    <FaEnvelope /> Contact
                  </Link>
                </nav>
              </motion.aside>

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black lg:hidden z-30"
              />
            </>
          )}
        </AnimatePresence>

        {/* Sidebar for large screen */}
        <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg flex-col">
          <div className="p-4 text-2xl font-bold border-b border-gray-700">
            <NavLink to="/">
              <img src={logo} alt="" className="w-17 h-full  object-cover " />
            </NavLink>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {isAdmin && (
              <div className="">
                <Link
                  to="/dashboard/adminHome"
                  className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                    "/dashboard/adminHome"
                  )}`}
                >
                  <FaHome /> Admin Home
                </Link>

                <Link
                  to="/dashboard/allUsers"
                  className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                    "/dashboard/allUsers"
                  )}`}
                >
                  <FaUsers /> All Users
                </Link>

                <Link
                  to="/dashboard/addCategory"
                  className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                    "/dashboard/addCategory"
                  )}`}
                >
                  <FaFolderPlus /> Add Category
                </Link>

                {/* Manage Dropdown */}
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
                            to="/dashboard/manageCategorys"
                            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                              "/dashboard/manageCategorys"
                            )}`}
                          >
                            <FaThList /> Manage Category
                          </Link>
                        </li>
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

            <div className="divider my-10 text-gray-400 before:bg-white after:bg-white">
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
              to="/contactUs"
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                "/contactUs"
              )}`}
            >
              <FaEnvelope /> Contact
            </Link>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default SideNav;
