import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import useSubCategory from "../../../hooks/useSubCategory";
import useProducts from "../../../hooks/useProducts";
import SideNavDataFitaring from "../../Home/SideNavDataFitaring/SideNavDataFitaring";

const SubCategories = () => {
  const { id } = useParams();

  console.log(id);
  const [selectedCatagory, setSelectedCatagory] = useState([]);
  const [allSubCategorys] = useSubCategory();
  const [allProducts] = useProducts();
  console.log(allSubCategorys);

  useEffect(() => {
    const data = allSubCategorys?.filter(
      (sCat) => sCat?.selectedCategoryItem?._id === id
    );
    console.log(data);
    setSelectedCatagory(data);
  }, [allSubCategorys, id]);
  console.log(selectedCatagory);

  return (
    <div className="grid grid-cols-12">
      <div className="w-full   bg-black col-span-3">
        <SideNavDataFitaring id={id}></SideNavDataFitaring>
      </div>
      <div className=" w-4/5 mx-auto min-h-screen h-full col-span-9">
        <div className="title py-20">
          <h1 className="text-2xl text-end">
            Timeless elegance and sophistication, crafted for every professional
            <br /> and special occasion.
          </h1>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {selectedCatagory?.map((sCatagory) => (
            <div className="" key={sCatagory._id}>
              <img
                src={sCatagory?.subCategoryImage}
                alt=""
                className="w-full h-[300px] border object-cover"
              />

              <div className=" flex justify-between items-center py-4 ">
                <h2 className="font-bold text-3xl md:text-lg md:leading-6">
                  {sCatagory?.subCategoryName}
                </h2>
                <Link
                  to={`/product/${id}/${sCatagory._id}`}
                  state={{ sCatagory: sCatagory }}
                >
                  {" "}
                  <p
                    // onClick={() => handleCardClick(sCatagory.id)}
                    className="cursor-pointer text-lg md:text-sm "
                  >
                    <b>
                      {" "}
                      {
                        allProducts.filter(
                          (pro) =>
                            pro.subCategoryItem.subCategoryID === sCatagory._id
                        ).length
                      }
                    </b>

                    <small> Product Avalable</small>
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategories;
