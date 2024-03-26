import { axiosClient } from "@/lib/axios";

export const getCartItems = async (userId: number, jwt: string | null) => {
  try {
    const res = await axiosClient.get(
      `/user-carts?filters[userId][$eq]=${userId}&populate=*`,
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching Cart Items:", error);
  }
};
