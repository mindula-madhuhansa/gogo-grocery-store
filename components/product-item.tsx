import Image from "next/image";
import { ShoppingBasket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProductItemProps = {
  product: Product;
};

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 p-2 md:p-6 border rounded-lg hover:scale-105 hover:shadow-md cursor-pointer transition-all ease-in">
      <Image
        src={product.attributes.images.data[0].attributes.url}
        alt={product.attributes.slug}
        width={500}
        height={200}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="font-bold text-lg text-center">
        {product.attributes.name}
      </h2>

      <div className="flex items-center gap-x-2">
        <h2 className="font-semibold text-sm">
          Rs. {product.attributes.mrp.toFixed(2)}
        </h2>
        {product.attributes.sellingPrice && (
          <h2
            className={cn(
              "font-semibold text-sm",
              product.attributes.sellingPrice &&
                "line-through text-gray-500 text-xs"
            )}
          >
            Rs. {product.attributes.sellingPrice.toFixed(2)}
          </h2>
        )}
      </div>
      <Button
        variant="outline"
        className="text-primary hover:text-white hover:bg-primary"
      >
        Add to Cart
      </Button>
    </div>
  );
};
