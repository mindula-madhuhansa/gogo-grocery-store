import { Slider } from "@/components/slider";
import { CategoryList } from "@/components/category-list";
import { ProductList } from "@/components/product-list";

import { getSliders } from "@/utils/getSliders";
import { getCategories } from "@/utils/getCategories";
import { getProducts } from "@/utils/getProducts";
import Image from "next/image";
import { Footer } from "@/components/footer";

export default async function Home() {
  const sliderData = await getSliders();
  const categoryData = await getCategories();
  const productsData = await getProducts();

  return (
    <main className="p-4 md:p-10 md:px-16">
      <Slider sliderData={sliderData} />
      <CategoryList categoryData={categoryData} />
      <ProductList productsData={productsData} />

      <Image
        src="/banner.png"
        alt="Banner"
        width={1000}
        height={300}
        className="w-full h-[400px] object-contain mt-4"
      />

      <Footer />
    </main>
  );
}
