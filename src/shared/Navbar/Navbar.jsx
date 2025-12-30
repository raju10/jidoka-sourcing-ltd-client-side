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
  console.log(isAdmin);
  const [cart] = useCart();
  console.log(cart);
  const handleLogOut = () => {
    logOut()
      .then(() => console.log("log out Successfully"))
      .catch((err) => console.log(err));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-blue-500 text-white px-3 py-1 rounded-sm" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "bg-blue-500 text-white px-3 py-1 rounded-sm" : ""
          }
        >
          Shop
        </NavLink>
      </li>
      {isAdmin && (
        <li>
          <NavLink
            to="/dashboard/addCategory"
            className={({ isActive }) =>
              isActive ? "bg-blue-500 text-white px-3 py-1 rounded-sm" : ""
            }
          >
            Add Category
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            isActive ? "bg-blue-500 text-white px-3 py-1 rounded-sm" : ""
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contactUs"
          className={({ isActive }) =>
            isActive ? "bg-blue-500 text-white px-3 py-1 rounded-sm" : ""
          }
        >
          Contact Us
        </NavLink>
      </li>
      {user ? (
        <li
          onClick={handleLogOut}
          className="bg-orange-500 text-white py-1 px-3 rounded-sm hover:bg-black cursor-pointer ml-2"
        >
          LogOut
        </li>
      ) : (
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "bg-blue-500 text-white px-3 py-1 rounded-sm ml-2" : "ml-2"
            }
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );


  return (
    <div className="fixed top-0 z-100 navbar bg-black text-white shadow-sm ">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black text-white rounded-box z-1 mt-3 w-52 p-2 shadow "
          >
            {links}
          </ul>
        </div>
        <NavLink to="/">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-full md:w-17 object-cover xl:ml-35 lg:ml-20"
          />
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center">{links}</ul>
      </div>
      <div className="navbar-end">
        {user && cart.length !== 0 && (
          <NavLink to="/cart">
            <button className="btn btn-sm">
              <IoCartOutline className="text-lg" />
              <div className="badge badge-xs badge-secondary">+{cart.length}</div>
            </button>
          </NavLink>
        )}
        {user && (
          <div className="ml-2">
            {/* <a className="btn">{user?.email}</a> */}
            <img src={user?.photoURL} alt="" className="w-8 h-8 md:w-12 md:h-12 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
