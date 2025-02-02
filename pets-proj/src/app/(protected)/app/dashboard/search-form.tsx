"use client";

import { useSearchContext } from "@/hooks/useSearchContext";

export default function SearchForm() {
  const { searchValue, handleSearchValue } = useSearchContext();
  return (
    <form className="w-full h-full">
      <input
        type="search"
        placeholder="Search for a pet"
        className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
        onChange={(e) => handleSearchValue(e.target.value)}
        value={searchValue}
      />
    </form>
  );
}
