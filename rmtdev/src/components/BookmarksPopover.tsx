import { forwardRef } from "react";
import { useBookmarks } from "../hooks/useBookmarks";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { jobsDetails, isLoading } = useBookmarks();

  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      {isLoading && <Spinner />}
      {jobsDetails.map(
        (jobItem, index) =>
          jobItem && (
            <JobListItem key={index} jobItem={jobItem} isActive={false} />
          )
      )}
    </div>,
    document.body
  );
});

export default BookmarksPopover;
