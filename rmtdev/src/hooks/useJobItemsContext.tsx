import { useContext } from "react";
import { JobItemsContext } from "../contexts/JobItemsContextProvider";

export const useJobItemsContext = () => {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error(
      "useJobItemsContext must be used within a JobItemsContextProvider"
    );
  }
  return context;
};
