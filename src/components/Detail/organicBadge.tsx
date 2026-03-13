import type { FC } from "react";
import { FaLeaf } from "react-icons/fa";

interface IProps {
  isOrganic: boolean;
}

const OrganicBadge: FC<IProps> = ({ isOrganic }) => {
  return (
    isOrganic && (
      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs py-1 px-2 rounded-full flex items-center gap-1">
        <FaLeaf />

        <span>Organic</span>
      </div>
    )
  );
};

export default OrganicBadge;
