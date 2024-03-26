import { CategoryList } from "@/components/category-list";
import { ProductList } from "@/components/product-list";

import { getCategories } from "@/utils/getCategories";
import { getProductsByCategory } from "@/utils/getProductsByCategory";

type CategoryPageProps = {
  params: {
    category: string;
  };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const productsByCategoryData: Product[] = await getProductsByCategory({
    category: params.category,
  });
  const categoryData = await getCategories();

  return (
    <div>
      <div className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {params.category}
      </div>

      <CategoryList
        categoryData={categoryData}
        isProductByCategory={true}
        selectedCategory={params.category}
      />

      <div className="p-4 md:p-10 ">
        <ProductList productsData={productsByCategoryData} />
      </div>
    </div>
  );
};

export default CategoryPage;
