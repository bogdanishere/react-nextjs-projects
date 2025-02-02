import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useJobsDetails } from "../hooks/useJobsDetails";
import { JobDetails } from "../lib/types";

type BookmarksContextType = {
  bookmarkedIds: number[];
  jobsDetails: JobDetails[];
  isLoading: boolean;
  handleToggleBookmark: (id: number) => void;
  setBookmarkedIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage(
    "bookmarkedIds",
    []
  );

  const [jobsDetails, isLoading] = useJobsDetails(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        jobsDetails: jobsDetails || [],
        isLoading,
        handleToggleBookmark,
        setBookmarkedIds,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
