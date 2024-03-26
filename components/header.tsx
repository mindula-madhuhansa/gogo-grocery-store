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
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCategories } from "@/utils/getCategories";
import { getCartItems } from "@/utils/getCartItems";
import { CartItem } from "@/components/cart-item";
import { deleteCartItem } from "@/utils/deleteCartItem";

export const Header = () => {
  const router = useRouter();

  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [cartItemList, setCartItemList] = useState<ItemList[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  const jwt = sessionStorage.getItem("jwt");
  const user: UserData = JSON.parse(sessionStorage.getItem("user") || "");

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    if (!jwt || !user) {
      router.push("/sign-in");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubtotal(total);
  }, [cartItemList]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCategories = async () => {
    const categories = await getCategories();
    setCategoryData(categories);
  };

  const fetchCartItems = async () => {
    const cartItemList_ = await getCartItems(user.id, jwt);
    setCartItemList(cartItemList_);
  };

  const handleSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  const onDeleteItem = (id: number) => {
    deleteCartItem(id, jwt).then((res) => {
      toast.success("Item removed");
      window.location.reload();
    });
  };

  if (!isAuthenticated) {
    return null;
  }

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
        <Sheet>
          <SheetTrigger>
            <h2 className="flex items-center gap-x-2 text-lg">
              <ShoppingBasket className="h-7 w-7" />{" "}
              <span className="bg-primary pt-1 text-white px-3 rounded-full">
                {cartItemList.length}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="font-bold text-lg">My Cart</SheetTitle>
              <SheetDescription>
                <CartItem
                  cartItemList={cartItemList}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose>
              <div className="absolute w-[90%] bottom-6 flex flex-col">
                <h2 className="text-lg font-bold flex justify-between mb-2">
                  Subtotal <span>Rs. {subtotal.toFixed(2)}</span>
                </h2>
                <Button
                  onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
                >
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isAuthenticated ? (
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
