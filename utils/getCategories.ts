import { axiosClient } from "@/lib/axios";

export const getCategories = async () => {
  try {
    const res = await axiosClient.get("/categories?populate=*");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
