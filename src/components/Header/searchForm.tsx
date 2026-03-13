"use client";

import type { FC } from "react";
import { CiSearch } from "react-icons/ci";

interface IProps {
  //
}

const SearchForm: FC<IProps> = () => {
  return (
    <form
      onSubmit={() => {}}
      className="flex mx-3 gap-2 py-2 px-4 rounded-full border border-zinc-300 md:w-1/2"
    >
      <button title="Search" className="text-xl text-zinc-700 ">
        <CiSearch />
      </button>

      <input
        type="text"
        className="outline-none text-zinc-800 w-full"
        placeholder="Search for a product or category..."
      />
    </form>
  );
};

export default SearchForm;
