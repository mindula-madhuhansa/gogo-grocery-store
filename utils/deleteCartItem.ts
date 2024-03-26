import { axiosClient } from "@/lib/axios";

export const deleteCartItem = async (id: number, jwt: string | null) => {
  await axiosClient.delete(`/user-carts/${id}`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
};
