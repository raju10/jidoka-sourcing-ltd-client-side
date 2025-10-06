import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import CartBanner from "../Cart/CartBanner/CartBanner";
import useProducts from "../../hooks/useProducts";
import ShopFiltering from "./ShopFiltering/ShopFiltering";
import ShopCardFiltering from "./ShopCardFiltering/ShopCardFiltering";
import { FaBars, FaTimes, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { SlArrowRight } from "react-icons/sl";
const Shop = () => {
  const location = useLocation();
  const [allProducts] = useProducts();

  const [filters, setFilters] = useState({
    category: [],
    color: [],
    size: [],
    price: 3000,
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true); // 🔥 Add loading state

  // Simulate loading time or wait for server data
  useEffect(() => {
    if (!allProducts) return;

    // Show spinner for at least 1.5s
    const timer = setTimeout(() => setLoading(false), 1500);

    return () => clearTimeout(timer);
  }, [allProducts]);

  useEffect(() => {
    if (!allProducts) {
      setFilteredProducts([]);
      return;
    }

    let result = Array.isArray(allProducts) ? [...allProducts] : [];

    // CATEGORY
    if (filters.category.length > 0) {
      result = result.filter((p) =>
        filters.category.includes(p?.categoryItem?._id)
      );
    }

    // COLOR
    if (filters.color.length > 0) {
      result = result.filter((p) => {
        const raw = p?.color || "";
        const productColors = raw
          .split(",")
          .map((c) => c.trim().toLowerCase())
          .filter(Boolean);
        return productColors.some((pc) => filters.color.includes(pc));
      });
    }

    // SIZE
    if (filters.size.length > 0) {
      result = result.filter((p) => {
        const sizes = Array.isArray(p?.size)
          ? p.size.map((s) => String(s).toUpperCase())
          : [];
        return sizes.some((s) => filters.size.includes(s));
      });
    }

    // PRICE
    result = result.filter(
      (p) => Number(p?.price ?? 0) <= Number(filters.price)
    );

    setFilteredProducts(result);
  }, [filters, allProducts]);

  // Check if any filter is active
  const isAnyFilterActive =
    (filters.category && filters.category.length > 0) ||
    (filters.color && filters.color.length > 0) ||
    (filters.size && filters.size.length > 0) ||
    (filters.price && filters.price < 3000);

  const productsToShow = isAnyFilterActive
    ? filteredProducts
    : allProducts || [];

  return (
    <div className="">
      <Helmet>
        <title>Jidoka LTD | Shop</title>
      </Helmet>

      <CartBanner location={location} />

      {/* Mobile toggle */}
      <div className="lg:hidden flex justify-start p-4 sticky top-20  shadow-2xl">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="p-2 text-white bg-gray-800 rounded-md"
        >
          <SlArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Desktop sidebar */}
        <div className="hidden lg:block col-span-3 p-5">
          <ShopFiltering filters={filters} setFilters={setFilters} />
        </div>

        {/* Mobile animated sidebar */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              {/* overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-black z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.28 }}
                className="fixed top-0 left-0 z-50 w-3/4 h-full bg-white shadow-lg lg:hidden"
              >
                <div className="p-3 flex items-center justify-between border-b">
                  <h3 className="font-semibold">Filters</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 rounded-md"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="p-4">
                  <ShopFiltering
                    filters={filters}
                    setFilters={setFilters}
                    closeOnApply={() => setIsFilterOpen(false)}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Product grid */}
        <div className="col-span-12 lg:col-span-9 p-5">
          {loading ? (
            // 🔥 Spinner while loading
            <div className="flex flex-col items-center justify-center h-64">
              <FaSpinner className="text-4xl text-gray-600 animate-spin mb-2" />
              <p className="text-gray-500 font-medium">Loading products...</p>
            </div>
          ) : productsToShow.length <= 0 ? (
            // No products
            <p className="text-center text-gray-600 text-lg font-medium">
              🚫 No Products Available
            </p>
          ) : (
            // Products grid
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {productsToShow.map((pro) => (
                <ShopCardFiltering key={pro._id} pro={pro} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
