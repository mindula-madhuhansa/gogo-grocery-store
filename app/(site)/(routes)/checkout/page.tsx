"use client";

import { ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCartItems } from "@/utils/getCartItems";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const router = useRouter();

  const [cartItemList, setCartItemList] = useState<ItemList[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [zip, setZip] = useState<string>();
  const [address, setAddress] = useState<string>();

  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user")!);

  useEffect(() => {
    if (!jwt || !user) {
      router.push("/sign-in");
    }
    getCartItemsList();
  }, []);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubtotal(total);
  }, [cartItemList]);

  const calculateTotalAmount = () => {
    const totalAmount = subtotal * 1.15 + 300;
    return totalAmount;
  };
  const getCartItemsList = async () => {
    const cartItemsList_ = await getCartItems(user.id, jwt);
    setCartItemList(cartItemsList_);
  };

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid-cols-1 grid md:grid-cols-3 py-8 gap-4">
        <div className="col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              type="tel"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Zip Code"
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({cartItemList.length})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>Rs. {subtotal.toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>Rs. 300.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (15%): <span>Rs. {(subtotal * 0.15).toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>Rs. {calculateTotalAmount().toFixed(2)}</span>
            </h2>
            <Button>
              Payment <ArrowBigRight className="ml-3" fill="currentColor" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
