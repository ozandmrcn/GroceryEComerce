import type { FC } from "react";

interface IProps {
  //
}

const Footer: FC<IProps> = () => {
  return (
    <footer className="bg-green-900 text-center p-6 text-white text-sm">
      Grocery Ecommerce | &copy; {new Date().getFullYear()} All rights reserved.
    </footer>
  );
};

export default Footer;
