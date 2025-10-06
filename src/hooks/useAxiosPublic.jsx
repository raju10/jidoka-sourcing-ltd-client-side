import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://jidoka-sourcing-ltd-server-side-pmo5peo3j-raju10s-projects.vercel.app",
  baseURL: "http://localhost:4000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
