import { createBrowserRouter } from "react-router";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home/Home";
import SingleSelectedProduct from "../pages/selectProduct/SingleSelectedProduct/SingleSelectedProduct";
import Login from "../pages/authentication/Login/Login";
import SignUp from "../pages/authentication/SignUp/SignUp";
import SubCategories from "../pages/selectProduct/SubCategories/SubCategories";
import Products from "../pages/selectProduct/Products/Products";
import Dashboard from "../layout/Dashboard/Dashboard";
import AddCategory from "../pages/DashBoard/AddCategory/AddCategory";
import AddSubCategory from "../pages/DashBoard/AddSubCategory/AddSubCategory";
import AddSubCategoryProduct from "../pages/DashBoard/AddSubCategoryProduct/AddSubCategoryProduct";
import ManageSubCategorys from "../pages/DashBoard/Manage-category/ManageSubCategorys/ManageSubCategorys";
import ManageProducts from "../pages/DashBoard/ManageProducts/ManageProducts";
import Secret from "../shared/Secret";
import PrivateRoute from "./PrivateRoute";
import Cart from "../pages/Cart/Cart";
import CheckOut from "../pages/CheckOut/CheckOut";
import Shop from "../pages/Shop/Shop";
import AllUsers from "../pages/DashBoard/AllUsers/AllUsers";
import ContactSection from "../pages/ContactSection/ContactSection";
import AboutUs from "../pages/AboutUs/AboutUs";
import AdminRoute from "./AdminRoute";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import ManageCategory from "../pages/DashBoard/Manage-category/ManageCategory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "/product/:id",
        element: <SubCategories></SubCategories>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/contactUs",
        element: <ContactSection></ContactSection>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/product/:id/:id1",
        element: <Products></Products>,
      },
      {
        path: "/product/:id/:id1/:id2/:title",
        element: <SingleSelectedProduct></SingleSelectedProduct>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },

      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkOut",
        element: (
          <PrivateRoute>
            <CheckOut></CheckOut>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage></NotFoundPage>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <Dashboard></Dashboard>
      </AdminRoute>
    ),
    children: [
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "addCategory",
        element: <AddCategory></AddCategory>,
      },
      {
        path: "addSubCategory/:id",
        element: <AddSubCategory></AddSubCategory>,
      },
      {
        path: "addSubCategoryProduct/:id",
        element: <AddSubCategoryProduct></AddSubCategoryProduct>,
      },
      {
        path: "manageCategorys",
        element: <ManageCategory></ManageCategory>,
      },
      {
        path: "manageSubCategorys",
        element: <ManageSubCategorys></ManageSubCategorys>,
      },
      {
        path: "manageProducts",
        element: <ManageProducts></ManageProducts>,
      },
      {
        path: "*",
        element: <NotFoundPage></NotFoundPage>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);
