import Link from "next/link";
import type { FC } from "react";
import { FaShoppingBag } from "react-icons/fa";

interface IProps {
  //
}

const EmptyOrders: FC<IProps> = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          You haven't placed any orders yet
        </h2>
        <p className="text-gray-500">
          Start shopping to place your first order
        </p>

        <Link
          href="/"
          className="mt-4 inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
};

export default EmptyOrders;
