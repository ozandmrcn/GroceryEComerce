"use client";

import { Product } from "@/types";
import { useState, type FC } from "react";
import { useCart } from "@/contexts/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { addToBasket, checkoutSingleItem } from "@/service/basketService";
import { toast } from "react-toastify";

interface IProps {
  grocery: Product;
}

const OrderButtons: FC<IProps> = ({ grocery }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const { refreshCart } = useCart();

  const handleAddToCart = () => {
    if (quantity < 1 || quantity > grocery?.stock) return;

    setIsLoading(true);

    addToBasket(grocery._id, quantity)
      .then(async () => {
        toast.success(
          `${quantity} ${grocery.unit} ${grocery.name} added to the basket`,
        );
        await refreshCart();
      })
      .catch((err) => {
        console.log(err);

        toast.error("Product not added to the basket");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleBuyNow = () => {
    if (quantity < 1 || quantity > grocery.stock) return;

    setIsLoading(true);

    checkoutSingleItem(grocery, quantity)
      .then((res) => {
        setQuantity(1);
        window.open(res.url, "_blank");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        {/* Quantity Selection */}
        <div className="flex items-center border border-gray-300 rounded shrink-0">
          <button
            disabled={quantity <= 1}
            onClick={() => setQuantity(quantity - 1)}
            className="cursor-pointer p-3 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <FaMinus />
          </button>

          <span className="px-3 py-2 border-x border-gray-300 min-w-[40px] text-center">
            {quantity}
          </span>

          <button
            disabled={quantity === grocery?.stock}
            onClick={() => setQuantity(quantity + 1)}
            className="cursor-pointer p-3 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <FaPlus />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex-1 flex items-center gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isLoading || quantity < 1}
            className="flex-1 flex items-center justify-center gap-2 border border-green-600 text-green-600 p-3 rounded-md hover:bg-green-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            <FaShoppingCart />
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            disabled={isLoading || quantity < 1}
            className="flex-1 flex items-center justify-center gap-2 border bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderButtons;
