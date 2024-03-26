"use client";

import {
  LayoutGrid,
  SearchIcon,
  ShoppingBasket,
  UserCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
import { useCartItemStore } from "@/store/useCartItemStore";

export const Header = () => {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const { totalItems } = useCartItemStore();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    const user: UserData = JSON.parse(sessionStorage.getItem("user") || "");
    if (jwt) {
      setIsLogin(true);
    }

    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategoryData(categories);
    };
    fetchCategories();
  }, []);

  const handleSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  return (
    <header className="flex items-center justify-between p-6 shadow-sm">
      <div className="flex items-center gap-x-8">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={150} height={100} />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="outline-none">
            <div className="hidden md:flex items-center gap-x-2 border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
              <LayoutGrid className="h-5 w-5" />
              <p>Category</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryData.map((category) => (
              <DropdownMenuItem key={category.id}>
                <Link
                  href={`/product-category/${category.attributes.name}`}
                  className="flex"
                >
                  <Image
                    src={category.attributes.icon?.data.attributes.url}
                    alt={category.attributes.name}
                    width={20}
                    height={20}
                    className="mr-4"
                  />
                  <p className="text-sm">{category.attributes.name}</p>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex items-center gap-x-3 border rounded-full p-2 px-5">
          <SearchIcon className="h-5 w-5" />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>

      <div className="flex items-center gap-x-5">
        <h2 className="flex items-center gap-x-2 text-lg">
          <ShoppingBasket className="h-7 w-7" />{" "}
          <span className="bg-primary pt-1 text-white px-3 rounded-full">
            {totalItems}
          </span>
        </h2>

        {!isLogin ? (
          <Link href="/sign-in">
            <Button>Log In</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <UserCircleIcon className="h-8 w-8 text-primary fill-green-200 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSignOut()}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
