// import { useContext } from "react";
// import { useForm } from "react-hook-form";
// import { FaTruck } from "react-icons/fa";
// import { AuthContext } from "../../providers/AuthProvider";
// const UserAddress = ({ location }) => {
//   const { user } = useContext(AuthContext);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//     alert("Order placed successfully!");
//   };
//   return (
//     <div className="w-full  ">
//       {/* Heading */}
//       <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-6">
//         <FaTruck className="mr-2 text-blue-600" /> Shipping Address
//       </h2>

//       {/* Form */}

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Grid layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Full Name */}
//           <input
//             type="text"
//             placeholder="Full name*"
//             {...register("fullName", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//           {errors.fullName && (
//             <span className="text-red-500 text-sm">Full name is required</span>
//           )}

//           {/* Email */}
//           <input
//             type="email"
//             defaultValue={user.email}
//             placeholder="Email*"
//             {...register("email", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           {/* Phone */}
//           <input
//             type="number"
//             placeholder="Phone*"
//             {...register("phone", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           {/* Country */}
//           <input
//             type="text"
//             placeholder="Country*"
//             {...register("country", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           {/* State */}
//           <input
//             type="text"
//             placeholder="State*"
//             {...register("state", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           {/* City */}
//           <input
//             type="text"
//             placeholder="City*"
//             {...register("city", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           {/* Pincode */}
//           <input
//             type="text"
//             placeholder="Pincode*"
//             {...register("pincode", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           {/* Landmark */}
//           <input
//             type="text"
//             placeholder="Landmark*"
//             {...register("landmark", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* Order Note */}
//         <textarea
//           placeholder="Enter order note"
//           {...register("orderNote")}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
//         ></textarea>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full md:w-auto px-6 py-2 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition"
//         >
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserAddress;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import { useState } from "react";
// import { FaTruck } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import { Country, State, City } from "country-state-city";

// export default function UserAddress() {
//   const { register, handleSubmit } = useForm();

//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);
//   console.log(selectedCity);
//   const onSubmit = (data) => {
//     console.log({
//       ...data,
//       country: selectedCountry?.name,
//       state: selectedState?.name,
//       city: selectedCity?.name,
//       postalCode: selectedCity?.postalCode || "N/A",
//     });
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
//       <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-6">
//         <FaTruck className="mr-2 text-blue-600" /> Shipping Address
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Country */}
//         <select
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
//           value={selectedCountry?.isoCode || ""}
//           onChange={(e) =>
//             setSelectedCountry(Country.getCountryByCode(e.target.value))
//           }
//         >
//           <option value="">Select Country</option>
//           {Country.getAllCountries().map((c) => (
//             <option key={c.isoCode} value={c.isoCode}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         {/* State */}
//         <select
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
//           value={selectedState?.isoCode || ""}
//           onChange={(e) =>
//             setSelectedState(
//               State.getStateByCodeAndCountry(
//                 e.target.value,
//                 selectedCountry?.isoCode
//               )
//             )
//           }
//           disabled={!selectedCountry}
//         >
//           <option value="">Select State</option>
//           {selectedCountry &&
//             State.getStatesOfCountry(selectedCountry.isoCode).map((s) => (
//               <option key={s.isoCode} value={s.isoCode}>
//                 {s.name}
//               </option>
//             ))}
//         </select>

//         {/* City */}
//         <select
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
//           value={selectedCity?.name || ""}
//           onChange={(e) =>
//             setSelectedCity(
//               City.getCitiesOfState(
//                 selectedCountry?.isoCode,
//                 selectedState?.isoCode
//               ).find((ct) => ct.name === e.target.value)
//             )
//           }
//           disabled={!selectedState}
//         >
//           <option value="">Select City</option>
//           {selectedState &&
//             City.getCitiesOfState(
//               selectedCountry.isoCode,
//               selectedState.isoCode
//             ).map((ct) => (
//               <option key={ct.name} value={ct.name}>
//                 {ct.name}
//               </option>
//             ))}
//         </select>

//         {/* Other Inputs */}
//         <input
//           type="text"
//           {...register("address", { required: true })}
//           placeholder="Street Address"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
//         />

//         <button
//           type="submit"
//           className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
//         >
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// }
// ////
// ////
// ////
// ////
////
////
////
////
////
////
////
////

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTruck } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { Country, State, City } from "country-state-city";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserAddress = ({ location }) => {
  console.log(location);
  const [allSelcCartData, setAllSelcCartData] = useState([]);
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const selectedCountry = watch("country");
  const selectedState = watch("state");
  //   const mapdata = location?.state?.map((item) => {
  //     return {
  //       total: item.totalCalculatePrice,
  //     };
  //   });
  //   console.log(mapdata);
  // payment process
  const totalPrice = location?.state?.finalTotalSummeryCost;
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);
  console.log(clientSecret);
  ///////////////////
  const onSubmit = (data) => {
    const orderData = {
      productId: location?.state?.cartData?.map((p) => p._id),
      subCategoryId: location?.state?.cartData?.map(
        (sCatId) => sCatId?.subCategoryItem?.subCategoryID
      ),
      categoryId: location?.state?.cartData?.map(
        (catId) => catId?.categoryItem?._id
      ),
      userInfo: {
        ...data,
        country: Country.getCountryByCode(data.country)?.name,
        state: State.getStateByCodeAndCountry(data.state, data.country)?.name,
        city: data.city,
      },
    };
    console.log(orderData);
    alert("Order placed successfully!");
  };

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setValue("country", countryCode);
    setValue("state", "");
    setValue("city", "");
    setStates(State.getStatesOfCountry(countryCode));
    setCities([]);
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setValue("state", stateCode);
    setValue("city", "");
    setCities(City.getCitiesOfState(selectedCountry, stateCode));
  };

  return (
    <div className="w-full  bg-white shadow-md rounded-xl p-6">
      <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-6">
        <FaTruck className="mr-2 text-blue-600" /> Shipping Address
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full name*"
            {...register("fullName", { required: "Full name is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">
              {errors.fullName.message}
            </span>
          )}

          {/* Email */}
          <input
            disabled
            type="email"
            defaultValue={user?.email || ""}
            placeholder="Email*"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          {/* Phone */}
          <input
            type="number"
            placeholder="Phone*"
            {...register("phone", { required: "Phone is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}

          {/* Country */}
          <select
            {...register("country", { required: "Country is required" })}
            onChange={handleCountryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Country*</option>
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className="text-red-500 text-sm block">
              {errors.country.message}
            </span>
          )}

          {/* State */}
          <select
            {...register("state", { required: "State is required" })}
            // defaultValue={user.email}
            onChange={handleStateChange}
            disabled={!selectedCountry}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select State*</option>
            {states.map((s) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.state && (
            <span className="text-red-500 text-sm block">
              {errors.state.message}
            </span>
          )}

          {/* City */}
          <select
            {...register("city", { required: "City is required" })}
            disabled={!selectedState}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select City*</option>
            {cities.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city.message}</span>
          )}

          {/* Street / Area */}
          <input
            type="text"
            placeholder="Street / Area*"
            {...register("street", { required: "Street/Area is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.street && (
            <span className="text-red-500 text-sm">
              {errors.street.message}
            </span>
          )}

          {/* Pincode */}
          <input
            type="text"
            placeholder="Pincode*"
            {...register("pincode", { required: "Pincode is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.pincode && (
            <span className="text-red-500 text-sm">
              {errors.pincode.message}
            </span>
          )}

          {/* Landmark */}
          <input
            type="text"
            placeholder="Landmark*"
            {...register("landmark", { required: "Landmark is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.landmark && (
            <span className="text-red-500 text-sm">
              {errors.landmark.message}
            </span>
          )}
        </div>

        {/* Order Note */}
        <textarea
          placeholder="Enter order note"
          {...register("orderNote")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default UserAddress;
