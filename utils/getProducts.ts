import { axiosClient } from "@/lib/axios";

export const getProducts = async () => {
  try {
    const res = await axiosClient.get("/products?populate=*");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
