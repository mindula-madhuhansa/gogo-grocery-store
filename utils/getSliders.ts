import { axiosClient } from "@/lib/axios";

export const getSliders = async () => {
  try {
    const res = await axiosClient.get("/sliders?populate=*");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
