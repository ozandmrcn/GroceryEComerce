import { Cart } from "@/types";
import type { FC } from "react";
import CheckoutButton from "./CheckoutButton";
import Link from "next/link";

interface IProps {
  cart: Cart;
}

const CartSummary: FC<IProps> = ({ cart }) => {
  return (
    <div className="lg:w-1/3">
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 sticky top-4">
        <h2 className="font-semibold">Order Summary</h2>

        <div className="space-y-3 mt-3 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold">{cart.totalAmount} TRY</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Delivery Fee</span>
            <span className="font-semibold">Free</span>
          </div>

          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between text-gray-600">
              <span>Total</span>
              <span className="font-semibold">{cart.totalAmount} TRY</span>
            </div>
          </div>
        </div>

        <CheckoutButton isEmpty={cart.items.length === 0} />

        <Link
          href="/"
          className="block text-center mt-4 text-green-600 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
