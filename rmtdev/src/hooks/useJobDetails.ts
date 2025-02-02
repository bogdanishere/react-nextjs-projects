// export const useJobDetails = (id: string | null) => {
//   const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!id) {
//       return;
//     }

//     (async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${URL_BASE}/${id}`);
//         const data = await response.json();
//         setLoading(false);
//         setJobDetails(data.jobItem);
//       } catch (error) {
//         console.error(error);
//       }
//     })();
//   }, [id]);

//   return [jobDetails, loading] as const;
// };

import { URL_BASE } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { JobDetails } from "../lib/types";
import { handleError } from "../lib/utils";

const fetchJobDetails = async (id: number): Promise<JobDetails> => {
  const response = await fetch(`${URL_BASE}/${id}`);
  // 4xx or 5xx response
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data.jobItem;
};

export const useJobDetails = (id: number | null) => {
  const { data, isInitialLoading } = useQuery(
    ["jobDetails", id],
    () => (id ? fetchJobDetails(id) : null),
    {
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: handleError,
    }
  );

  return [data, isInitialLoading] as const;
};
