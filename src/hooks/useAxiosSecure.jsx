import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:4000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  // request interceptors to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    function (config) {
      //   console.log(config.headers);
      const token = localStorage.getItem("access-token");
      //  console.log("req stopped by interceptors", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      console.log("status error in the interceptor", status);
      // for 401 and 403 logOut the user and move the user to the login page
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

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

// import axios from "axios";
// import { useNavigate, useParams } from "react-router";
// import { AuthContext } from "../providers/AuthProvider";

// const axiossecure = axios.create({
//   baseURL: "http://localhost:4000",
// });
// const useAxiosSecure = () => {
//   const navigate = useNavigate();
//   const { logOut } = useParams(AuthContext);
//   // request interceptors to add authorization headers for every sequre call to the api
//   axiossecure.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem("access-token");
//       console.log("reques stop by interseptors", token);
//       config.headers.authorization = `Bearer ${token}`;
//       return config;
//     },
//     (err) => {
//       return Promise.reject(err);
//     }
//   );

//   // intercepts 401 & 403 status
//   axiossecure.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (err) => {
//       const status = err.response.status;
//       console.log("status err in the interceptor", status);
//       // for 401 & 403 logout the user and move the user to the login page
//       if (status === 401 || status === 403) {
//         await logOut();
//         navigate("/login");
//       }
//       return Promise.reject(err);
//     }
//   );

//   return axiossecure;
// };

// export default useAxiosSecure;
