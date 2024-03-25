import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type CategoryListProps = {
  categoryData: Category[];
  isProductByCategory?: boolean;
  selectedCategory?: string;
};

export const CategoryList = ({
  categoryData,
  isProductByCategory,
  selectedCategory,
}: CategoryListProps) => {
  return (
    <div>
      {!isProductByCategory && (
        <h2 className="mt-10 text-primary font-bold text-2xl">
          Shop by Category
        </h2>
      )}

      <div
        className={
          !isProductByCategory
            ? "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-5"
            : "flex items-center justify-center gap-x-5 overflow-auto mx-8 lg:mx-20"
        }
      >
        {categoryData.map((category) => (
          <Link
            href={`/product-category/${category.attributes.name}`}
            key={category.id}
            className={cn(
              "mt-4 flex flex-col items-center bg-green-50 gap-y-2 p-4 rounded-lg group cursor-pointer hover:bg-green-200",
              isProductByCategory && "w-[150px] min-w-[100px]",
              selectedCategory === category.attributes.name &&
                "bg-green-600 text-white"
            )}
          >
            <Image
              src={category.attributes.icon.data.attributes.url}
              alt={category.attributes.name}
              width={50}
              height={50}
              className="group-hover:scale-110 transition-all ease-in"
            />
            <h2
              className={cn(
                "text-green-900",
                selectedCategory === category.attributes.name && "text-white"
              )}
            >
              {category.attributes.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
