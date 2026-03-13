import { FC } from "react";

interface IProps {
  //
}

const Hero: FC<IProps> = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-5 text-white">
      <div className="flex flex-col justify-between p-6 rounded-lg bg-linear-to-r from-green-600 to-green-700">
        <h1 className="text-3xl font-semibold">
          Fresh Produce Delivered <br /> to Your Door
        </h1>

        <p className="my-3">
          The freshest fruits and vegetables at your fingertips. The first step
          to a healthy life starts with you.
        </p>

        <button className="bg-white inline-block w-fit text-green-700 py-2 px-4 rounded-md hover:bg-green-50 transition cursor-pointer">
          Start Shopping
        </button>
      </div>

      <div className="max-lg:hidden flex flex-col justify-between p-6 rounded-lg bg-linear-to-r from-orange-500 to-orange-600">
        <h1 className="text-3xl font-semibold">
          Affordable <br /> Organic Products
        </h1>

        <p className="my-3">
          Eating healthy is now easier than ever with natural and organic
          products.
        </p>

        <button className="bg-white inline-block w-fit text-green-700 py-2 px-4 rounded-md hover:bg-green-50 transition cursor-pointer">
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default Hero;
