"use client";

import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

type CartItemProps = {
  cartItemList: ItemList[];
  onDeleteItem: (id: number) => void;
};

export const CartItem = ({ cartItemList, onDeleteItem }: CartItemProps) => {
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubtotal(total);
  }, [cartItemList]);

  return (
    <div>
      <div>
        {cartItemList.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 mb-5"
          >
            <div className="flex gap-6 items-center">
              <Image
                src={item.image}
                alt={item.name}
                width={90}
                height={90}
                className="border p-2"
              />

              <div className="flex flex-col items-start">
                <h2 className="font-bold">{item.name}</h2>
                <h2>Quantity {item.quantity}</h2>
                <h2 className="text-lg font-bold">Rs. {item.amount}</h2>
              </div>
            </div>
            <TrashIcon
              onClick={() => onDeleteItem(item.id)}
              className="text-red-500 h-5 w-5 cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="absolute w-[90%] bottom-6 flex flex-col">
        <h2 className="text-lg font-bold flex justify-between mb-2">
          Subtotal <span>Rs {subtotal}</span>
        </h2>
        <Button>View Cart</Button>
      </div>
    </div>
  );
};
