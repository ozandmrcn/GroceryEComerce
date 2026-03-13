import Features from "@/components/Home/features";
import Hero from "@/components/Home/hero";
import Products from "@/components/Home/products";
import type { FC } from "react";

interface IProps {
  //
}

const Home: FC<IProps> = () => {
  return (
    <div className="p-5 md:p-7 lg:px-10">
      <Hero />

      <Features />

      <Products />
    </div>
  );
};

export default Home;
