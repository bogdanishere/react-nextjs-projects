import { createContext, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

type SearchTextQueryContextProviderType = {
  searchQuery: string;
  handleSearchQuery: (searchQuery: string) => void;
  debouncedQuery: string;
};

export const SearchTextQueryContextProvider =
  createContext<SearchTextQueryContextProviderType | null>(null);

export default function SearchTextQueryContextProviderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 500);

  const handleSearchQuery = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  return (
    <SearchTextQueryContextProvider.Provider
      value={{
        searchQuery,
        handleSearchQuery,
        debouncedQuery,
      }}
    >
      {children}
    </SearchTextQueryContextProvider.Provider>
  );
}
