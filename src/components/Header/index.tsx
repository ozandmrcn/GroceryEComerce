"use client";

import type { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import SearchForm from "./searchForm";
import { RiFileList3Line } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-toastify";

interface IProps {
  //
}

const Header: FC<IProps> = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();

  const totalItems = cart?.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="sticky top-0 z-10 bg-white flex justify-between items-center py-5 px-7 lg:py-6 lg:px-10 shadow-sm">
      <Link
        href="/"
        className="text-green-600 font-bold text-2xl lg:text-3xl flex items-center gap-2"
      >
        <MdOutlineLocalGroceryStore />
        <span>GROCERY</span>
      </Link>

      <SearchForm />

      <div className="flex items-center gap-5">
        <Link
          href="/orders"
          className="text-lg relative text-gray-700 hover:text-green-600 transition flex items-center gap-2"
        >
          <RiFileList3Line className="text-2xl" />
          <span className="max-md:hidden">Orders</span>
        </Link>

        <Link
          href="/cart"
          className="text-lg relative text-gray-700 hover:text-green-600 transition flex items-center gap-2"
        >
          <div className="relative">
            <FaShoppingCart className="text-2xl" />

            <span className="absolute shadow-sm font-bold right-[-20px] top-[-20px] bg-green-500 text-white rounded-full size-6 grid place-items-center text-sm">
              {cart?.items?.length || 0}
            </span>
          </div>
          <span className="max-md:hidden">Cart</span>
        </Link>

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 max-md:hidden">
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="text-lg text-gray-700 hover:text-red-600 transition flex items-center gap-2 cursor-pointer"
              title="Logout"
            >
              <FiLogOut className="text-2xl" />
              <span className="max-md:hidden">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
