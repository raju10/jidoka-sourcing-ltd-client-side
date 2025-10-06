import { useContext, useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo/logo1.png";
import "./Login.css";
import { useForm } from "react-hook-form";
import bgImg from "../../../assets/Authintecate-img/authintication bg img.jpg";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import SocialLogin from "../../../components/ButtonSection/NaturalBtn/SocialLogin/SocialLogin";

const Login = () => {
  // const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const extraState = location.state || {}; // keep pro & pData also
  console.log(location, navigate);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    console.log("Login Data:", email, password);
    // Perform authentication here (API call, etc.)

    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Yser logIn successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, {
          replace: true,
          state: extraState, // pass pro & pData back
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleValidateCaptcha = (e) => {
    // const use_captcha_value = captchaRef.current.value;
    const use_captcha_value = e.target.value;
    console.log(use_captcha_value);
    if (validateCaptcha(use_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center  px-4 bg-none text-white"
      style={{
        backgroundImage: ` linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),  url(${bgImg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-2xl  p-8 rounded-xl border ">
        <img src={logo} alt="" className="w-15 object-cover" />
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <h2 className="text-2xl font-bold mb-6 text-center ">Please Login</h2>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block mb-1 ">Email</label>
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

          {/* Password Field */}
          <div className="mb-6">
            <label className="block mb-1 ">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <div>
              <a className="link link-hover text-[12px] underline">
                Forgot password?
              </a>
            </div>
          </div>
          {/* captcha field */}
          <div className="my-5">
            <label className="block mb-2 text-gray-700 label ">
              <LoadCanvasTemplate />
            </label>
            <input
              onBlur={handleValidateCaptcha}
              type="text"
              // ref={captchaRef}
              // {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="type the text above"
            />
            {/* <button
              // onClick={() => handleValidateCaptcha()}
              className="btn btn-outline btn-xs"
            >
              Validate
            </button> */}
          </div>
          {/* submit btn */}
          <input
            type="submit"
            value="Login"
            disabled
            //  disabled={disabled}
            className="w-full btn bg-blue-500 mt-4 text-white hover:bg-blue-600 font-semibold"
          />
        </form>
        <>
          <small className="flex justify-center items-center font-bold py-6">
            New Here ?
            <span className="text-red-600 underline px-1">
              <Link to="/signUp"> Create a new account</Link>
            </span>
          </small>
          <div className="divider">or</div>

          <div className="flex justify-center items-center mt-5">
            <SocialLogin from={from} extraState={extraState}></SocialLogin>
          </div>
        </>
      </div>
    </div>
  );
};

export default Login;
