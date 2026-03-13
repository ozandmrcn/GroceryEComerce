import { getAllProductsFromDb } from "@/service/productDbService";
import { Product } from "@/types";
import type { FC } from "react";
import Card from "./card";
import { HiOutlineEmojiSad } from "react-icons/hi";

interface IProps {
  //
}

const Products: FC<IProps> = async () => {
  const { groceries } = await getAllProductsFromDb();

  if (!groceries || groceries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-5 bg-green-50 rounded-3xl border border-green-100 text-center mt-10">
        <div className="bg-white p-6 rounded-full shadow-sm mb-6 ring-4 ring-green-100/50">
          <HiOutlineEmojiSad className="text-6xl text-green-600 animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          Organic products not found
        </h3>
        <p className="text-green-600 text-lg max-w-md mx-auto leading-relaxed">
          Our organic products will be with you very soon.
        </p>
      </div>
    );
  }

  const groupedProducts = groceries.reduce<Record<string, Product[]>>(
    (obj, product) => {
      const category = product.category;

      if (!obj[category]) {
        obj[category] = [];
      }

      obj[category].push(product);

      return obj;
    },
    {},
  );

  return (
    <div className="flex flex-col gap-10">
      {Object.keys(groupedProducts).map((category, key) => (
        <div key={key}>
          <h2 className="text-2xl font-bold mb-5">{category}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
            {groupedProducts[category].map((product, key) => (
              <Card product={product} key={product._id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
