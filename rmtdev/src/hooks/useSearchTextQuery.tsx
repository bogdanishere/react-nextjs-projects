import { useContext } from "react";
import { SearchTextQueryContextProvider } from "../contexts/SearchTextQueryContextProvider";

export const useSearchTextQuery = () => {
  const context = useContext(SearchTextQueryContextProvider);
  if (!context) {
    throw new Error(
      "useSearchTextQuery must be used within a SearchTextQueryContextProvider"
    );
  }
  return context;
};
