import Link from "next/link";
import type { FC } from "react";
import { IoIosCloseCircle as Close } from "react-icons/io";

interface IProps {
  //
}

const CancelPage: FC<IProps> = () => {
  return (
    <div className="h-[80vh]">
      <div className="h-[50%] bg-red-500 text-white grid place-items-center">
        <div className="flex flex-col items-center gap-10">
          <Close className="text-[70px]" />

          <p className="font-semibold text-4xl text-center">
            Payment Cancelled
          </p>
        </div>
      </div>

      <div className="h-[50%] p-10 mt-5 text-center text-black">
        <p className="text-lg">An error occurred during the payment process</p>

        <p className="mt-5 mb-10 text-zinc-800">Please try again later.</p>

        <div className="flex flex-wrap justify-center gap-4">
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

export default CancelPage;
