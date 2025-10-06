import { Outlet, useLocation } from "react-router";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
const Main = () => {
  const location = useLocation();
  console.log(location);
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signUp");
  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      {location.pathname === "/" ? (
        <div className=" pt-20">
          <Outlet></Outlet>
        </div>
      ) : (
        <div className=" ">
          <Outlet></Outlet>
        </div>
      )}
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
