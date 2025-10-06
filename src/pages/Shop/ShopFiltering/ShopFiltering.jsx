import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import useProducts from "../../../hooks/useProducts";

const ShopFiltering = ({ filters, setFilters, closeOnApply }) => {
  const [allProducts] = useProducts();
  const [open, setOpen] = useState({
    category: true,
    color: true,
    size: true,
    price: true,
  });

  // unique categories
  const categories = Array.from(
    new Map(
      (allProducts || [])
        .filter((p) => p?.categoryItem?._id)
        .map((p) => [p.categoryItem._id, p.categoryItem])
    ).values()
  );

  // toggle for category/color/size
  const toggleFilter = (type, rawValue) => {
    if (type === "price") {
      setFilters((prev) => ({ ...prev, price: Number(rawValue) }));
      return;
    }

    const normValue =
      type === "color"
        ? String(rawValue).toLowerCase()
        : type === "size"
        ? String(rawValue).toUpperCase()
        : rawValue;

    setFilters((prev) => {
      const current = Array.isArray(prev[type]) ? prev[type] : [];
      const exists = current.includes(normValue);
      const next = exists
        ? current.filter((v) => v !== normValue)
        : [...current, normValue];
      return { ...prev, [type]: next };
    });
  };

  const clearFilters = () =>
    setFilters({ category: [], color: [], size: [], price: 3000 });

  return (
    <div className="bg-gray-50 p-4 max-h-screen overflow-y-auto h-full">
      {/* Mobile close/some parent handles close; closeOnApply optional */}
      <div className="mb-3 flex gap-2">
        <button
          onClick={clearFilters}
          className="flex-1 bg-red-600 text-white py-2 rounded"
        >
          Clear Filters
        </button>
        {closeOnApply && (
          <button
            onClick={closeOnApply}
            className="bg-gray-200 px-3 py-2 rounded"
          >
            Close
          </button>
        )}
      </div>

      {/* CATEGORY */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setOpen((s) => ({ ...s, category: !s.category }))}
          className="w-full flex justify-between items-center font-semibold border-b py-2"
        >
          CATEGORY {open.category ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {open.category && (
          <div className="mt-2 ml-2 space-y-2 max-h-[20vh] overflow-auto">
            {categories.map((cat) => (
              <label key={cat._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={
                    Array.isArray(filters.category) &&
                    filters.category.includes(cat._id)
                  }
                  onChange={() => toggleFilter("category", cat._id)}
                  className="h-4 w-4"
                />
                {cat.categoryName}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* COLOR */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setOpen((s) => ({ ...s, color: !s.color }))}
          className="w-full flex justify-between items-center font-semibold border-b py-2"
        >
          COLOR {open.color ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {open.color && (
          <div className="mt-2 ml-2 space-y-2">
            {["Black", "Blue", "Green", "Red", "White"].map((c) => {
              const val = c.toLowerCase();
              return (
                <label key={c} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={
                      Array.isArray(filters.color) &&
                      filters.color.includes(val)
                    }
                    onChange={() => toggleFilter("color", val)}
                    className="h-4 w-4"
                  />
                  {c}
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* SIZE */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setOpen((s) => ({ ...s, size: !s.size }))}
          className="w-full flex justify-between items-center font-semibold border-b py-2"
        >
          SIZE {open.size ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {open.size && (
          <div className="mt-2 ml-2 space-y-2">
            {["S", "M", "L", "XL", "XXL"].map((sz) => (
              <label key={sz} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={
                    Array.isArray(filters.size) && filters.size.includes(sz)
                  }
                  onChange={() => toggleFilter("size", sz)}
                  className="h-4 w-4"
                />
                {sz}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* PRICE */}
      <div>
        <button
          type="button"
          onClick={() => setOpen((s) => ({ ...s, price: !s.price }))}
          className="w-full flex justify-between items-center font-semibold border-b py-2"
        >
          PRICE {open.price ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {open.price && (
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max="3000"
              step="100"
              value={filters.price}
              onChange={(e) => toggleFilter("price", Number(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-sm mt-1">
              <span>৳0</span>
              <span>৳{filters.price}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopFiltering;
