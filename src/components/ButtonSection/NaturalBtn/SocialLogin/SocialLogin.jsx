import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../../providers/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const SocialLogin = ({ from, extraState }) => {
  const { googleSignIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  console.log(from);
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userinfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userinfo).then((res) => {
        console.log(res.data);
        // navigate("/");
        navigate(from, { replace: true, state: extraState });
      });
    });
  };
  return (
    <button onClick={handleGoogleSignIn} className="btn btn-outline">
      <FaGoogle />
      Continue with Google
    </button>
  );
};

export default SocialLogin;
