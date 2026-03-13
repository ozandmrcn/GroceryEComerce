"use client";

import { type FC } from "react";
import type { Cart } from "@/types";
import ClearBtn from "@/components/Cart/ClearBtn";
import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import EmptyCart from "@/components/Cart/EmptyCart";

interface IProps {
  //
}

import { useCart } from "@/contexts/CartContext";

const CartPage: FC<IProps> = () => {
  const { cart, refreshCart, isLoading } = useCart();

  if (isLoading && !cart) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Basket</h1>

      <div className="lg:flex gap-6"></div>
      <div className="lg:w-2/3">
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">
              Basket ({cart.items.length})
            </h2>

            <ClearBtn onClear={refreshCart} />
          </div>

          <ul>
            {cart.items
              .filter((item) => item.grocery)
              .map((item) => (
                <CartItem key={item._id} item={item} onUpdate={refreshCart} />
              ))}
          </ul>
        </div>
      </div>

      <CartSummary cart={cart} />
    </div>
  );
};

export default CartPage;
