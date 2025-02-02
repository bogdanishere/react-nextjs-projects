import { SearchContext } from "@/contexts/search-context-provider";
import { useContext } from "react";

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchContextProvider");
  }
  return context;
};
