import { useQueries } from "@tanstack/react-query";
import { handleError } from "../lib/utils";
import { URL_BASE } from "../lib/constants";
import { JobDetails } from "../lib/types";

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

export const useJobsDetails = (ids: number[]) => {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["jobDetails", id],
      queryFn: () => (id ? fetchJobDetails(id) : null),
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    })),
  });

  const jobDetails = results
    .map((result) => result.data)
    .filter((jobData) => jobData !== undefined && jobData !== null);

  const isLoading = results.some((result) => result.isLoading);

  return [jobDetails, isLoading] as const;
};
