"use client";

import { checkoutAllItems } from "@/service/basketService";
import { useState, type FC } from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

interface IProps {
  isEmpty: boolean;
}

const CheckoutButton: FC<IProps> = ({ isEmpty }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const { url } = await checkoutAllItems();

      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      console.error("Error checking out:", error);
      alert(error.message || "An error occurred during checkout.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading || isEmpty}
      onClick={handleCheckout}
      className="flex items-center justify-center gap-2 w-full bg-green-600 text-white px-4 h-10 rounded-md hover:bg-green-700 transition disabled:brightness-75 disabled:cursor-not-allowed cursor-pointer"
    >
      <MdOutlineShoppingCartCheckout />
      Proceed to Checkout
    </button>
  );
};

export default CheckoutButton;
