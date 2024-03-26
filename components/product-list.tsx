import { ProductItem } from "@/components/product-item";

type ProductListProps = {
  productsData: Product[];
};

export const ProductList = ({ productsData }: ProductListProps) => {
  return (
    <div className="mt-10">
      <h2 className="text-primary font-bold text-2xl">Our Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {productsData.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
