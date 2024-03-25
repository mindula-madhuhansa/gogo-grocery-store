import Image from "next/image";

type CategoryListProps = {
  categoryData: Category[];
};

export const CategoryList = ({ categoryData }: CategoryListProps) => {
  return (
    <div className="mt-10">
      <h2 className="text-primary font-bold text-2xl">Shop by Category</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-5">
        {categoryData.map((category) => (
          <div
            key={category.id}
            className="mt-4 flex flex-col items-center bg-green-50 gap-y-2 p-4 rounded-lg group cursor-pointer hover:bg-green-200"
          >
            <Image
              src={category.attributes.icon.data.attributes.url}
              alt={category.attributes.name}
              width={50}
              height={50}
              className="group-hover:scale-110 transition-all ease-in"
            />
            <h2 className="text-green-900">{category.attributes.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
