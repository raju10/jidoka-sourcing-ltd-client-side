import { Link, useLocation } from "react-router";
import useCategory from "../../../hooks/useCategory";

const SideNavDataFitaring = ({ id }) => {
  const [allCategorys] = useCategory();
  console.log(allCategorys);
  return (
    <div className=" sticky top-20   list-none  max-w-full mx-auto px-5   text-white  overflow-y-auto">
      {allCategorys.map((cat) => (
        <Link to={`/product/${cat._id}`}>
          <li
            className={
              cat._id === id
                ? "bg-[#41a28e] font-bold underline py-2 px-4 rounded my-6 uppercase tracking-[0.5px]"
                : "bg-gray-600 py-2 px-4 rounded my-6 uppercase tracking-[0.5px]"
            }
          >
            {cat.categoryName}
          </li>
        </Link>
      ))}
    </div>
  );
};

export default SideNavDataFitaring;
