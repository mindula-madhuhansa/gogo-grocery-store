"use client";

import { TrashIcon } from "lucide-react";
import Image from "next/image";

type CartItemProps = {
  cartItemList: ItemList[];
  onDeleteItem: (id: number) => void;
};

export const CartItem = ({ cartItemList, onDeleteItem }: CartItemProps) => {
  return (
    <div>
      <div className="h-[700px] overflow-y-auto">
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
    </div>
  );
};
