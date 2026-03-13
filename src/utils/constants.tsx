import { FaLeaf, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

export const options = [
  {
    icon: <MdLocalShipping />,
    title: "Fast Delivery",
    description: "Same-day delivery",
    bgColor: "bg-blue-100",
  },
  {
    icon: <FaLeaf />,
    title: "Fresh Products",
    description: "Daily fresh products",
    bgColor: "bg-green-100",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Affordable Prices",
    description: "Afforable prices",
    bgColor: "bg-yellow-100",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Shopping",
    description: "Secure payment methods",
    bgColor: "bg-red-100",
  },
];
