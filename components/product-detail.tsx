"use client";

import Image from "next/image";
import { Loader, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { addToCart } from "@/utils/addToCart";
import { getCartItems } from "@/utils/getCartItems";
import { useCartItemStore } from "@/store/useCartItemStore";

type ProductDetailProps = {
  product: Product;
};

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const router = useRouter();
  const jwt = sessionStorage.getItem("jwt");
  const user: UserData = JSON.parse(sessionStorage.getItem("user") || "");

  const [productTotalPrice, setProductTotalPrice] = useState<number>(
    product.attributes.sellingPrice
      ? product.attributes.sellingPrice
      : product.attributes.mrp
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const { setTotalItems } = useCartItemStore();

  const handleAddToCart = () => {
    setLoading(true);
    if (!jwt || !user) {
      router.push("/sign-in");
      return;
    }

    const data: CartItem = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_user: user.id,
        userId: user.id,
      },
    };

    addToCart(data, jwt)
      .then(async (res) => {
        setLoading(false);
        toast.success("Added to Cart");
        const cartItemList: ItemList[] = await getCartItems(user.id, jwt);
        const totalItems = cartItemList.reduce(
          (acc, item) => acc + item.quantity,
          0
        );

        setTotalItems(totalItems);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-8 bg-white text-black">
      <Image
        src={product.attributes.images.data[0].attributes.url}
        alt={product.attributes.slug}
        width={300}
        height={300}
        className="bg-white border-2 border-gray-200 rounded-lg p-5 h-[300px] w-[300px] object-contain"
      />

      <div className="flex flex-col gap-y-3">
        <h2 className="text-2xl font-bold">{product.attributes.name}</h2>
        <h2 className="text-gray-500 text-sm">
          {product.attributes.description}
        </h2>

        <div className="flex items-center gap-x-2 justify-center">
          {product.attributes.sellingPrice ? (
            <>
              <h2 className="text-2xl font-bold">
                Rs. {product.attributes.sellingPrice.toFixed(2)}
              </h2>
              <h2 className="ml-2 text-gray-500 text-base line-through">
                Rs. {product.attributes.mrp.toFixed(2)}
              </h2>
            </>
          ) : (
            <h2 className="text-2xl font-bold">
              Rs. {product.attributes.mrp.toFixed(2)}
            </h2>
          )}
        </div>
        <h2 className="text-base">
          Quantity:{" "}
          <span className="uppercase font-semibold">
            {product.attributes.itemQuantityType}
          </span>
        </h2>

        <div className="flex flex-col items-baseline gap-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 border flex items-center gap-10 px-5">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <p>{quantity}</p>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <h2 className="text-xl font-bold">
              {" "}
              = Rs. {(productTotalPrice * quantity).toFixed(2)}
            </h2>
          </div>
          <Button
            onClick={() => handleAddToCart()}
            className="flex items-center gap-x-3 w-full"
          >
            {loading ? (
              <Loader className="h-5 w-5 text-muted-foreground animate-spin text-white" />
            ) : (
              <>
                <ShoppingCart /> Add to Cart
              </>
            )}
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category: </span>
          {product.attributes.categories.data[0].attributes.name}
        </h2>
      </div>
    </div>
  );
};
