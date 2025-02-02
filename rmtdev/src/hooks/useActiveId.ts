import { useContext } from "react";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";

export const useActiveId = () => {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useActiveId must be used within an ActiveIdContextProvider"
    );
  }
  return context.activeId;
};
