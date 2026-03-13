"use client";

import { clearCart } from "@/service/basketService";
import { useRouter } from "next/navigation";
import { useState, type FC } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

interface IProps {
  onClear?: () => void;
}

const ClearBtn: FC<IProps> = ({ onClear }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClearCart = async () => {
    setIsLoading(true);

    clearCart()
      .then(() => {
        toast.success("Cart cleared successfully");
        if (onClear) onClear();
        router.refresh();
      })
      .catch((err) => {
        toast.error("An error occurred while clearing the cart");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleClearCart}
      className="text-red-600 hover:text-red-700 transition flex items-center gap-1 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FaTrash />
      <p>Clear Cart</p>
    </button>
  );
};

export default ClearBtn;
