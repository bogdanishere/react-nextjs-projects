import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchTextQuery } from "../hooks/useSearchTextQuery";
import { useJobItems } from "../hooks/useJobItems";
import { DirrectionType, JobItem, SortingType } from "../lib/types";
import { NUMBER_OF_COMPONENTS_PER_PAGE } from "../lib/constants";

type JobItemsContextType = {
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  jobItemsSort: JobItem[];
  page: number;
  loading: boolean;
  setPage: (page: number) => void;
  sortingMeth: SortingType;
  setSortingMeth: (sortingMeth: SortingType) => void;
  handleChangePage: (dirrection: DirrectionType) => void;
  handleSorting: (sortingMeth: SortingType) => void;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debouncedQuery } = useSearchTextQuery();
  const { jobItems, loading } = useJobItems(debouncedQuery);

  const [page, setPage] = useState(1);
  const [sortingMeth, setSortingMeth] = useState<SortingType>("relevant");

  const totalNumberOfResults = jobItems.length;
  const totalNumberOfPages = Math.ceil(
    totalNumberOfResults / NUMBER_OF_COMPONENTS_PER_PAGE
  );

  const handleChangePage = useCallback(
    (dirrection: DirrectionType) => {
      if (page < 1) return;
      if (dirrection === "next") {
        setPage((page) => page + 1);
      } else if (dirrection === "prev") {
        setPage((page) => page - 1);
      }
    },
    [page]
  );

  const handleSorting = useCallback((sortingMeth: SortingType) => {
    setSortingMeth(sortingMeth);
    setPage(1);
  }, []);

  const jobItemsSort = useMemo(
    () =>
      [...jobItems]
        .sort((a, b) => {
          if (sortingMeth === "relevant") {
            return a.relevanceScore - b.relevanceScore;
          } else {
            return a.daysAgo - b.daysAgo;
          }
        })
        .slice(
          (page - 1) * NUMBER_OF_COMPONENTS_PER_PAGE,
          page * NUMBER_OF_COMPONENTS_PER_PAGE
        ),
    [jobItems, sortingMeth, page]
  );

  const contextValue = useMemo(
    () => ({
      totalNumberOfResults,
      totalNumberOfPages,
      jobItemsSort,
      page,
      loading,
      setPage,
      sortingMeth,
      setSortingMeth,
      handleChangePage,
      handleSorting,
    }),
    [
      totalNumberOfResults,
      totalNumberOfPages,
      jobItemsSort,
      page,
      loading,
      setPage,
      sortingMeth,
      setSortingMeth,
      handleChangePage,
      handleSorting,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
