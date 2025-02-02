import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error(
      "useBookmarks must be used within a BookmarksContextProvider"
    );
  }

  return context;
};
