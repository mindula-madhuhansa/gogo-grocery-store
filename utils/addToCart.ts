import { axiosClient } from "@/lib/axios";

export const addToCart = (data: CartItem, jwt: string) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
