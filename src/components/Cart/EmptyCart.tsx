import Link from "next/link";
import { PiShoppingCartSimpleLight } from "react-icons/pi";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <PiShoppingCartSimpleLight className="text-6xl text-gray-300 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6">Add items to your cart to checkout</p>
      <Link
        href="/"
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
