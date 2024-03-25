import { LayoutGrid, SearchIcon, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCategories } from "@/utils/getCategories";

export const Header = async () => {
  const categoryData: Category[] = await getCategories();

  return (
    <header className="flex items-center justify-between p-6 shadow-sm">
      <div className="flex items-center gap-x-8">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={150} height={100} />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="outline-none">
            <div className="hidden md:flex items-center gap-x-2 border rounded-full p-2 px-10 bg-slate-200">
              <LayoutGrid className="h-5 w-5" />
              <p>Category</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryData.map((category) => (
              <DropdownMenuItem key={category.id} className="cursor-pointer">
                <Image
                  src={category.attributes.icon?.data.attributes.url}
                  alt={category.attributes.name}
                  width={20}
                  height={20}
                  className="mr-4"
                />
                <p className="text-sm">{category.attributes.name}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex items-center gap-x-3 border rounded-full p-2 px-5">
          <SearchIcon className="h-5 w-5" />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>

      <div className="flex items-center gap-x-6">
        <h3 className="flex items-center gap-x-2 text-lg">
          <ShoppingBag className="h-5 w-5" /> 0
        </h3>
        <Button>Log In</Button>
      </div>
    </header>
  );
};
