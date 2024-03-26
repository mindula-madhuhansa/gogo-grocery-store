import { axiosClient } from "@/lib/axios";

type Props = {
  category: string;
};

export const getProductsByCategory = async ({ category }: Props) => {
  try {
    const res = await axiosClient.get(
      `/products?filters[categories][name][$in]=${category}&populate=*`
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching Products by Category:", error);
  }
};
