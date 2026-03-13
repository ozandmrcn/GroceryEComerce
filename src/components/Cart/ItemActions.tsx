"use client";

import { removeCartItem, updateCartItem } from "@/service/basketService";
import { Product } from "@/types";
import { useState, type FC } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

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

const ItemActions: FC<IProps> = ({ item, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);

  // change quantity of item
  const handleQuantityChange = async (quantity: number) => {
    setIsLoading(true);

    try {
      await updateCartItem(item.grocery._id, quantity);
      onUpdate();
    } catch (error) {
      console.error("Error updating cart item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // remove item from cart
  const handleRemoveItem = async () => {
    setIsLoading(true);

    try {
      await removeCartItem(item.grocery._id);
      onUpdate();
    } catch (error) {
      console.error("Error removing cart item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center border border-gray-300 rounded mr-4">
        <button
          disabled={item.quantity === 1 || isLoading}
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="px-2 py-2 text-gray-600 hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer"
        >
          <FaMinus />
        </button>

        <span className="px-3 py-1 border-x border-gray-300 min-w-[36px] text-center">
          {item.quantity}
        </span>

        <button
          disabled={item.quantity === item.grocery.stock || isLoading}
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="px-2 py-2 text-gray-600 hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer"
        >
          <FaPlus />
        </button>
      </div>

      <button
        disabled={isLoading}
        onClick={handleRemoveItem}
        className="text-red-600 hover:text-red-700 cursor-pointer disabled:opacity-50"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default ItemActions;
