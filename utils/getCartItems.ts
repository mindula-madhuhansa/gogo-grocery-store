import { axiosClient } from "@/lib/axios";

export const getCartItems = async (userId: number, jwt: string | null) => {
  try {
    const res = await axiosClient.get(
      `/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate][0]=url`,
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    );

    const result: Item[] = res.data.data;
    const cartItemsList = result.map((item) => ({
      name: item.attributes.products.data[0].attributes.name,
      quantity: item.attributes.quantity,
      amount: item.attributes.amount,
      image:
        item.attributes.products?.data[0].attributes.images.data[0].attributes
          .url,
      mrp: item.attributes.products?.data[0].attributes.mrp,
      sellingPrice: item.attributes.products?.data[0].attributes.sellingPrice,
      id: item.id,
    }));

    return cartItemsList;
  } catch (error) {
    return [];
    console.error("Error fetching Cart Items:", error);
  }
};
