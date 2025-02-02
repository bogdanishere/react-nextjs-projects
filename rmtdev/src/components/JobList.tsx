import { useActiveId } from "../hooks/useActiveId";
import { useJobItemsContext } from "../hooks/useJobItemsContext";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList() {
  const id = useActiveId();

  const { jobItemsSort: jobItems, loading: isLoading } = useJobItemsContext();

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={id !== null && Number(id) === jobItem.id}
          />
        ))}
    </ul>
  );
}

export default JobList;
