import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductDetail } from "@/components/product-detail";

type ProductItemProps = {
  product: Product;
};

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 p-2 md:p-6 border rounded-lg hover:scale-105 hover:shadow-md cursor-pointer transition-all ease-in">
      <Image
        src={product.attributes.images.data[0].attributes.url}
        alt={product.attributes.slug}
        width={200}
        height={200}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="font-bold text-lg text-center">
        {product.attributes.name}
      </h2>

      <div className="flex items-center gap-x-2">
        {product.attributes.sellingPrice ? (
          <>
            <h2 className="text-base font-bold">
              Rs. {product.attributes.sellingPrice.toFixed(2)}
            </h2>
            <h2 className="ml-2 text-gray-500 text-sm line-through">
              Rs. {product.attributes.mrp.toFixed(2)}
            </h2>
          </>
        ) : (
          <h2 className="text-base font-bold">
            Rs. {product.attributes.mrp.toFixed(2)}
          </h2>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary"
          >
            Add to Cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
