"use client";

import { clearCart } from "@/service/basketService";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, type FC } from "react";
import { IoIosCheckmark as Checkmark } from "react-icons/io";

interface IProps {
  //
}

const SuccessPage: FC<IProps> = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (userId) {
      clearCart().catch((err) => console.error("Error clearing cart:", err));
    }
  }, [userId]);

  return (
    <div className="h-[80vh]">
      <div className="h-[50%] bg-green-500 text-white grid place-items-center">
        <div className="flex flex-col items-center gap-10">
          <Checkmark className="text-[70px]" />

          <p className="font-semibold text-4xl text-center">
            Payment Successful
          </p>
        </div>
      </div>

      <div className="h-[50%] p-10 mt-5 text-center text-black">
        <p className="text-lg">Your order will be delivered soon</p>

        <p className="mt-5 mb-10 text-zinc-800">
          For details you can check your mails.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/orders"
            className="border shadow py-2 px-5 rounded-lg text-lg hover:shadow-lg hover:bg-gray-100 transition-all"
          >
            My Orders
          </Link>

          <Link
            href="/"
            className="border shadow py-2 px-5 rounded-lg text-lg hover:shadow-lg hover:bg-gray-100 transition-all"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
