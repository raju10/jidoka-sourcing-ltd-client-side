import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import useSubCategory from "../../../hooks/useSubCategory";
import useProducts from "../../../hooks/useProducts";
import { Helmet } from "react-helmet-async";
import SideNavDataFitaring from "../../Home/SideNavDataFitaring/SideNavDataFitaring";

const SubCategories = () => {
  const [id] = useState(useParams().id);
  const { id: routeId } = useParams();

  //console.log(id);
  const [selectedCatagory, setSelectedCatagory] = useState([]);
  const [allSubCategorys, , loadingSub] = useSubCategory();
  const [allProducts, , loadingProducts] = useProducts();
  //console.log(allSubCategorys);

  useEffect(() => {
    const data = allSubCategorys?.filter(
      (sCat) => sCat?.selectedCategoryItem?._id === routeId
    );
    //console.log(data);
    setSelectedCatagory(data);
  }, [allSubCategorys, routeId]);

  if (loadingSub || loadingProducts) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#41a28e] rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse uppercase tracking-widest text-sm">Loading Excellence...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Jidoka Sourcing | SubCategories</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-12 pt-15">
        <div className="hidden md:block md:col-span-3 bg-black">
          <SideNavDataFitaring id={routeId}></SideNavDataFitaring>
        </div>
        {/* Mobile only SideNav toggle and menu is handled inside SideNavDataFitaring using fixed positioning */}
        <div className="md:hidden">
          <SideNavDataFitaring id={routeId}></SideNavDataFitaring>
        </div>
        <div className="w-[95%] md:w-4/5 mx-auto min-h-screen h-full md:col-span-9">
          <div className="title py-20">
            <h1 className="text-2xl text-end">
              Timeless elegance and sophistication, crafted for every professional
              <br /> and special occasion.
            </h1>
          </div>
          {selectedCatagory?.length > 0 ? <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {selectedCatagory?.map((sCatagory) => (
              <div className="group" key={sCatagory._id}>
                <Link to={`/product/${routeId}/${sCatagory._id}`} state={{ sCatagory: sCatagory }}>
                  <div className="relative overflow-hidden">
                    <img
                      src={sCatagory?.subCategoryImage}
                      alt=""
                      className="w-full h-[300px] border object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  <div className=" flex justify-between items-center py-4 ">
                    <h2 className="font-bold text-3xl md:text-lg md:leading-6 group-hover:text-[#41a28e] transition-colors">
                      {sCatagory?.subCategoryName}
                    </h2>
                    <Link
                      to={`/product/${routeId}/${sCatagory._id}`}
                      state={{ sCatagory: sCatagory }}
                    >
                      {" "}
                      <p
                        className="cursor-pointer text-lg md:text-sm text-gray-600"
                      >
                        <b className="text-black">
                          {" "}
                          {
                            allProducts.filter(
                              (pro) =>
                                pro.subCategoryItem.subCategoryID === sCatagory._id
                            ).length
                          }
                        </b>

                        <small className="ml-1"> Product Available</small>
                      </p>
                    </Link>
                  </div>
                </Link>
              </div>
            ))}
          </div> : <p className="text-2xl text-center p-10 text-red-500">No SubCategory Found</p>}
        </div>
      </div>
    </>
  );
};

export default SubCategories;
