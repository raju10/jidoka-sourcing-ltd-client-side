import { useForm } from "react-hook-form";
import "./SignUp.scss";
import bgImg from "../../../assets/Authintecate-img/image.png";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SocialLogin from "../../../components/ButtonSection/NaturalBtn/SocialLogin/SocialLogin";
const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("signUp Data:", data);
    createUser(data.email, data.password, data.displayName)
      .then(() => {
        // create user entry in the database
        const userInfo = {
          displayName: data.displayName,
          email: data.email,
        };
        console.log(userInfo);
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res);
          if (res.data.insertedId) {
            console.log("User added to the database");
            reset();
            Swal.fire({
              title: "✅ User Signed Up Successfully!",
              icon: "success",
              draggable: true,
            });
            navigate("/login");
          }
        });
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..

        Swal.fire({
          title: "❌ Sign Up Failed",
          text: error?.response?.data?.message || error.message,
          icon: "error",
          draggable: true,
        });
      });
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center  px-4 bg-none"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-2xl  p-8 rounded-xl border hover:border-blue-400 hover:border-s-5 hover:border-2 hover:shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            SignUp Now !!!
          </h2>

          {/* Name Field */}
          <div className="mb-6">
            <label className="block mb-1 text-gray-700">Name</label>
            <input
              type="text"
              {...register("displayName", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Name"
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.displayName.message}
              </p>
            )}
          </div>
          {/* Email Field */}
          <div className="mb-6">
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password field */}
          <div className="mb-6">
            <label className="block mb-1 text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 "
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
              />

              <button
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-sm absolute right-1 top-1"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password?.type === "required" && (
              <span className="text-red-600">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-600">
                Password must be 6 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-600">
                Password must be less then 20 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-600">
                Password must have one uppercase, one lower case, one number and
                one scecial character
              </span>
            )}
            {/* password field close */}
            <div>
              <a className="link link-hover text-[12px] underline hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          <input
            type="submit"
            value="Sign Up"
            disabled={errors.password && "disabled"}
            //   disabled={disabled}
            className="w-full btn bg-blue-500 mt-4 text-white hover:bg-blue-600 font-semibold"
          />
        </form>

        <>
          <div className="flex justify-center">
            <small className="text-center font-bold py-6">
              Already have an Account ?
              <span className="text-red-600 underline ">
                <Link to="/login"> Please Login</Link>
              </span>
            </small>
          </div>
          <div className="divider">or</div>

          <div className="flex justify-center items-center mt-5">
            <SocialLogin></SocialLogin>
          </div>
        </>
      </div>
    </div>
  );
};

export default SignUp;
