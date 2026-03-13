import OrganicBadge from "@/components/Detail/organicBadge";
import Image from "next/image";
import type { FC } from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { TbWeight } from "react-icons/tb";
import { FaShoppingBasket } from "react-icons/fa";
import OrderButtons from "@/components/Detail/orderButtons";
import { Product } from "@/types";

interface IProps {
  grocery: Product;
}

const ProductDetails: FC<IProps> = ({ grocery }) => {
  return (
    <div className="md:flex">
      {/* Product Image Section */}
      <div className="relative h-72 w-full md:w-1/3">
        <Image
          src={grocery.photo}
          alt={grocery.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />

        <OrganicBadge isOrganic={grocery.isOrganic} />
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{grocery.name}</h1>

            <p className="text-gray-600">{grocery.origin}</p>
          </div>

          <div className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full text-gray-700">
            <TbWeight />
            <span>{grocery.unit}</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-3xl font-bold text-green-600">
            {grocery.price} TRY
          </p>

          <p className="text-gray-500">Inclusive of all taxes</p>
        </div>

        <div className="my-6 h-px bg-gray-200"></div>

        <p className="text-gray-700 mb-4">{grocery.description}</p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <MdOutlineLocalShipping className="text-xl text-green-600" />
            <span>Same day delivery available</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FaShoppingBasket className="text-xl text-green-600" />
            <p>
              Stock Status:{" "}
              {grocery.stock > 0 ? (
                <span>
                  <b>{grocery.stock}</b> available
                </span>
              ) : (
                "Out of stock"
              )}
            </p>
          </div>

          {grocery.nutritionalValue && (
            <div className="text-gray-700 mt-4">
              <h3 className="font-semibold mb-1">Nutritional Values</h3>

              <p>{grocery.nutritionalValue}</p>
            </div>
          )}
        </div>

        <OrderButtons grocery={grocery} />
      </div>
    </div>
  );
};

export default ProductDetails;
