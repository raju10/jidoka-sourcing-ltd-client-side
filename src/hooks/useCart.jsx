import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";

const useCart = () => {
  //  tan stack query use
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cart", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });
  console.log(cart);
  return [cart, refetch];
};

export default useCart;
