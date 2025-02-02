"use client";

import { createContext, useState } from "react";

type SearchContextType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleSearchValue: (value: string) => void;
};

type SearchContextProviderProps = Readonly<{
  children: React.ReactNode;
}>;

export const SearchContext = createContext<SearchContextType | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
  };

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        handleSearchValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
