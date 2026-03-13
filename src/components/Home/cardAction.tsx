"use client";
import { addToBasket } from "@/service/basketService";
import { useState, type FC } from "react";
import { useCart } from "@/contexts/CartContext";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

interface IProps {
  productId: string;
}

const CardAction: FC<IProps> = ({ productId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { refreshCart } = useCart();

  const handleAddToCart = () => {
    setIsLoading(true);



    addToBasket(productId, 1)
      .then(async (res) => {
        toast.success("Product added to cart");
        await refreshCart();
      })
      .catch((err) => {
        toast.error("An error occurred while adding a product to the cart");
      }).finally(() => { setIsLoading(false) });
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleAddToCart}
      title="Add to cart"
      className="bg-green-500 text-white shadow-sm rounded-full p-2 cursor-pointer transition-all hover:bg-green-600 hover:shadow-md disabled:brightness-75"
    >
      {isLoading ? <FaSpinner className="animate-spin" /> : <FaPlus />}
    </button>
  );
};

export default CardAction;
