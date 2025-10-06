import { NavLink } from "react-router";
import pageTitle from "../../../assets/New folder/page-title.png";

const CartBanner = ({ location }) => {
  return (
    <div className="relative">
      <img src={pageTitle} alt="" className="w-full h-full" />
      <div className="text-center absolute top-[20%] left-0 right-0 font-bold text-xl space-x-2">
        <h2>Cart</h2>
        <div>
          <NavLink to="/"> Home </NavLink>
          {location.pathname && (
            <NavLink to={location.pathname} className="text-blue-500">
              {location.pathname}
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartBanner;
