import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { IoCartOutline } from "react-icons/io5";
import logo from "../../assets/logo/final-logo.jpeg";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  // console.log(isAdmin);
  const [cart] = useCart();
  // console.log(cart);
  const handleLogOut = () => {
    logOut()
      .then(() => console.log("log out Successfully"))
      .catch((err) => console.log(err));
  };

  const activeLink = "bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-300";
  const normalLink = "text-gray-300 hover:text-white px-4 py-2 rounded-md font-medium transition-all duration-300";

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/categories"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          Categories
        </NavLink>
      </li>
      {isAdmin && (
        <li>
          <NavLink
            to="/dashboard/addCategory"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            Add Category
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contactUs"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          Contact Us
        </NavLink>
      </li>
      {user ? (
        <li>
          <button
            onClick={handleLogOut}
            className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md font-medium transition-all duration-300 cursor-pointer ml-0 lg:ml-2 mt-2 lg:mt-0"
          >
            LogOut
          </button>
        </li>
      ) : (
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? activeLink : normalLink) + " ml-0 lg:ml-2"}
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-sm text-white shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Navbar Start: Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost p-0 min-h-0 h-auto hover:bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-zinc-900 text-white rounded-xl z-50 mt-4 w-64 p-4 shadow-2xl border border-gray-800 gap-2"
            >
              {links}
            </ul>
          </div>
          <NavLink to="/" className="flex items-center">
            <img
              src={logo}
              alt="logo"
              className="w-12 sm:w-15 h-full object-cover rounded-md"
            />
          </NavLink>
        </div>

        {/* Navbar Center: Desktop Links */}
        <div className="hidden lg:flex items-center">
          <ul className="menu menu-horizontal px-1 items-center gap-2">
            {links}
          </ul>
        </div>

        {/* Navbar End: Icons & Profile */}
        <div className="flex items-center gap-3">
          {user && (
            <NavLink to="/cart" className="relative p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <IoCartOutline className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-black">
                  {cart.length}
                </span>
              )}
            </NavLink>
          )}
          {user && (
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-xs text-gray-400">Welcome,</p>
                <p className="text-sm font-medium truncate max-w-[100px]">{user?.displayName || "User"}</p>
              </div>
              <img
                src={user?.photoURL || "https://i.ibb.co/mJR9nxW/user.png"}
                alt="user profile"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-700 object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
