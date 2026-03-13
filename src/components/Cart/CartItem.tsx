import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import ItemActions from "./ItemActions";

interface IProps {
  item: {
    grocery: Product;
    name: string;
    price: number;
    quantity: number;
    _id: string;
  };
  onUpdate: () => void;
}

const CartItem: FC<IProps> = ({ item, onUpdate }) => {
  if (!item.grocery) return null;

  return (
    <li className="flex items-center p-4 gap-4 border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition-colors">
      <div className="shrink-0 w-24 h-24 overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100">
        <Image
          src={item.grocery.photo}
          alt={item.grocery.name}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <Link href={`/grocery/${item.grocery._id}`}>
          <h3 className="font-semibold text-lg text-gray-800 hover:text-green-600">
            {item.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm">{item.grocery.unit}</p>
        <p className="text-green-600 font-medium">{item.grocery.price} TRY</p>
      </div>

      <ItemActions item={item} onUpdate={onUpdate} />
    </li>
  );
};

export default CartItem;
