import { useState } from "react";
import { Link } from "react-router";
import useCategory from "../../../hooks/useCategory";
import useSubCategory from "../../../hooks/useSubCategory";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";

const SideNavDataFitaring = ({ id }) => {
  const [allCategorys, , loadingCategories] = useCategory();
  const [allSubCategorys, , loadingSub] = useSubCategory();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-24 left-4 z-50 bg-[#41a28e] text-white p-2 rounded-md shadow-lg flex items-center gap-2"
      >
        {isOpen ? <FaTimes size={18} /> : <IoMdArrowDropright size={18} />}
        <span className="text-xs font-bold uppercase">Menu</span>
      </button>

      {/* Sidebar Content */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-black text-white p-5 transform transition-transform duration-300 ease-in-out overflow-y-auto
          md:relative md:translate-x-0 md:w-full md:block md:bg-transparent md:p-0
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:sticky md:top-32
        `}
      >
        <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700 md:hidden">Categories</h2>
        <ul className="list-none pt-12 md:pt-0">
          {loadingCategories ? (
            // Skeleton Loader for Categories
            [...Array(8)].map((_, index) => (
              <li key={index} className="bg-gray-800 h-10 w-full rounded my-4 animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
              </li>
            ))
          ) : (
            allCategorys.map((cat) => {
              const subCount = allSubCategorys.filter(sub => sub?.selectedCategoryItem?._id === cat._id).length;

              return (
                <Link
                  key={cat._id}
                  to={`/product/${cat._id}`}
                  onClick={() => setIsOpen(false)}
                >
                  <li
                    className={
                      cat._id === id
                        ? "bg-[#41a28e] font-bold py-2 px-4 rounded my-4 uppercase tracking-[0.5px] transition-all flex justify-between items-center relative overflow-hidden group"
                        : "bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded my-4 uppercase tracking-[0.5px] transition-all flex justify-between items-center relative overflow-hidden group"
                    }
                  >
                    <span>{cat.categoryName}</span>
                    <span className="bg-black/30 px-2 py-0.5 rounded text-xs">
                      {loadingSub ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        subCount
                      )}
                    </span>
                    {/* Per-item loading bar effect (optional, shows on reload/load) */}
                    {loadingSub && (
                      <div className="absolute bottom-0 left-0 h-[2px] bg-white/50 animate-[loadingLine_1s_infinite]"></div>
                    )}
                  </li>
                </Link>
              );
            })
          )}
        </ul>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes loadingLine {
          0% { width: 0%; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0%; left: 100%; }
        }
      `}</style>

      {/* Overlay for mobile when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default SideNavDataFitaring;

