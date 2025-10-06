import { Link, useLocation } from "react-router";
import CartBanner from "../Cart/CartBanner/CartBanner";
import OrderSummery from "../Cart/OrderSummery/OrderSummery";
import UserAddress from "../UserAddress/UserAddress";
import useCart from "../../hooks/useCart";

const CheckOut = () => {
  const [cart, refetch] = useCart();
  console.log(cart);
  const location = useLocation();
  console.log("chack out route location state data", location);
  return (
    <div className="w-full ">
      <CartBanner location={location}></CartBanner>
      {/*  */}
      <div className="grid grid-cols-1 lg:grid-cols-12 py-20 px-5 gap-4 w-full max-w-[1466px] mx-auto">
        <div className="col-span-8">
          {cart.length !== 0 && <UserAddress location={location}></UserAddress>}
        </div>
        <div className="col-span-4">
          <OrderSummery cartData={location?.state?.cartData}></OrderSummery>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
