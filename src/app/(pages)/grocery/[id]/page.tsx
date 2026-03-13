import OrganicBadge from "@/components/Detail/organicBadge";
import { getProductByIdFromDb } from "@/service/productDbService";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { TbWeight } from "react-icons/tb";
import { FaShoppingBasket } from "react-icons/fa";
import OrderButtons from "@/components/Detail/orderButtons";
import ProductInfo from "@/components/Detail/productInfo";
import ProductDetails from "@/components/Detail/productDetails";

interface IProps {
  params: Promise<{
    id: string;
  }>;
}

const Grocery: FC<IProps> = async ({ params }) => {
  const { id } = await params;

  const { grocery } = await getProductByIdFromDb(id);

  return (
    <div className="   mx-auto px-4 py-8">
      {/* Back to home */}
      <div className="mb-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-green-600 hover:underline"
        >
          <FaArrowLeft />
          <span>Back Home</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        {/* Product Details */}
        <ProductDetails grocery={grocery} />

        {/* Product Information */}
        <ProductInfo grocery={grocery} />
      </div>
    </div>
  );
};

export default Grocery;
