// import { useEffect, useState } from "react";
// import { URL_BASE } from "../lib/constants";
// import { JobItem } from "../lib/types";

// export const useJobItems = (searchQuery: string) => {
//   const [jobItems, setJobItems] = useState<JobItem[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!searchQuery || searchQuery.length < 3) {
//       return;
//     }

//     (async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `${URL_BASE}?search=${searchQuery}&limit=10`
//         );
//         const data = await response.json();
//         setLoading(false);
//         setJobItems(data.jobItems);
//       } catch (error) {
//         console.error(error);
//       }
//     })();
//   }, [searchQuery]);

//   return { jobItems, loading } as const;
// };

import { useQuery } from "@tanstack/react-query";
import { URL_BASE } from "../lib/constants";
import { JobItem } from "../lib/types";
import { handleError } from "../lib/utils";

const fetchJobItems = async (searchQuery: string): Promise<JobItem[]> => {
  const response = await fetch(`${URL_BASE}?search=${searchQuery}&limit=10`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data.jobItems;
};

export const useJobItems = (searchQuery: string) => {
  const { data, isInitialLoading } = useQuery(
    ["jobItems", +searchQuery],
    () => fetchJobItems(searchQuery),
    {
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false, //  pentru a nu face refetch cand se da click pe fereastra
      retry: false, // pentru a nu face retry la fetch
      enabled: searchQuery.length >= 3,
      onError: handleError,
    }
  );

  // const loading = isLoading && searchQuery.length >= 3;

  // console.log(data);

  console.log(data);

  return { jobItems: data || [], loading: isInitialLoading } as const;
};
