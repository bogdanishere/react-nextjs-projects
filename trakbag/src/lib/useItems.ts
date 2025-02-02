import { useContext } from "react";
import { ItemsContext } from "../components/ItemsContextProvider";

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemsContextProvider");
  }
  return context;
};
