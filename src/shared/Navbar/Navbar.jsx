import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { IoCartOutline } from "react-icons/io5";
import logo from "../../assets/logo/logo1.png";
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
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/shop">Shop</Link>
      </li>
      {isAdmin && (
        <li>
          <Link to="/dashboard/addCategory">Add Category</Link>
        </li>
      )}
      <li>
        <Link to="/aboutUs">About Us</Link>
      </li>
      <li>
        <Link to="/contactUs">Contact Us</Link>
      </li>
      {user ? (
        <li
          onClick={handleLogOut}
          className="bg-blue-500 text-white py-1 px-3 rounded-sm hover:bg-black cursor-pointer"
        >
          LogOut
        </li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="fixed top-0 z-100 navbar bg-black text-white shadow-sm ">
      <div className="navbar-start">
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
            alt=""
            className="w-17 h-full  object-cover xl:ml-35"
          />
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center">{links}</ul>
      </div>
      <div className="navbar-end">
        {user && cart.length !== 0 && (
          <NavLink to="/cart">
            <button className="btn">
              <IoCartOutline />
              <div className="badge badge-secondary">+{cart.length}</div>
            </button>
          </NavLink>
        )}
        {user && (
          <div className="ml-2">
            <a className="btn">{user?.email}</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
